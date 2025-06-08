import React from 'react'
import {RiDeleteBin3Line} from 'react-icons/ri'

const Cart = () => {

    const productItem = [
        {   
            name:"camera",
            price: 50000,
            Weight :"1 kg 540 g",
            quantity: 2,
            image:"https://m.media-amazon.com/images/I/61YMAaVsb8L._SX522_.jpg",
            color:"Black",
            description: "128GB, Snapdragon 8 Gen 3, AMOLED 2X",
        }
    ]


    return (
        <div>
            {
                productItem.map((item,ind)=>(
                    <div key={ind} className='flex items-start justify-between py-4 px-2 border-b border-gray-300 pl-2'>

                        {/* product details */}
                        <div className='flex items-center'>
                            {/* cart images */}
                            <img src={item.image} alt={item.name} className='rounded-lg w-20 h-24 object-cover mr-4 ' />

                                {/* cart item name */}
                            <div>
                                <h3 className='text-orange-600'>{item.name}</h3>
                                <p className='text-sm text-orange-500'>weight: {item.Weight} | color: {item.color}</p>
                                <p className='text-sm text-orange-500'>description: {item.description}</p>

                                {/* increasing and decreasing button */}
                                <div className='flex items-center mt-2 gap-2'>
                                    <button className='border rounded-lg px-2  py-1  text-xl font-medium cursor-pointer text-white'>+</button>
                                    <span className='text-red-600'>{item.quantity}</span>
                                    <button className='border rounded-lg px-2  py-1  text-xl font-medium cursor-pointer text-white'>-</button>
                                </div>

                            </div>

                        </div>

                        {/* product price */}
                        <div>
                            <p className='flex flex-col gap-2 text-gray-200'>{item.price.toLocaleString('en-IN', {style: 'currency',currency: 'INR'}
                            )}
                                <button>
                                    <RiDeleteBin3Line className='h-6 w-6 ml-2 text-red-600 cursor-pointer'/>
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
