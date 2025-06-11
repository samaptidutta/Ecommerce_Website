import React, { useEffect, useRef, useState } from 'react'
import  {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../../Components/Products/FilterSidebarSmartPhone';
import ProductGridDetails from '../../Components/Products/ProductGridDetails';


const SmartPhone = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)

    // toggle function for sidebar menu
    const toggleSidebar = ()=>{
        setIsSidebarOpen(!isSidebarOpen);
    }


    const handleClickOutside = (e)=>{
        // close sidebar if clicked outside
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setIsSidebarOpen(false);
        }
    }

    useEffect(()=>{
        // add event listener for clicks
        document.addEventListener("mousedown",handleClickOutside)
        // clean event listener
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
        
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            const fetchProducts = [
                {
            _id:1,
            name:"product 1",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=10",altTest:"product 1"}]
        },
        {
            _id:2,
            name:"product 2",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=19",altTest:"product 1"}]
        },
        {
            _id:3,
            name:"product 3",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=18",altTest:"product 1"}]
        },
        {
            _id:4,
            name:"product 4",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=17",altTest:"product 1"}]
        },
        {
            _id:5,
            name:"product 5",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=16",altTest:"product 1"}]
        },
        {
            _id:6,
            name:"product 6",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=15",altTest:"product 1"}]
        },
        {
            _id:7,
            name:"product 7",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=12",altTest:"product 1"}]
        },
        {
            _id:8,
            name:"product 8",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=2",altTest:"product 1"}]
        },
        {
            _id:9,
            name:"product 9",
            price: 100,
            images:[{url:"https://picsum.photos/500/500?random=1",altTest:"product 1"}]
        }
    ]
    setProducts(fetchProducts)
        },1000)
    },[])
    return (
        <div className='mt-[140px] flex flex-col lg:flex-row'>
            {/* mobile filter button */}
            <button onClick={toggleSidebar} className='lg:hidden border border-neutral-600 shadow-md p-2 flex justify-center items-center bg-stone-700'>
                <FaFilter className='mr-2 text-gray-300'/>
            </button>

            {/* filter sidebar */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed mt-[100px] lg:mt-[0px] inset-y-0 z-30 left-0 w-64 bg-neutral-800 overflow-y-auto transition-transform duration-300 lg:sticky lg:translate-x-0 `}>
                <FilterSidebar/>
            </div>

            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-700 font-semibold'>All Collection</h2>


                {/* product grid */}
                <ProductGridDetails product={products}/>
            </div>
        </div>
    )
}

export default SmartPhone
