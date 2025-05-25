import React from 'react'
import {IoMdClose} from 'react-icons/io'
import Cart from '../Cart/Cart'

const CartDrawer = ({cartDrawer,toggleCartDrawer}) => {


    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-lightWhite shadow-lg transform transition-transform duration-300 flex flex-col  z-50 ${cartDrawer ? "translate-x-0" : "translate-x-full"}`}>
            

            {/* close cart drawer button */}
            <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer} className='cursor-pointer'>
                    <IoMdClose className='h-6 w-6 text-gray-500 hover:text-gray-800'/>
                </button>
            </div>

            {/* card content with scrollable area */}
            <div className='flex-grow p-4overflow-y-auto'>
                <h2 className='text-medium sm:text-xl font-semibold text-gray-500 mb-4 pl-4'>Your Cart</h2>
                <Cart/>

                {/* component for cart content */}
            </div>

            {/* Checkout button fixed at the bottom */}
            <div className='p-4 bg-lightWhite sticky bottom-0'>
                <button className='w-full bg-neutral-600 text-white rounded-xl font-semibold hover:bg-gray-800'>Checkout</button>
                <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>Shipping, taxes, and discount calculated at checkout</p>
            </div>
        </div>
    )
}

export default CartDrawer
