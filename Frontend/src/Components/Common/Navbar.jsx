import React from "react";
import { Link } from "react-router-dom";
import {HiBars3BottomRight,HiOutlineShoppingBag ,HiOutlineUser} from "react-icons/hi2";
import Searchbar from "./Searchbar";
import { useState } from "react";
import CartDrawer from "../Layout/CartDrawer";

    const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [cartDrawer,setCartDrawer] = useState(false)

    // toggle cart drawer function
    const toggleCartDrawer = ()=>{
        setCartDrawer(!cartDrawer)
    }
    return (
        <>
        <nav className="container flex items-center justify-between mx-auto py-4 px-6">
            {/* left logo */}
            <div>
            <Link
                to="/"
                className="font-[myFont] font-bold text-2xl   bg-gradient-to-r from-darkPink to-sweetPink text-transparent bg-clip-text uppercase"
            >
                BellaBuy
            </Link>
            </div>

            {/* center navigation link */}
            <div className="hidden md:flex space-x-6 tracking-tight ">
            {/* dropdown wrapper */}
            {/* <div className="relative transition-all duration-300">
                <button className="text-softBlack text-sm hover:text-black font-medium uppercase duration-300" onClick={()=>setDropdownOpen(!dropdownOpen)}>Electronics ▼</button>
                {dropdownOpen && (
                <div className='absolute top-8 left-0 w-48 bg-white shadow-lg border rounded-md z-50'>
                <Link to="/mobiles" className='block px-4 py-2 text-sm hover:bg-gray-100'>Mobiles</Link>
                <Link to="/laptops" className='block px-4 py-2 text-sm hover:bg-gray-100'>Laptops</Link>
                <Link to="/accessories" className='block px-4 py-2 text-sm hover:bg-gray-100'>Accessories</Link>
                </div>
            )}
            </div> */}
            <Link
                to="#"
                className="text-gray-600 text-sm hover:text-black font-bold uppercase"
            >
                Electronics
            </Link>

            <Link
                to="#"
                className="text-gray-600 text-sm hover:text-black font-bold uppercase"
            >
                Fashion
            </Link>

            <Link
                to="#"
                className="text-gray-600 text-sm hover:text-black font-bold uppercase"
            >
                Home & Kitchen
            </Link>

            <Link
                to="#"
                className="text-gray-600 text-sm hover:text-black font-bold uppercase"
            >
                Books
            </Link>

            <Link
                to="#"
                className="text-gray-600 text-sm hover:text-black font-bold uppercase"
            >
                Beauty
            </Link>
            </div>

            {/* right -icons */}

            <div className="flex items-center space-x-4">
            <Link to="/profile" className="hover:text-black ">
                <HiOutlineUser className="h-6 w-6 text-CharcoalGray" />
            </Link>

            <button onClick={toggleCartDrawer} className="relative hover:text-black">
                <HiOutlineShoppingBag className="h-6 w-6 text-CharcoalGray" />
                <span className="absolute -top-1 bg-burgundy text-white size-xs rounded-full px-2 py-0.5 text-xs">
                4
                </span>
            </button>

            {/* search icon */}
            <Searchbar />

            {/* hamburger icon */}

            <button className="md:hidden">
                <HiBars3BottomRight className="h-6 w-6 text-CharcoalGray" />
            </button>
            </div>
        </nav>

        <CartDrawer cartDrawer={cartDrawer} toggleCartDrawer={toggleCartDrawer} />
        </>
    );
};

export default Navbar;
