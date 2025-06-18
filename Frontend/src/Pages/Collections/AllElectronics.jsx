import React, { useEffect, useRef, useState } from 'react'
import  {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../../Components/Products/FilterSidebarSmartPhone';
import ProductGridDetails from '../../Components/Products/ProductGridDetails';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../../redux/slice/productSlice';


const AllElectronics = () => {
    const {collection} = useParams()
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {products,loading,error} = useSelector((state)=> state.product)
    const queryParams = Object.fromEntries([...searchParams])

    useEffect(()=>{
        dispatch(fetchProductsByFilters({collection, ...queryParams}))
    },[dispatch,collection,searchParams,queryParams])
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
                <ProductGridDetails product={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default AllElectronics
