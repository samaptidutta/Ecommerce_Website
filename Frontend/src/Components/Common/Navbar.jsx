import { useState } from "react";
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import {  IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import CartDrawer from "../Layout/CartDrawer";
import Searchbar from "./Searchbar";

    const Navbar = () => {
    const [cartDrawer,setCartDrawer] = useState(false)
    const [navDrawerOpen,setNavDrawerOpen] = useState(false)

    
    // toggle cart drawer function
    const toggleCartDrawer = ()=>{
        setCartDrawer(!cartDrawer)
    }

    const toggleNaveDrawer = ()=>{
        setNavDrawerOpen(!navDrawerOpen);
    }

    
    
    return (
        <>
        <nav className="flex items-center justify-between mx-auto py-4 px-6 fixed top-[44px] left-0 right-0 z-40 bg-neutral-800/50 backdrop-blur-2xl shadow-lg">
            {/* left logo */}
            <div>
            <Link
                to="/"
                className="font-[myFont] font-bold text-2xl   bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text uppercase"
            >
                DigiMart
            </Link>
            </div>

            {/* center navigation link */}
            <div className="hidden md:flex space-x-6 tracking-tight ">
            {/* Smartphones  */}
            <div className="relative">
                    <Link
                    to="smartphone"
                    className="flex items-center text-orange-500 text-sm hover:text-red-500 font-bold uppercase tracking-wide"
                    >Smartphones</Link>
            </div>

            {/* Cameras   */}
                    <div className="relative">
                    <Link
                    to="camera"
                    className="flex items-center text-orange-500 text-sm hover:text-red-500 font-bold uppercase tracking-wide">Cameras </Link>
                    </div>

            {/* Headphones & Earbuds */}
                    <div className="relative">
                        <Link
                        to="headphone"
                        className="flex items-center text-orange-500 text-sm hover:text-red-500 font-bold uppercase tracking-wide"
                        >Headphones & Earbuds</Link>
                    </div>

            {/* Smartwatches  */}
                    <div className="relative">
                        <Link
                        to="watch"
                        className="flex items-center text-orange-500 text-sm hover:text-red-500 font-bold uppercase tracking-wide"
                        >Smartwatches</Link>
                    </div>

            {/*Laptop */}
                    <div className="relative">
                        <Link
                        to="tv"
                        className="flex items-center text-orange-500 text-sm hover:text-red-500 font-bold uppercase tracking-wide"
                        >Laptop</Link>
                    </div>


            </div>

            {/* right -icons */}

            <div className="flex items-center space-x-4 ">
                
            <Link to="/admin" className="block bg-gray-800 px-2 rounded text-sm text-white">Admin</Link>

            <Link to="/profile" className="text-orange-600 hover:text-red-600 ">
                <HiOutlineUser className="h-6 w-6 " />
            </Link>

                {/* cart drawer */}
            <button onClick={toggleCartDrawer} className="relative hover:text-black">
                <HiOutlineShoppingBag className="text-orange-600 hover:text-red-600 h-6 w-6" />
                <span className="absolute -top-1 bg-burgundy text-white size-xs rounded-full px-2 py-0.5 text-xs">
                4
                </span>
            </button>

            {/* search icon */}
            <Searchbar />

            {/* hamburger icon */}
            <button onClick={toggleNaveDrawer} className="md:hidden">
                <HiBars3BottomRight className="h-6 w-6 text-orange-600"/>
            </button>
            </div>
        </nav>

        <CartDrawer cartDrawer={cartDrawer} toggleCartDrawer={toggleCartDrawer} />


        {/* mobile navigation */}
        <div className={`sm:hidden fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-lightWhite/80 backdrop-blur-lg shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                <div className="flex justify-end p-4">
                    <button onClick={toggleNaveDrawer}>
                        <IoMdClose className="h-6 w-6 text-gray-500"/>
                    </button>
                </div>

                <div className="p-4">
                    {/* this is h2 menu tag */}
                    <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">Menu</h2>

                {/* here starts the mobile drawer nav menu */}
                <nav className="flex flex-col gap-3">
                            
                    
                    {/* Smartphones  */}
                    <div className="relative">
                            <Link
                            to="smartphone"
                            className="flex items-center text-orange-600 text-sm hover:text-black font-bold uppercase tracking-tighter"
                            >Smartphones</Link>
                    </div>

                    {/* Cameras  */}
                            <div className="relative">
                            <Link
                            to="camera"
                            className="flex items-center text-orange-600 text-sm hover:text-black font-bold uppercase tracking-tighter">Cameras</Link>
                            </div>

                    {/* Headphones & Earbuds */}
                            <div className="relative">
                                <Link
                                to="headphone"
                                className="flex items-center text-orange-600 text-sm hover:text-black font-bold uppercase tracking-tighter"
                                >Headphones & Earbuds</Link>
                            </div>

                    {/* Smartwatches  */}
                            <div className="relative">
                                <Link
                                to="watch"
                                className="flex items-center text-orange-600 text-sm hover:text-black font-bold uppercase tracking-tighter"
                                >Smartwatches</Link>
                            </div>

                    {/*Laptop */}
                            <div className="relative">
                                <Link
                                to="tv"
                                className="flex items-center text-orange-600 text-sm hover:text-black font-bold uppercase tracking-tighter"
                                >Laptop</Link>
                            </div>

                    
                </nav>

                </div>
                
        </div>
        </>
    );
};

export default Navbar;
