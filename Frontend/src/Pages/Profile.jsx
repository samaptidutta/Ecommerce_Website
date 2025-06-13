import React from 'react'
import MyOrders from './MyOrders'

const Profile = () => {
    return (
        <div className='mt-[144px] min-h-screen bg-neutral-900 text-white'>
            <div className='max-w-7xl mx-auto px-4 py-6'>
                <div className='flex flex-col md:flex-row gap-6'>
                    
                    {/* Left Section */}
                    <div className='w-full md:w-1/3 lg:w-1/4 bg-neutral-800 shadow-md rounded-lg p-4'>
                        <h1 className='text-2xl font-bold mb-2 text-orange-500'>Pratik Mukharjee</h1>
                        <p className='text-lg text-red-400 mb-4 break-words'>Pratik@example.com</p>
                        <button className='w-full bg-stone-700 text-yellow-400 py-2 px-4 rounded hover:bg-gray-800 transition duration-300'>
                            Logout
                        </button>
                    </div>

                    {/* Right Section */}
                    <div className='w-full md:w-2/3 lg:w-3/4'>
                        <MyOrders />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
