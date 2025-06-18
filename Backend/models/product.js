const mongoose = require("mongoose")
const { collection } = require("./user")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
    },
    countInStock :{
        type:Number,
        required:true,
        default:0
    },
    sku:{
        type:String,
        unique:true,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,

    },

    availability: {
    type: Boolean,
    default: true, // or you can compute based on countInStock
    },

    releaseYear: {
    type: Number, // like 2024
    },

    ratings: {
    type: Number,
    default: 0,
    },

    productCollection:{
        type:String,
        required:true
    },
    image:{
        url:{
            type:String,
            required:true
        },
        altText:{
            type:String,
            required:true
        }
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    numberOfReviews:{
        type:Number,
        default:0
    },

    tags:[String],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    metaTitle:{
        type:String,
    },
    metaDescription:{
        type:String,
    },
    metaKeyWords:{
        type:String,
    },
    dimensions:{
        length:Number,
        width:Number,
        height:Number
    },
    collection:{
        type:String,
        required:true

    },
    weight:Number

},
    {timestamps:true}
)

module.exports = mongoose.model("product",productSchema)