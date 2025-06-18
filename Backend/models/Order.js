const mongoose = require("mongoose");
    const orderItemsSchema = new mongoose.Schema({
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true

        },
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },

        price:{
            type:Number,
            required:true
        },
        brand:String,
        quantity:{
            type:Number,
            required:true
        }
    }, {_id:false})


const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[orderItemsSchema],
    shippingAddress:{
        address:{type:String,require:true},
        city:{type:String,require:true},
        postalCode:{type:String,require:true},
        country:{type:String,require:true},
    },
    paymentMethod:{type:String,require:true},
    totalPrice:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:{
        type:Date,
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:{
        type:Date,
    },
    paymentStatus:{
        type:String,
        default:"pending"
    },
    status:{
        type:String,
        enum:["Processing","Shipped","Delivered","Cancelled"],
        default:"Processing"
    }
},{timestamps:true})

module.exports = mongoose.model("order",orderSchema)
