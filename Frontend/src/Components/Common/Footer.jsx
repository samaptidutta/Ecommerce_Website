import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import {FiPhoneCall} from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='border-t py-12 bg-stone-900'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
                <div>
                    <h3 className='text-lg font-semibold text-orange-600 mb-4 tracking-wide'>Newsletter</h3>
                <p className='text-orange-600 mb-4 text-md tracking-tighter '>
                    Be the first to hear about new products, <br/>
                    exclusive events and online offers.
                </p>

                <p className='text-red-500 text-md font-medium mb-6 tracking-tighter '>Sign up and get 50% off your first order</p>

                {/* newsletter form */}
                <form className='flex'>
                    <input type="email" 
                    placeholder='Enter your Email'
                    className='px-6 py-3 w-full text-small border-l border-b border-orange-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500 transition-all text-white'
                    required
                    />

                    <button type="submit" className='bg-orange-600 text-white px-6 py-3 text-sm rounded-r-md hover:bg-red-800 cursor-pointer transition-all'>Subscribe</button>
                </form>
                </div>

                {/* shop links */}
                <div>
                    <h3 className='bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text font-semibold tracking-tighter mb-4'>Shop</h3>

                    <ul className='space-y-2 text-orange-600'>
                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                Smartphones
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                Cameras
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                Headphones & Earbuds
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                Smartwatches

                            </Link>
                        </li>

                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                            Smart TVs
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* support links */}

                <div>
                    <h3 className='bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text font-semibold tracking-tighter mb-4'>Support</h3>

                    <ul className='space-y-2 text-orange-600'>
                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                Contact Us
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                FAQs
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className='hover:text-gray-200 transition-colors'>
                            
                                Features
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Follow us */}
                <div>
                    <h3 className='text-lg bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text font-semibold tracking-tighter mb-4'>Follow Us</h3>

                    {/* Social media icons */}
                    <div className='flex items-center space-x-4 mb-6 text-yellow-400 '>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='hover:text-orange-400'>
                            <TbBrandMeta className='h-5 w-5' />
                        </a>

                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='hover:text-orange-400'>
                            <IoLogoInstagram className='h-5 w-5' />
                        </a>

                        <a href="https://x.com/home" target="_blank" rel="noopener noreferrer" className='hover:text-orange-400'>
                            <RiTwitterXLine className='h-4 w-4' />
                        </a>
                    </div>

                    <p className='text-orange-600 font-medium'>Call Us</p>
                    <p>
                        <FiPhoneCall className='inline-block mr-2 text-red-500'/>
                        <span className='text-red-600'>+91 1234567890</span>
                    </p>
                </div>

            </div>

            {/* footer bottom */}
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-500 pt-6'>
                <p className='text-orange-400 text-sm font-medium text-center tracking-tighter'>&copy; 2025 Samapti's eMart. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
