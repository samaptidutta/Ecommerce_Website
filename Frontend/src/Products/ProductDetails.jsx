import React, { useEffect, useState } from 'react'

const ProductDetails = () => {

    const selectedProduct ={
        name:"Samsung Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage)",
        originalPrice:"9,999",
        reducePrice:"6,249",
        brand:"Samsung",
        operating:"Android 14",
        ram:"4 GB",
        cpu: "MediaTek Helio",
        speed:"2 GHz",
        description:"Samsung Galaxy M05 features a 6.7 HD+ display, 50MP dual rear camera, 8MP front camera, and a 5000mAh battery with 25W fast charging. Powered by Android 14, Octa-Core processor, 8GB RAM (RAM Plus), and expandable storage up to 1TB .",
        images:[
            {
            url:"https://images.samsung.com/is/image/samsung/p6pim/in/feature/others/in-feature-galaxy-m05-4-gb-memory-543538896?$FB_TYPE_A_MO_PNG$",
            altText:"mobile 1"
        },
        {
            url:"https://img.myipadbox.com/upload/store/product_l/EDA007263108A.jpg",
            altText:"mobile 2"
        }
    ]
    }


    const [mainImg,setMainImg] = useState("")

    useEffect(()=>{
        if(selectedProduct ?.images?.length>0){
            setMainImg(selectedProduct.images[0].url)
        }
    },[])


    return (
        <section className='p-6'>
            <div className='max-w-6xl mx-auto bg-stone-900 p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row'>
                    {/* left thumbnails */}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {selectedProduct.images.map((item,ind)=>
                        (
                            <img key={ind} src={item.url} alt={item.altText || `Thumbnail ${ind}`}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-200 ${mainImg===item.url ? "border-red-700": "border-gray-200"}`}
                            onClick={()=>setMainImg(item.url)}
                            />
                        )
                        )}
                    </div>

                    {/* Main image */}
                    <div className='md:w-1/2'>
                        <div className='mb-4'>
                            <img src={mainImg}  alt="main product" 
                            className='w-full h-auto object-cover rounded-lg'
                            />
                        </div>
                    </div>

                    {/* mobile thumbnail */}
                    <div className='md:hidden flex  overscroll-x-scroll space-x-4 mb-4'>
                        {selectedProduct.images.map((item,ind)=>(
                            <img key={ind} src={item.url} alt={item.altText || `Thumbnail ${ind}`}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-200 ${mainImg===item.url ? "border-red-700": "border-gray-200"}`}
                            onClick={()=>setMainImg(item.url)}
                            />
                        ))}
                    </div>

                    {/* right section */}
                    <div className='md:w-1/2 md:ml-15'>

                        <h1 className='text-2xl  md:text-3xl font-semibold mb-2 text-orange-500'>
                            {selectedProduct.name}
                        </h1>

                        {/* original price */}
                        <p className='text-lg text-gray-200 mb-1 line-through'>{selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}</p>

                        {/* reduce price */}
                        <p className='text-xl text-orange-500 mb-2'>
                            ₹{selectedProduct.reducePrice}
                        </p>

                        {/* brand */}
                        <p className='mb-4 text-yellow-400'>
                            {selectedProduct.description}
                        </p>
                        {/* all features */}
                        <div className='mb-4'>
                        <p className='text-orange-600'>Brand : {selectedProduct.brand}</p>
                        <p className='text-orange-600'>Operating System : {selectedProduct.operating}</p>
                        <p className='text-orange-600'>Ram : {selectedProduct.ram}</p>
                        <p className='text-orange-600'>CPU : {selectedProduct.cpu}</p>
                        <p className='text-orange-600'>CPU Speed : {selectedProduct.speed}</p>
                        <div></div>
                        </div>

                        {/* add to cart button */}
                        <button className='bg-neutral-700 text-yellow-500 py-2 px-6 w-full mb-4 rounded-lg font-semibold cursor-pointer'>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails


