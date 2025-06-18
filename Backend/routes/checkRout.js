const express = require("express");
const Checkout = require("../models/Checkout")
const Cart = require("../models/Cart")
const Product = require("../models/product")
const Order = require("../models/Order")
const {protect} = require("../middleware/authMiddleware")
const mongoose = require("mongoose");

const router = express.Router()

// @route POST /api/checkout
// @desc Create a new checkout
// @access Private

// @route POST /api/checkout
// @desc Create a new checkout
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    // Log request body for debugging
    console.log("Checkout request body:", req.body);

    try {
        // Validate user
        if (!req.user?._id || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(401).json({ msg: "Invalid or missing user ID" });
        }

        // Validate required fields
        if (!checkoutItems || !Array.isArray(checkoutItems) || checkoutItems.length === 0) {
            return res.status(400).json({ msg: "No items in cart" });
        }
        if (!paymentMethod || typeof paymentMethod !== "string") {
            return res.status(400).json({ msg: "Invalid payment method" });
        }
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            return res.status(400).json({ msg: "Invalid total price" });
        }
        if (!shippingAddress || typeof shippingAddress !== "object") {
            return res.status(400).json({ msg: "Invalid shipping address" });
        }
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state ||
            !shippingAddress.country || !shippingAddress.postalCode) {
            return res.status(400).json({ msg: "All shipping address fields are required" });
        }

        // Validate checkoutItems
        for (const item of checkoutItems) {
            if (!mongoose.Types.ObjectId.isValid(item.productId)) {
                return res.status(400).json({ msg: `Invalid product ID: ${item.productId}` });
            }
            if (!item.name || typeof item.name !== "string") {
                return res.status(400).json({ msg: `Invalid name for product: ${item.productId}` });
            }
            if (!item.image || typeof item.image !== "string") {
                return res.status(400).json({ msg: `Invalid image for product: ${item.productId}` });
            }
            if (typeof item.price !== "number" || item.price <= 0) {
                return res.status(400).json({ msg: `Invalid price for product: ${item.productId}` });
            }
        }

        // Create checkout
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false
        });

        console.log(`Checkout created and saved for user: ${req.user._id}`);
        res.status(201).json(newCheckout);

    } catch (error) {
        console.error("Error saving checkout:", error); // Log full error
        res.status(500).json({ msg: "Error creating checkout", error: error.message });
    }
});


// @route PUT /api/checkout/:id/pay
// @desc Pay for a checkout
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: "Invalid checkout ID" });
        }

        if (!req.user?._id || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(401).json({ msg: "Invalid or missing user ID" });
        }

        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ msg: "Checkout not found" });
        }

        if (checkout.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Not authorized to update this checkout" });
        }

        if (!paymentStatus || typeof paymentStatus !== "string") {
            return res.status(400).json({ msg: "Invalid payment status" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            return res.status(200).json(checkout);
        } else {
            return res.status(400).json({ msg: "Invalid payment status" });
        }
    } catch (error) {
        console.error("Error paying for checkout:", error);
        return res.status(500).json({ msg: "Error paying for checkout", error: error.message });
    }
});


// @route POST /api/checkout/:id/finalize
// @desc Finalize a checkout
// @access Private

router.post("/:id/finalize", async (req,res) =>{
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({msg: "Checkout not found"});
        }

        if(checkout.isPaid && !checkout.isFinalized){
            const finalOrder = await Order.create({
                user:checkout.user,
                orderItems: checkout.orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus:"paid",
                paymentDetails: checkout.paymentDetails
            });

            //Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            //Delete the cart associated with the user
            await Cart.findOneAndDelete({user:checkout.user});
            res.status(200).json(finalOrder);
        } else if(checkout.isFinalized){
            return res.status(400).json({msg: "Checkout already finalized"});
        } else{
            return res.status(400).json({msg: "Invalid payment status"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Error finalizing checkout"});
    }
})

module.exports = router;