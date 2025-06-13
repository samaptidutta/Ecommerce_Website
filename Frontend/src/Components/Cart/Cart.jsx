import React from 'react'
import {RiDeleteBin3Line} from 'react-icons/ri'

const Cart = () => {

    const productItem = [
        {
            name:"Samsung Galaxy M05",
            reducePrice: 6249,
            originalPrice:9999,
            os :"Android 14",
            ram: "4 GB",
            cpu:"MediaTek Helio",
            speed:"2 GHz",
            image:"https://images.samsung.com/is/image/samsung/p6pim/in/feature/others/in-feature-galaxy-m05-4-gb-memory-543538896?$FB_TYPE_A_MO_PNG$",
            
            description: "Mint Green, 4GB RAM, 64 GB Storage",
        }
    ]


    return (
        <div>
            {
                productItem.map((item,ind)=>(
                    <div key={ind} className='flex flex-col items-start justify-center py-4 px-2 border-b border-gray-300 pl-2'>

                        {/* product details */}
                        <div className='flex items-center'>
                            {/* cart images */}
                            <img src={item.image} alt={item.name} className='rounded-lg w-20 h-24 object-cover mr-4 ' />

                                {/* cart item name */}
                            <div>
                                <h3 className='text-orange-600'>{item.name}</h3>
                                <p className='text-sm text-orange-500'>os: {item.os} | color: {item.color}</p>
                                <p className='text-sm text-orange-500'>description: {item.description}</p>
                                <p className='text-sm text-orange-500'>RAM: {item.ram}</p>
                                <p className='text-sm text-orange-500'>CPU: {item.cpu}</p>
                                <p className='text-sm text-orange-500'>CPU Speed: {item.speed}</p>

                                {/* increasing and decreasing button */}
                                {/* <div className='flex items-center mt-2 gap-2'>
                                    <button className='border rounded-lg px-2  py-1  text-xl font-medium cursor-pointer text-white'>+</button>
                                    <span className='text-red-600'>{item.quantity}</span>
                                    <button className='border rounded-lg px-2  py-1  text-xl font-medium cursor-pointer text-white'>-</button>
                                </div> */}

                            </div>

                        </div>

                        {/* product price */}
                        <div>
                            <p className='text-lg text-gray-200 mb-1 line-through'>
                                {item.originalPrice.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                            <p className='flex gap-2 text-gray-200'>
                                {item.reducePrice.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}

                                <button>
                                    <RiDeleteBin3Line className='h-6 w-6 ml-2 text-red-600 cursor-pointer' />
                                </button>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Cart
