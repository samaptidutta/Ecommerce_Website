import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
    removeFromCart,
    updateCartItemQuantity,
    } from "../../redux/slice/cartSlice";

    const Cart = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    const handleUpdateQuantity = (productId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity >= 1) {
        dispatch(
            updateCartItemQuantity({
            productId,
            quantity: newQuantity,
            guestId,
            userId,
            })
        );
        }
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ productId, guestId, userId }));
    };

    return (
        <div className="p-4">
        {cart.products.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
        ) : (
            cart.products.map((item, index) => (
            <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-2 border-b border-gray-300"
            >
                {/* Product details */}
                <div className="flex items-center">
                {/* Cart image */}
                <img
                    src={item.image || "https://example.com/default-image.jpg"} // Fallback image
                    alt={item.name}
                    className="rounded-lg w-20 h-24 object-cover mr-4"
                />
                {/* Cart item details */}
                <div>
                    <h3 className="text-lg font-semibold text-orange-600">
                    {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                    {/* Only display fields that exist in cartItems schema */}
                    <div className="flex items-center mt-2 gap-2">
                    <button
                        onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity, -1)
                        }
                        className="border rounded-lg px-2 py-1 text-lg font-medium text-white bg-gray-600 hover:bg-gray-700"
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span className="text-orange-600">{item.quantity}</span>
                    <button
                        onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity, 1)
                        }
                        className="border rounded-lg px-2 py-1 text-lg font-medium text-white bg-gray-600 hover:bg-gray-700"
                    >
                        +
                    </button>
                    </div>
                </div>
                </div>

                {/* Product price */}
                <div className="mt-2 sm:mt-0">
                <p className="text-lg font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    })}
                </p>
                <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="mt-1"
                >
                    <RiDeleteBin3Line className="h-6 w-6 text-red-600 hover:text-red-800 cursor-pointer" />
                </button>
                </div>
            </div>
            ))
        )}
        </div>
    );
};

export default Cart;
