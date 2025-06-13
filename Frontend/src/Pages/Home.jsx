import React from 'react'
import Hero from '../Components/Layout/Hero'
import Electronics from '../Components/Products/ElectronicsCollection'
import NewArrival from '../Components/Products/NewArrival'
import ProductDetails from '../Components/Products/ProductDetails'
import WhyShopWithUs from '../Components/Common/WhyShopWithUs'

const Home = () => {
    return (
        <div>
            <Hero/>
            <Electronics/>
            <NewArrival/>


           {/* best seller section */}
            <h2 className='text-center text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent '>Best Seller</h2>
            <ProductDetails/>

            <WhyShopWithUs/>
        </div>
    )
}

export default Home
