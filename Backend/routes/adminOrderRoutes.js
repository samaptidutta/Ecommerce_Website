const express = require("express");
const Order = require("../models/Order");
const {protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();


//GET request url: /api/admin/orders
//GET request access: Admin
//GET request desc: Get all orders

router.get("/", protect, admin, async (req,res) =>{
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(404).json({message: error.message});
    }
})


//PUT request url: /api/admin/orders/:id
//PUT request access: Admin
//PUT request desc: Update order status

// PUT /api/admin/orders/:id
// Update order status
// Access: Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
        order.status = req.body.status || order.status;
        order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
        order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
        } else {
        res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//Deleting an order
//Access: Admin
//DELETE /api/admin/orders/:id
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order deleted successfully" });
        } else {
        res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;