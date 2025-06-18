const mongoose = require('mongoose');

const cartItems = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: { type: String, required: true },
    image: { type: String, required: false, default: "" }, // Made optional with default
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 }
}, { _id: false });

const cartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    guestId: { type: String },
    products: [cartItems],
    totalPrice: { type: Number, required: true, default: 0 }
}, {
    timestamps: true,
    validate: {
        validator: function() {
            return (this.user && !this.guestId) || (!this.user && this.guestId);
        },
        message: 'Cart must belong to either a user or a guest.'
    }
});

module.exports = mongoose.model("Cart", cartItemSchema);