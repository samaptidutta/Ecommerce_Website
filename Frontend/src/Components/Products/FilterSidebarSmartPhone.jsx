import React, { useEffect, useState } from 'react'
import {  useSearchParams } from 'react-router-dom'

const FilterSidebarSmartPhone = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    
    const [priceRange,setPriceRange] = useState([0,100])

    const [filter,setFilters] = useState({
        brand:"",
        ram:"",
        storage:"",
        os:"",
        minPrice:0,
        maxPrice:100
    })

    

    const brand =["Samsung","Apple","Xiaomi","Realme","OnePlus"];
    const ram =["2GB","4GB","6GB","8GB","12GB"];
    const storage =["32GB","64GB","128GB","256GB","512GB"];
    const os =["Android","iOS","Windows"];

    useEffect(()=>{
        const params = Object.fromEntries([...searchParams]);

        setFilters({
            brand: params.brand || "",
            ram: params.ram || "",
            storage: params.storage || "",
            os: params.os || "",
            minPrice:Number(params.minPrice) || 0,
            maxPrice:Number(params.maxPrice) || 100

        });

        setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 100]);
    },[searchParams])

    // filter change
    const handleFilterChange = (e)=>{
        const {name,value} = e.target
        let newFilters = {...filter, [name]:value};

        setFilters(newFilters);
        updateURLParams(newFilters)
        console.log(newFilters);
        
    }

    // for price range change
    const handlePriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    setPriceRange([filter.minPrice, newMaxPrice]);
    const newFilters = { ...filter, maxPrice: newMaxPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
    };

    // for updating url
    const updateURLParams = (newFilters)=>{
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key,val])=>{
            if(val || val === 0) params.set(key,val)
        });
        setSearchParams(params,{replace:true})
    }


    return (
        <div className='p-4'>
            <h3  className='text-xl font-medium text-orange-600 mb-4'>
                Filter
            </h3>

            {/* brand */}
            <div className='mb-6'>
                <label  className='block text-orange-600 font-medium mb-2 '>Brand</label>
                {brand.map((item)=> (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                        type="radio"
                        name="brand"
                        id={`brand-${item}`}
                        value={item}
                        onChange={handleFilterChange}
                        checked={filter.brand === item}
                        className='mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300'
                        />
                        <label htmlFor={`brand-${item}`} className="text-gray-200">
                            {item}
                    </label>
                    </div>
                ))}
            </div>

            {/* ram */}
            <div className='mb-6'>
                <label   className='block text-orange-600 font-medium mb-2 '>RAM</label>
                {ram.map((item)=> (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                        type="radio"
                        name="ram"
                        id={`ram-${item}`}
                        value={item}
                        onChange={handleFilterChange}
                        checked={filter.ram === item}
                        className='mr-2 h-4 w-4 text-yellow-500 focus:ring-orange-400 border-gray-300'
                        />
                        <label htmlFor={`ram-${item}`} className="text-gray-200">
                            {item}
                        </label>
                    </div>
                ))}
            </div>


            {/* storage */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2 '>Storage</label>
                {storage.map((item)=> (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                        type="radio"
                        name="storage"
                        id={`storage-${item}`}
                        value={item}
                        onChange={handleFilterChange}
                        checked={filter.storage === item}
                        className='mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300'
                        />
                        <label htmlFor={`storage-${item}`} className="text-gray-200">
                            {item}
                        </label>
                    </div>
                ))}
            </div>


            {/* operating system */}
            <div className='mb-6'>
                <label   className='block text-orange-600 font-medium mb-2 '>Operating System</label>
                {os.map((item)=> (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                        type="radio"
                        name="os"
                        id={`os-${item}`}
                        value={item}
                        onChange={handleFilterChange}
                        checked={filter.os === item}
                        className='mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300'
                        />
                        <label htmlFor={`os-${item}`} className="text-gray-200">
                            {item}
                        </label>
                    </div>
                ))}
            </div>


            {/* price range filter */}
            <div className='mb-8'>
                <label className='block text-orange-600 font-medium mb-2'>Price Range</label>
                <input 
                type="range" 
                name='maxPrice' 
                min={0} 
                max={100} 
                onChange={handlePriceChange} 
                value={priceRange[1]}
                className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'   />

                <div className='flex justify-between text-gray-600 mt-2'>
                    <span className='text-red-400'>${priceRange[0]}</span>
                    <span className='text-red-400'>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebarSmartPhone