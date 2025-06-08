import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'

const TopBar = () => {
    return (
        <div className='bg-stone-900 text-orange-600'>
            <div className='container mx-auto flex justify-between items-center py-3 px-4'>
                {/* anchor tag for icon */}
                <div className='hidden md:flex items-center space-x-4'>
                    <a href="#" className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5'/>
                </a>

                <a href="#" className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5'/>
                </a>

                <a href="#" className='hover:text-gray-300'>
                    <RiTwitterXLine className='h-4 w-4'/>
                </a>
                </div>


                <div className='text-sm text-center flex-grow'>
                    <span>Shop Smart, Live Better Today</span>
                </div>

                    {/* phone number */}
                <div className='text-sm'>
                    <a href="tel:+1234567890" className='hidden md:block hover:text-gray-300'>
                        +91 1234567890
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TopBar
