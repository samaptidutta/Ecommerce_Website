import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "1234",
                    createAt: new Date(),
                    shippingAddress: { city: "Mumbai", country: "India" },
                    orderItems: [
                        {
                            name: "product 1",
                            image: "https://picsum.photos/500/600?random=1"
                        }
                    ],
                    totalPrice: 100,
                    isPaid: true
                },
                {
                    _id: "5678",
                    createAt: new Date(),
                    shippingAddress: { city: "Mumbai", country: "India" },
                    orderItems: [
                        {
                            name: "product 2",
                            image: "https://picsum.photos/500/600?random=2"
                        }
                    ],
                    totalPrice: 100,
                    isPaid: true
                }
            ];

            setOrders(mockOrders)
            setLoading(false);
        }, 1000)
    }, [])

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`)
    }

    return (
        <div className='mt-[140px] max-w-7xl mx-auto px-4 py-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6 text-orange-600'>My Orders</h2>
            <div className='overflow-x-auto rounded-lg shadow-md'>
                <table className='min-w-full text-sm sm:text-base text-left text-orange-500'>
                    <thead className='bg-stone-800 text-xs sm:text-sm uppercase text-yellow-400'>
                        <tr>
                            <th className='py-2 px-4'>Image</th>
                            <th className='py-2 px-4'>Order ID</th>
                            <th className='py-2 px-4'>Created</th>
                            <th className='py-2 px-4'>Shipping</th>
                            <th className='py-2 px-4'>Items</th>
                            <th className='py-2 px-4'>Price</th>
                            <th className='py-2 px-4'>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-red-500'>
                                    Loading orders...
                                </td>
                            </tr>
                        ) : orders.length > 0 ? (
                            orders.map((item) => (
                                <tr
                                    key={item._id}
                                    onClick={() => handleRowClick(item._id)}
                                    className='border-b hover:bg-stone-900 cursor-pointer transition'
                                >
                                    <td className='py-2 px-4'>
                                        <img
                                            src={item.orderItems[0].image}
                                            alt={item.orderItems[0].name}
                                            className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md'
                                        />
                                    </td>

                                    <td className='py-2 px-4 whitespace-nowrap font-medium text-orange-600'>
                                        #{item._id}
                                    </td>

                                    <td className='py-2 px-4 whitespace-nowrap text-orange-600'>
                                        {new Date(item.createAt).toLocaleDateString()}<br />
                                        <span className="text-xs text-gray-400">{new Date(item.createAt).toLocaleTimeString()}</span>
                                    </td>

                                    <td className='py-2 px-4 whitespace-nowrap text-orange-600'>
                                        {item.shippingAddress ? `${item.shippingAddress.city}, ${item.shippingAddress.country}` : "N/A"}
                                    </td>

                                    <td className='py-2 px-4 whitespace-nowrap text-orange-600'>
                                        {item.orderItems.length}
                                    </td>

                                    <td className='py-2 px-4 whitespace-nowrap text-orange-600'>
                                        ₹{item.totalPrice}
                                    </td>

                                    <td className='py-2 px-4 whitespace-nowrap'>
                                        <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${item.isPaid ? "bg-green-700 text-white" : "bg-red-600 text-white"}`}>
                                            {item.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-orange-500'>
                                    You have no orders.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrders
