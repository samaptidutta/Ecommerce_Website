const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/products
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            discountPrice,
            countInStock,
            category,
            brand,
            productCollection,
            image,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        if (!name || !price || !category || !productCollection || !sku || !image?.url || !image?.altText) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const product = new Product({
            name,
            price,
            description,
            discountPrice,
            countInStock,
            category,
            brand,
            productCollection,
            image,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});

// PUT /api/products/:id
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            discountPrice,
            countInStock,
            category,
            brand,
            productCollection,
            image,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.productCollection = productCollection || product.productCollection;
            product.image = image || product.image;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// DELETE /api/products/:id
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// GET /api/products
router.get("/", async (req, res) => {
    try {
        const { brand, ratings, availability, discount, releaseYear, price, search } = req.query;
        let query = {};

        if (brand) {
            const brandArray = brand.split(",").map((b) => b.trim());
            query.brand = { $in: brandArray };
        }

        if (ratings) {
            const ratingValue = parseFloat(ratings);
            if (!isNaN(ratingValue)) {
                query.ratings = { $gte: ratingValue };
            }
        }

        if (availability) {
            const availabilityArray = availability.split(",").map((a) => a.trim());
            if (availabilityArray.includes("In Stock")) {
                query.countInStock = { $gt: 0 };
                query.availability = true;
            }
            if (availabilityArray.includes("Pre-order")) {
                query.availability = true;
            }
        }

        if (discount) {
            const discountValue = parseInt(discount);
            if (!isNaN(discountValue)) {
                query.$expr = {
                    $and: [
                        { $ne: ["$discountPrice", null] },
                        {
                            $gte: [
                                {
                                    $multiply: [
                                        { $divide: [{ $subtract: ["$price", "$discountPrice"] }, "$price"] },
                                        100,
                                    ],
                                },
                                discountValue,
                            ],
                        },
                    ],
                };
            }
        }

        if (releaseYear) {
            const yearArray = releaseYear.split(",").map((y) => y.trim());
            const yearQueries = [];
            if (yearArray.includes("2023 or newer")) {
                yearQueries.push({ releaseYear: { $gte: 2023 } });
            }
            if (yearArray.includes("2022")) {
                yearQueries.push({ releaseYear: 2022 });
            }
            if (yearArray.includes("2021 or older")) {
                yearQueries.push({ releaseYear: { $lte: 2021 } });
            }
            if (yearQueries.length > 0) {
                query.$or = yearQueries;
            }
        }

        if (price) {
            const [minPrice, maxPrice] = price.split("-").map((p) => parseFloat(p.trim()));
            if (!isNaN(minPrice)) {
                query.price = { $gte: minPrice };
            }
            if (!isNaN(maxPrice)) {
                query.price = { ...query.price, $lte: maxPrice };
            }
        }

        if (search) {
            const searchQuery = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
            if (query.$or) {
                query = { $and: [{ $or: query.$or }, { $or: searchQuery }] };
            } else {
                query.$or = searchQuery;
            }
        }

        const products = await Product.find(query);
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching products",
            error: error.message,
        });
    }
});

// GET /api/products/bestseller
router.get("/bestseller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ message: "No best seller found" });
        }
    } catch (error) {
        console.error("Error fetching best seller products:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET /api/products/newArrival
router.get("/newArrival", async (req, res) => {
    try {
        const newArrival = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrival);
    } catch (error) {
        console.error("Error fetching new arrival products:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// GET /api/products/similar/:id
router.get('/similar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const similarProducts = await Product.find({
            _id: { $ne: product._id },
            category: product.category,
            // gender: product.gender, // uncomment if gender is part of your model
        }).limit(4);

        res.status(200).json({ success: true, data: similarProducts });
    } catch (error) {
        console.error('Error in /similar/:id:', error.message);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
