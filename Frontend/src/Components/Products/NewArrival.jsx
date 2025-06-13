import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {Link} from 'react-router-dom'

const NewArrival = () => {

    const scrollRef = useRef(null)
    const [isDragging,  setIsDragging] = useState(false)
    const [startX,setStartX] = useState(0)
    const [scrollLeft,setScrollLeft] = useState(false)
    const [canScrollRight,setCanScrollRight] = useState(false)
    const [canScrollLeft,setCanScrollLeft] = useState(false)
    

    const newArrival =[
        {
            _id:1,
            name:"Camera",
            price:50000,
            images: [
                {
                    url:"https://thumbs.dreamstime.com/b/detailed-shot-dslr-camera-lens-placed-horizontally-dark-surface-glowing-ring-blue-light-background-354973040.jpg",
                    altText:"Camera"
                }
            ]
        },

        {
            _id:2,
            name:"phones",
            price:18000,
            images: [
                {
                    url:"https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    altText:"phone"
                }
            ]
        },
        {
            _id:3,
            name:"laptops",
            price:55000,
            images: [
                {
                    url:"https://images.unsplash.com/photo-1511385348-a52b4a160dc2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D",
                    altText:"laptop"
                }
            ]
        },
        {
            _id:4,
            name:"watch",
            price:9000,
            images: [
                {
                    url:"https://images.pexels.com/photos/4672162/pexels-photo-4672162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    altText:"watch"
                }
            ]
        },

        {
            _id:5,
            name:"headphones",
            price:3000,
            images: [
                {
                    url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-rKoBpz2dHzEdJ_VNH7XOAxVRkddtg1va27eyu2CGoaV0VT33rMIgPAQ&s=10",
                    altText:"headphones"
                }
            ]
        },

        {
            _id:6,
            name:"Camera",
            price:50000,
            images: [
                {
                    url:"https://picsum.photos/500/500?/random=1",
                    altText:"Camera"
                }
            ]
        },

        {
            _id:7,
            name:"Camera",
            price:50000,
            images: [
                {
                    url:"https://picsum.photos/500/500?/random=1",
                    altText:"Camera"
                }
            ]
        }

    ]

    const scroll = (direction)=>{
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({left:scrollAmount, behaviour : "smooth"})
    }


    const handleMouseDown = (e)=>{
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)

    }

    const handleMouseMove = (e)=>{
        if(!isDragging)
            return;
        const newX = e.pageX - scrollRef.current.offsetLeft
        const walk = newX - startX 
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }

    const handleMouseUp = (e)=>{
        setIsDragging(false)
    }

    const handleMouseLeave = (e)=>{
        
    }

    //update scroll button function definition
    const updateScrollButtons = ()=>{
        const container = scrollRef.current;

        if(container){
            const leftScroll = container.scrollLeft;
            const rightScroll = container.scrollWidth - container.scrollLeft - container.clientWidth > 1;

            setCanScrollLeft(leftScroll>0);
            setCanScrollRight(rightScroll)
        }

    }


    useEffect(()=>{
        const container = scrollRef.current
        if(container){
            container.addEventListener('scroll',updateScrollButtons);
            updateScrollButtons()
            return ()=>container.removeEventListener("scroll",updateScrollButtons)
        }
    },[])

    


    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto text-center mb-10 relative bg-stone-800'>

                <h2 className='text-3xl font-bold mb-4 text-red-500'>New Arrivals, Some Great Deals !</h2>
                <p className='text-lg text-orange-600 mb-8'>Discover the newest must-haves in tech,Upgrade your setup with our freshest picks.</p>

                {/* scroll buttons */}
                <div className='absolute right-0 bottom-[-40px] flex space-x-2'>
                    <button className={`p-2 rounded border bg-orange-700 text-gray-200 ${canScrollLeft ? "bg-orange-700 text-gray-200" :  "bg-orange-900 text-gray-400"}`} onClick={()=>scroll("left")} disabled={!canScrollLeft}> 
                        <FiChevronLeft className='text-2xl'/>
                    </button>

                    <button className={`p-2 rounded border bg-orange-700 text-gray-200 ${canScrollRight ? "bg-orange-700 text-gray-200" :  "bg-orange-900 text-gray-400"}`} onClick={()=>scroll("right")} disabled={!canScrollRight}> 
                        <FiChevronRight className='text-2xl'/>
                    </button>
                </div>
            </div>

            {/* scrollable content */}
            <div ref={scrollRef} className={`container mx-auto overflow-x-scroll flex space-x-6 relative custom-scrollbar scroll-smooth ${isDragging ?  "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}>

                {newArrival.map((item)=>(
                    <div key={item._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img
                        src={item.images[0]?.url}
                        alt={item.images[0]?.altText || item.name}
                        className='w-full h-[300px] object-cover rounded-lg'
                        draggable="false"
                        />

                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-yellow-200 p-1 text-center rounded-b-lg font-semibold'>
                            <Link to={`/product/${item._id}`} className="block">
                                <h4>{item.name}</h4>
                                <p>₹{item.price}</p>
                            
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default NewArrival
