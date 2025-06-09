import React from 'react'
import { Link } from 'react-router-dom'

const ProductGridDetails = ({product}) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-stone-900'>
            {product.map((item,ind)=>(
                <Link key={ind} to={`/item/${item._id}`} className='block'>
                    <div className='p-4 rounded-lg'>
                        <div className='w-full h-96 mb-4'>
                            <img src={item.images[0].url} alt={item.images[0].altText|| item.name} 
                            className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                        <h3 className='text-small mb-2 text-orange-500'>{item.name}</h3>
                        <p className='text-red-600 font-medium tracking-tighter'>&#8377;{item.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductGridDetails
