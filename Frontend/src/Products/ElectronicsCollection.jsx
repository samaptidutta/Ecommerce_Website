import React from 'react'
import { Link } from 'react-router-dom'

const SmartPhones = () => {
    return (
        <section className='py-16 px-4 lg:px-0'>
            
                {/* Electronics */}
            <div class="max-w-[1320px] mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-6  px-[20px]">

                {/* smartphones */}
                <div class="text-center shadow-lg mx-auto rounded overflow-hidden" >
                    <div class="overflow-hidden">
                        <img src="https://jamesandco.in/wp-content/uploads/2024/12/samsung-5-1.png" alt="smartphone" class="hover:scale-125 duration-1000"/>
                    </div>
                    <h2 className='text-2xl font-bold text-orange-600 mb-3'>Smart Phones Collections</h2>
                    <Link to="#" className='text-white underline'>Shop Now</Link>
            
                </div>

                {/* cameras */}
                <div class="text-center shadow-lg mx-auto rounded overflow-hidden flex flex-col justify-center align-center" >
                    <div class="overflow-hidden ">
                        <img src="https://media.istockphoto.com/id/1151960693/photo/camera-on-black-background.jpg?s=612x612&w=0&k=20&c=biOjWyuTuOa3FlTKekCm615pL2kn7FaNpSXpsu0TaN0=" alt="camera" class="hover:scale-125 duration-1000 w-full h-full"/>
                    </div>
                    <h2 className='text-2xl font-bold text-orange-600 mb-3 mt-2'>Camera Collections</h2>
                    <Link to="#" className='text-white underline'>Shop Now</Link>
            
                </div>

                {/* Headphones & earbuds */}

                <div class="text-center shadow-lg mx-auto rounded overflow-hidden" >
                    <div class="overflow-hidden">
                        <img src="https://m.media-amazon.com/images/I/71pe5XvJlOL._AC_UF350,350_QL80_.jpg" alt="headphones" class="hover:scale-125 duration-1000 w-full h-full"/>
                    </div>
                    <h2 className='text-2xl font-bold text-orange-600 mb-3 mt-2'>Headphones Collections</h2>
                    <Link to="#" className='text-white underline'>Shop Now</Link>
            
                </div>



                {/* Smartwatches */}

                <div class="text-center shadow-lg mx-auto rounded overflow-hidden" >
                    <div class="overflow-hidden">
                        <img src="https://5.imimg.com/data5/SELLER/Default/2023/7/326887326/GO/XC/UF/10773921/bluetooth-smart-watch-wave-lite-500x500.webp" alt="headphones" class="hover:scale-125 duration-1000 w-full h-full"/>
                    </div>
                    <h2 className='text-2xl font-bold text-orange-600 mb-3 mt-2'>Smartwatches Collections</h2>
                    <Link to="#" className='text-white underline'>Shop Now</Link>
            
                </div>


                {/* Laptop */}

                <div class="text-center shadow-lg mx-auto rounded overflow-hidden" >
                    <div class="overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D" alt="headphones" class="hover:scale-125 duration-1000 w-full h-full"/>
                    </div>
                    <h2 className='text-2xl font-bold text-orange-600 mb-3 mt-2'>Laptop Collections</h2>
                    <Link to="#" className='text-white underline'>Shop Now</Link>
            
                </div>

            </div>
            
        </section>
    )
}

export default SmartPhones
