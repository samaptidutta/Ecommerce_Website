import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const Searchbar = () => {

    const [searchTerm,setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchToggle = ()=>{
        setIsOpen(!isOpen)
    }

    const handleSearch = (e)=>{
        e.preventDefault();
        console.log("search term ",searchTerm);
        setIsOpen(false)
        setSearchTerm(" ")
        
    }

    return (
        <div className={`flex items-center justify-center transition-all duration-300 w-full ${isOpen ? "absolute top-10 left-0 w-full h-20 sm:h-20 md:h-24 z-50 backdrop-blur-xs" : "w-full mx-auto max-w-7xl px-4 sm:px-6"}`}>
        {
            isOpen ?
            (
            <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full max-w-2xl sm:max-w-lg md:max-w-2xl px-4 sm:px-6'>

                <div className='relative w-full'>
                    <input 
                    type="text"
                    placeholder='Search'
                    value={searchTerm}
                    className='bg-plaeGray w-full py-2 px-4 pl-12 pr-12 rounded-lg focus:outline-none focus-ring-2 focus:ring-blue-500'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    />

                    {/* search icon */}

                    <span className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
                    <HiMagnifyingGlass className='h-5 w-5 text-gray-500' />
                </span>
                </div>



                {/* close button */}
                <button type="button" onClick={handleSearchToggle} className='cursor-pointer'>
                    <HiMiniXMark className='w-6 h-6 absolute  right-9 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'/>
                </button>
            </form>
            )
            :(
                <button className='pl-2 flex justify-center align-center' onClick={handleSearchToggle}>
                    <HiMagnifyingGlass className='h-6 w-6'/>
                </button>
            )
        }
        </div>
    )
}

export default Searchbar
