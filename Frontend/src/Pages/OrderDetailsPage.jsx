import React, { useEffect, useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentMethod: "PayPal",
            shippingMethod: "Standard",
            ShippingAddress: { city: "Mumbai", Country: "India" },
            orderItems: [
                { productId: "1", name: "Laptop", price: 50000, quantity: 1, image: "https://picsum.photos/500/600?random=1" },
                { productId: "2", name: "Phone", price: 25000, quantity: 2, image: "https://picsum.photos/500/600?random=2" }
            ]
        };
        setOrderDetails(mockOrderDetails);
    }, [id]);

    return (
        <div className='mt-[140px] max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-orange-500'>Order Details</h2>

            {!orderDetails ? (
                <p className='text-red-500'>No Order Details found</p>
            ) : (
                <div className='p-4 sm:p-6 rounded-lg border border-gray-500 bg-neutral-700'>

                    {/* Order Info */}
                    <div className='flex flex-col sm:flex-row justify-between mb-8'>
                        <div>
                            <h3 className='text-lg md:text-xl font-semibold text-orange-400'>Order ID: #{orderDetails._id}</h3>
                            <p className='text-gray-200'>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span className={`${orderDetails.isPaid ? "bg-green-700 text-gray-200" : "bg-red-500 text-white"} px-3 py-1 rounded-full text-sm mb-2`}>
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>
                            <span className={`${orderDetails.isDelivered ? "bg-green-700 text-gray-200" : "bg-yellow-700 text-yellow-200"} px-3 py-1 rounded-full text-sm`}>
                                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
                            </span>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
                        <div>
                            <h4 className='text-lg font-semibold mb-2 text-orange-600'>Payment Info</h4>
                            <p className='text-yellow-400'>Method: {orderDetails.paymentMethod}</p>
                            <p className='text-yellow-400'>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>

                        <div>
                            <h4 className='text-lg font-semibold mb-2 text-orange-600'>Shipping Info</h4>
                            <p className='text-yellow-400'>Method: {orderDetails.shippingMethod}</p>
                            <p className='text-yellow-400'>Address: {orderDetails.ShippingAddress.city}, {orderDetails.ShippingAddress.Country}</p>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className='overflow-x-auto mb-4'>
                        <h4 className='text-lg font-semibold mb-4 text-yellow-500'>Products</h4>
                        <table className='min-w-full text-orange-600'>
                            <thead className='bg-gray-700 text-sm'>
                                <tr>
                                    <th className='py-2 px-4 text-left'>Name</th>
                                    <th className='py-2 px-4 text-left'>Unit Price</th>
                                    <th className='py-2 px-4 text-left'>Quantity</th>
                                    <th className='py-2 px-4 text-left'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='border-b'>
                                        <td className='py-2 px-4 flex items-center'>
                                            <img src={item.image} alt={item.name} className='w-10 h-10 object-cover mr-3 rounded-md' />
                                            <Link to={`/product/${item.productId}`} className='text-blue-300 hover:underline'>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className='py-2 px-4'>₹{item.price}</td>
                                        <td className='py-2 px-4'>{item.quantity}</td>
                                        <td className='py-2 px-4'>₹{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Back Link */}
                    <Link to="/my-orders" className='text-red-400 hover:underline'>
                        &larr; Back to My Orders
                    </Link>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsPage;
