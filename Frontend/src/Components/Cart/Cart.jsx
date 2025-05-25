import React from 'react'
import {RiDeleteBin3Line} from 'react-icons/ri'

const Cart = () => {

    const productItem = [
        {
            name:"T-shirt",
            price: 100,
            size:"M",
            quantity: 2,
            image:"https://picsum.photos/200?random=1",
            color:"Black"
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
                            <img src={item.image} alt={item.name} className='rounded-lg w-20 h-24 object-cover mr-4' />

                                {/* cart item name */}
                            <div>
                                <h3>{item.name}</h3>
                                <p className='text-sm text-gray-500'>size: {item.size} | color: {item.color}</p>

                                {/* increasing and decreasing button */}
                                <div className='flex items-center mt-2 gap-2'>
                                    <button className='border rounded-lg px-2  py-1  text-xl font-medium cursor-pointer'>+</button>
                                    <span>{item.quantity}</span>
                                    <button className='border rounded-lg px-2  py-1  text-xl font-medium cursor-pointer'>-</button>
                                </div>

                            </div>

                        </div>

                        {/* product price */}
                        <div>
                            <p className='flex flex-col gap-2'>{item.price.toLocaleString('en-IN', {style: 'currency',currency: 'INR'}
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
