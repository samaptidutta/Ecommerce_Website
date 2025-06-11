import React from 'react'
import MyOrders from './MyOrders'

const Profile = () => {
    return (
        <div className='mt-[144px] min-h-screen flex-flex-col'>
            <div className='container flex-grwo mx-auto p-4 md:p-6'>
                <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                    {/* left section */}

                    <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
                    <h1 className='text-2xl md:text-3xl font-bold mb-2 text-orange-600'>Pratik Mukharjee</h1>
                    <p className='text-lg text-red-600 mb-4'>Pratik@example.com</p>
                    <button className='w-full bg-stone-700 text-yellow-400 py-2 px-4 rounded hover:bg-gray-800'>Logout</button>
                    </div>


                    {/* right section */}
                    <div className='w-full md:w-2/3 lg:w-3/4'>
                        <MyOrders/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
