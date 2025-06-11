import React, { useEffect, useState } from 'react'

    const MyOrders = () => {

        const [orders,setOrders] = useState([]);
        const [loading, setLoading] = useState(true); 


        useEffect(()=>{
            // simulate fetching orders
            setTimeout(()=>{
                const mockOrders=[
                    {
                        _id:"1234",
                        createAt:new Date(),
                        shippingAddress:{city:"Mumbai",country:"India"},
                        orderItems:[
                            {
                                name:"product 1",
                                image:"https://picsum.photos/500/600?random=1"
                            }

                        ],
                        totalPrice:100,
                        isPaid:true
                    },

                    {
                        _id:"5678",
                        createAt:new Date(),
                        shippingAddress:{city:"Mumbai",country:"India"},
                        orderItems:[
                            {
                                name:"product 2",
                                image:"https://picsum.photos/500/600?random=2"
                            }

                        ],
                        totalPrice:100,
                        isPaid:true
                    }
                ];

                setOrders(mockOrders)
                setLoading(false);
            },1000)
        },[])


    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6 text-orange-600'>My Orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
                <table className='min-w-full text-left text-orange-500'>
                    <thead className='bg-stone-800 text-xs uppercase text-yellow-400'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order ID</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-red-500'>
                                Loading orders...
                                </td>
                            </tr>
                        ): orders.length  > 0 ? (
                            orders.map((item)=>(
                                <tr key={item._id} className='border-b hover:birder-r-gray-50 cursor-pointer'>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                        <img src={item.orderItems[0].image} alt={item.orderItems[0].name} className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-corners' />
                                    </td>

                                    <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-orange-600 whitespace-nowrap'>#{item._id}</td>
                                    <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-orange-600 whitespace-nowrap'>
                                        {new Date(item.createAt).toLocaleDateString()} 
                                        {"  "}
                                        {new Date(item.createAt).toLocaleTimeString()}
                                        </td>

                                        <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-orange-600 whitespace-nowrap'>{item.shippingAddress ? `${item.shippingAddress.city}, ${item.shippingAddress.country}` : "N/A"}</td>

                                        <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-orange-600 whitespace-nowrap'>{item.orderItems.length}</td>

                                        <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-orange-600 whitespace-nowrap'>{item.totalPrice}</td>

                                        <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-orange-600 whitespace-nowrap'>
                                            <span className={`${item.isPaid ? "bg-green-700 text-gray-200" : "bg-red-600 text-red-200"} px-2 py-2 rounded-full text-xs sm:text-sm font-medium`}>
                                                {item.isPaid? "Paid":"Pending"}
                                            </span>

                                            </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-orange-500'>
                                    You Have No Orders
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


