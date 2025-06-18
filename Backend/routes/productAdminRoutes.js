const express = require("express");
const Product = require("../models/product");
const {protect,admin} = require("../middleware/authMiddleware");
const router = express.Router();

//GET request url: /api/admin/products
//get all products

router.get("/",protect,admin, async (req,res) =>{
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:error.message})
    }
})


module.exports = router;
