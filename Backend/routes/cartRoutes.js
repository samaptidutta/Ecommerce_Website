const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    console.log(`getCart called with userId: ${userId}, guestId: ${guestId}`);
    if (userId) {
        const cart = await Cart.findOne({ user: userId });
        console.log(`Cart for userId: ${cart ? 'found' : 'not found'}`);
        return cart;
    } else if (guestId) {
        const cart = await Cart.findOne({ guestId });
        console.log(`Cart for guestId: ${cart ? 'found' : 'not found'}`);
        return cart;
    }
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity = 1, guestId } = req.body;

    try {
        // Validate input
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }
        if (quantity < 1 || isNaN(quantity)) {
            return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
        }

        // Get user ID from protect middleware
        const userId = req.user?._id;
        if (userId && guestId) {
            return res.status(400).json({ success: false, message: "Provide either user ID or guest ID, not both" });
        }

        // Fetch product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (product.countInStock < quantity) {
            return res.status(400).json({ success: false, message: "Insufficient stock" });
        }
        if (!product.isPublished) {
            return res.status(400).json({ success: false, message: "Product is not available" });
        }

        // Prepare cart item
        const cartItem = {
            productId: product._id,
            name: product.name,
            image: product.image.url,
            price: String(product.discountPrice || product.price),
            brand: product.brand,
            quantity: Number(quantity)
        };

        // Get cart
        let cart = await getCart(userId, guestId);

        if (cart) {
            // Update existing cart
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId
            );
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += Number(quantity);
            } else {
                cart.products.push(cartItem);
            }
        } else {
            // Create new cart with auto-generated guestId if needed
            const newGuestId = guestId || (!userId ? `guest_${Date.now()}` : undefined);
            cart = new Cart({
                user: userId || undefined,
                guestId: newGuestId,
                products: [cartItem],
                totalPrice: 0
            });
        }

        // Recalculate totalPrice
        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + Number(item.price) * item.quantity,
            0
        );

        // Save cart
        const updatedCart = await cart.save();
        return res.status(200).json({ success: true, data: updatedCart, guestId: updatedCart.guestId || null });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while adding to cart",
            error: error.message
        });
    }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
    const { productId, quantity, guestId: providedGuestId } = req.body;
    const userId = req.user?._id;
    let guestId = providedGuestId;

    try {
        // Generate guestId if neither userId nor guestId is provided
        if (!userId && !guestId) {
            guestId = `guest_${Date.now()}`;
        }

        // Validate input
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }
        if (isNaN(quantity)) {
            return res.status(400).json({ success: false, message: "Quantity must be a number" });
        }

        if (userId && guestId) {
            return res.status(400).json({ success: false, message: "Provide either user ID or guest ID, not both" });
        }

        // Get cart
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Fetch product to validate stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (quantity > product.countInStock) {
            return res.status(400).json({ success: false, message: "Requested quantity exceeds stock" });
        }
        if (!product.isPublished) {
            return res.status(400).json({ success: false, message: "Product is not available" });
        }

        // Find product in cart
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        // Update quantity or remove product
        if (quantity > 0) {
            cart.products[productIndex].quantity = Number(quantity);
        } else {
            cart.products.splice(productIndex, 1);
        }

        // Recalculate totalPrice
        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + Number(item.price) * item.quantity,
            0
        );

        // Save updated cart
        const updatedCart = await cart.save();
        return res.status(200).json({
            success: true,
            data: updatedCart,
            guestId: updatedCart.guestId || null
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while updating cart",
            error: error.message
        });
    }
});

// @route DELETE /api/cart
// @desc Remove product from cart
// @access Public
router.delete("/", async (req, res) => {
    const { productId, guestId: providedGuestId } = req.body;
    const userId = req.user?._id;
    let guestId = providedGuestId;

    try {
        // Generate guestId if neither userId nor guestId is provided
        if (!userId && !guestId) {
            guestId = `guest_${Date.now()}`;
        }

        // Validate input
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        if (userId && guestId) {
            return res.status(400).json({ success: false, message: "Provide either user ID or guest ID, not both" });
        }

        // Get cart
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Find product in cart
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        // Remove product
        cart.products.splice(productIndex, 1);

        // Recalculate totalPrice
        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + Number(item.price) * item.quantity,
            0
        );

        // Save updated cart
        const updatedCart = await cart.save();
        return res.status(200).json({
            success: true,
            data: updatedCart,
            guestId: updatedCart.guestId || null
        });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while removing product from cart",
            error: error.message
        });
    }
});

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
    let { guestId } = req.query;
    const userId = req.user?._id;

    try {
        // Generate guestId if neither userId nor guestId is provided
        if (!userId && !guestId) {
            guestId = `guest_${Date.now()}`;
        }

        // Validate input
        if (userId && guestId) {
            return res.status(400).json({ success: false, message: "Provide either user ID or guest ID, not both" });
        }

        // Get cart
        let cart = await getCart(userId, guestId);
        if (!cart && guestId) {
            // Create new cart for guest if not found
            cart = new Cart({
                guestId,
                products: [],
                totalPrice: 0
            });
            await cart.save();
        }

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        return res.status(200).json({
            success: true,
            data: cart,
            guestId: cart.guestId || null
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching cart",
            error: error.message
        });
    }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        // Validate input
        if (!guestId) {
            return res.status(400).json({ success: false, message: "Guest ID is required" });
        }

        // Get user ID from protect middleware
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // Find guest and user carts
        const guestCart = await Cart.findOne({ guestId });
        console.log(`Guest cart for ${guestId}: ${guestCart ? 'found' : 'not found'}`);
        const userCart = await Cart.findOne({ user: userId });

        if (!guestCart) {
            return res.status(404).json({
                success: false,
                message: "Guest cart not found",
                data: userCart || null
            });
        }

        if (guestCart.products.length === 0) {
            await Cart.findOneAndDelete({ guestId });
            return res.status(200).json({
                success: true,
                message: "Guest cart is empty",
                data: userCart || null
            });
        }

        // Validate products in guest cart
        for (const item of guestCart.products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ${item.productId} not found`
                });
            }
            if (!product.isPublished) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${item.productId} is not available`
                });
            }
            if (item.quantity > product.countInStock) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${item.productId}`
                });
            }
        }

        let mergedCart;
        if (userCart) {
            // Merge guest cart into user cart
            guestCart.products.forEach((guestItem) => {
                const productIndex = userCart.products.findIndex(
                    (item) => item.productId.toString() === guestItem.productId.toString()
                );
                if (productIndex > -1) {
                    userCart.products[productIndex].quantity += guestItem.quantity;
                } else {
                    userCart.products.push(guestItem);
                }
            });
            userCart.totalPrice = userCart.products.reduce(
                (acc, item) => acc + Number(item.price) * item.quantity,
                0
            );
            mergedCart = await userCart.save();
            await Cart.findOneAndDelete({ guestId });
        } else {
            // Assign guest cart to user
            guestCart.user =彼此

            guestCart.guestId = undefined;
            mergedCart = await guestCart.save();
        }

        return res.status(200).json({
            success: true,
            data: mergedCart,
            guestId: null
        });
    } catch (error) {
        console.error("Error merging carts:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while merging carts",
            error: error.message
        });
    }
});

module.exports = router;