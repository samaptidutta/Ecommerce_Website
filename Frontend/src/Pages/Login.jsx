import React, { useEffect, useState } from 'react';
import  {Link, useLocation, useNavigate} from 'react-router-dom';

import { loginUser } from '../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slice/cartSlice';

    const Login = () => {

        const [email,setEmail]= useState("");
        const [password,setPassword]= useState("");
        const dispatch = useDispatch();
        const navigate = useNavigate()
        const location = useLocation();
        const {user,guestId} = useSelector((state)=> state.auth);
        const {cart} = useSelector((state)=>state.cart)
        const redirect = new URLSearchParams(location.search).get("redirect") || "/"
        const isCheckoutRedirect = redirect.includes("checkout")
        useEffect(()=>{
            if(user){
                if(cart?.products.length > 0 (guestId) ){
                    dispatch(mergeCart({guestId,user}))
                    .then(()=> {
                        navigate(isCheckoutRedirect ? "/checkout" : "/")
                    })
                } else{
                    navigate(isCheckoutRedirect ? "/checkout" : "/")
                }
            }
        },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch])
        const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(loginUser({email, password}));
            setEmail("")
        setPassword("")
    
    }

    return (
        <div className='flex mt-[140px]'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>

                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text uppercase '>DIGIMART</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there!👋🏼</h2>
                    <p className='text-center mb-6'>
                        Enter your username and password to login
                    </p>
                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-sm font-semibold mb-2'>Email</label>
                        <input type="email" value={email}  id="email" onChange={(e)=>setEmail(e.target.value)}
                        className='w-full p-2 border rounded'
                        placeholder='enter your email address'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="password" className='block text-sm font-semibold mb-2'>Password</label>
                        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        className='w-full p-2 border rounded'
                        placeholder='enter your password'
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>Sign In</button>

                    <div className='flex items-center mt-6 gap-2'>
                        <p className=' text-center text-sm'>Don't have an account ?</p>
                    <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>Register</Link>
                    </div>
                </form>

            </div>

            <div className='hidden md:block w-1/2 bg-gray-800 mb-4 mr-4 '>
                    <div  className='h-full flex flex-col justify-center items-center '>
                <img src="https://img.freepik.com/free-photo/close-up-portrait-teenager-isolated_23-2149158273.jpg?semt=ais_hybrid&w=740" alt="login to account" 
                className='h-[700px] w-full object-cover rounded-xl'
                />
            </div>
            </div>
        </div>
    )
    }

    export default Login
