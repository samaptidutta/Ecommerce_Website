import React, { useEffect, useState } from 'react'
import Hero from '../Components/Layout/Hero'
import Electronics from '../Components/Products/ElectronicsCollection'
import NewArrival from '../Components/Products/NewArrival'
import ProductDetails from '../Components/Products/ProductDetails'
import WhyShopWithUs from '../Components/Common/WhyShopWithUs'
import {useDispatch, useSelector} from 'react-redux'
import {  fetchProductsByFilters,fetchBestSeller } from '../redux/slice/productSlice'
import axios from 'axios'



const Home = () => {
    const dispatch = useDispatch();
    const {products, loading, error,bestSeller} = useSelector((state) => state.product);
    const [bestSellerProduct,setBestSellerProduct] = useState(null)

    useEffect(() =>{
        dispatch(
            fetchProductsByFilters({
                category: 'Electronics',
                price: 100,
                rating: 4,
                brand: 'Apple'
            })
        )

        dispatch(fetchBestSeller());
    },[dispatch])
    console.log('Home - Products:', products);
  console.log('Home - Best Seller:', bestSeller);
  console.log('Home - Error:', error);
    return (
        <div>
            <Hero/>
            <Electronics/>
            <NewArrival/>


           {/* best seller section */}
            <h2 className='text-center text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent '>Best Seller</h2>
            {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}></ProductDetails>):(
                <p className='text-center'>Loading Best seller product</p>
            )}
            <ProductDetails/>

            <WhyShopWithUs/>
        </div>
    )
}

export default Home
