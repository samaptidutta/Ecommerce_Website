import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='p-4 relative'>
            

                <img src="https://img.freepik.com/premium-photo/online-shopping-with-laptop-computer-concept-hand-hold-smartphone-laptop-online-shopping-showing-payment-details-ecommerce-shop-ecommerce-website-with-smartphone-shopping-cart-online_162459-3744.jpg" alt="camera"  className=' w-full h-[400px] md:h-[600px] lg:h-[720px] object-cover rounded-lg'/>
                


                <div className='absolute inset-0 bg-black/50 bg-opacity-5 flex items-center justify-center'>
                    <div className='text-center text-white p-6'>
                        <h1 className='text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-4 bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text'>Tech You’ll Love. <br /> Prices You’ll Trust.</h1>

                        <Link to="#" className='bg-orange-700 text-gray-200 px-6 rounded-sm text-lg'>Shop Now</Link>
                    </div>
                </div>

        </section>

    )
}

export default Hero
