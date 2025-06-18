const express = require("express")
const Order = require("../models/Order");
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

// GET request

router.get("/my-orders", protect, async (req,res) =>{
    try {
        const orders = await Order.find({user:req.user._id}).sort({
            createdAt:-1
        });
        res.json(orders);

    } catch (error) {
        res.status(500).json({msg:error.message})
        console.error(error);
        
    }
})



//GET/api/orders/:id
router.get("/:id", protect,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if(!order){
            return res.status(404).json({msg:"Order not found"})
        }

        res.json(order)
    } catch (error) {
        res.status(500).json({msg:error.message})
        console.error(error);
        
    }
})


module.exports = router;