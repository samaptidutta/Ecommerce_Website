import React from 'react'
import {IoMdClose} from 'react-icons/io'
import Cart from '../Cart/Cart'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartDrawer = ({cartDrawer,toggleCartDrawer}) => {

    const navigate = useNavigate()
    const {user,guestId} = useSelector((state) =>state.auth);
    const {cart} = useSelector((state) =>state.cart)
    const userId = user ? user._id : null;

    const handleChekout =()=>{
        toggleCartDrawer()
        
        if(!user){
            navigate("/login?redirect=checkout");
        } else{
            navigate("/checkout")
        }
    }


    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-stone-900 shadow-lg transform transition-transform duration-300 flex flex-col  z-50 ${cartDrawer ? "translate-x-0" : "translate-x-full"}`}>
            

            {/* close cart drawer button */}
            <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer} className='cursor-pointer'>
                    <IoMdClose className='h-6 w-6 text-white hover:text-gray-200'/>
                </button>
            </div>

            {/* card content with scrollable area */}
            <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-medium sm:text-xl font-semibold text-orange-600 mb-4 pl-4'>Your Cart</h2>
                {
                    cart && cart?.products?.length > 0 ? (<Cart cart={cart} userId={userId} guestId={guestId} />) : (
                        <p>your cart is empty.</p>
                    )
                }
                

                {/* component for cart content */}
            </div>

            {/* Checkout button fixed at the bottom */}
            <div className='p-4 bg-lightWhite sticky bottom-0'>
                {cart && cart?.products?.length > 0 && (
                    <>
                        <button onClick={handleChekout} className='w-full bg-orange-600 text-white rounded-xl font-semibold hover:bg-yellow-700'>Checkout</button>
                    
                    
                    </>
                )}
                
            </div>
        </div>
    )
}

export default CartDrawer
