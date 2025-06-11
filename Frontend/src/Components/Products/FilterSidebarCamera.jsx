// Components/Products/FilterSidebarCamera.jsx
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSidebarCamera = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const [priceRange, setPriceRange] = useState([0, 100000]);

    const [filter, setFilters] = useState({
        brand: "",
        resolution: "",
        type: "",
        minPrice: 0,
        maxPrice: 100000
    });

    const brand = ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic"];
    const resolution = ["12MP", "18MP", "24MP", "32MP", "48MP"];
    const type = ["DSLR", "Mirrorless", "Point & Shoot"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilters({
            brand: params.brand || "",
            resolution: params.resolution || "",
            type: params.type || "",
            minPrice: Number(params.minPrice) || 0,
            maxPrice: Number(params.maxPrice) || 100000
        });

        setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 100000]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        let newFilters = { ...filter, [name]: value };

        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const handlePriceChange = (e) => {
        const newMaxPrice = Number(e.target.value);
        setPriceRange([filter.minPrice, newMaxPrice]);
        const newFilters = { ...filter, maxPrice: newMaxPrice };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, val]) => {
            if (val || val === 0) params.set(key, val)
        });
        setSearchParams(params, { replace: true });
    };

    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-orange-600 mb-4'>
                Filter
            </h3>

            {/* brand */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2'>Brand</label>
                {brand.map((item) => (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                            type="radio"
                            name="brand"
                            id={`brand-${item}`}
                            value={item}
                            onChange={handleFilterChange}
                            checked={filter.brand === item}
                            className='mr-2 h-4 w-4 text-yellow-500'
                        />
                        <label htmlFor={`brand-${item}`} className="text-gray-200">{item}</label>
                    </div>
                ))}
            </div>

            {/* resolution */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2'>Resolution</label>
                {resolution.map((item) => (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                            type="radio"
                            name="resolution"
                            id={`resolution-${item}`}
                            value={item}
                            onChange={handleFilterChange}
                            checked={filter.resolution === item}
                            className='mr-2 h-4 w-4 text-yellow-500'
                        />
                        <label htmlFor={`resolution-${item}`} className="text-gray-200">{item}</label>
                    </div>
                ))}
            </div>

            {/* type */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2'>Type</label>
                {type.map((item) => (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                            type="radio"
                            name="type"
                            id={`type-${item}`}
                            value={item}
                            onChange={handleFilterChange}
                            checked={filter.type === item}
                            className='mr-2 h-4 w-4 text-yellow-500'
                        />
                        <label htmlFor={`type-${item}`} className="text-gray-200">{item}</label>
                    </div>
                ))}
            </div>

            {/* price range */}
            <div className='mb-8'>
                <label className='block text-orange-600 font-medium mb-2'>Price Range</label>
                <input
                    type="range"
                    name='maxPrice'
                    min={0}
                    max={100000}
                    onChange={handlePriceChange}
                    value={priceRange[1]}
                    className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
                />
                <div className='flex justify-between text-gray-600 mt-2'>
                    <span className='text-red-400'>₹{priceRange[0]}</span>
                    <span className='text-red-400'>₹{priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebarCamera
