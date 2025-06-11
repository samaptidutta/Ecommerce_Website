import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebarLaptop = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilters] = useState({
        brand: '',
        processor: '',
        ram: '',
        storage: '',
        minPrice: 0,
        maxPrice: 100
    });

    const [priceRange, setPriceRange] = useState([0, 100]);

    const brand = ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer'];
    const processor = ['Intel i3', 'Intel i5', 'Intel i7', 'Ryzen 5', 'Ryzen 7'];
    const ram = ['4GB', '8GB', '16GB', '32GB'];
    const storage = ['256GB SSD', '512GB SSD', '1TB HDD'];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            brand: params.brand || '',
            processor: params.processor || '',
            ram: params.ram || '',
            storage: params.storage || '',
            minPrice: Number(params.minPrice) || 0,
            maxPrice: Number(params.maxPrice) || 100
        });
        setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 100]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filter, [name]: value };
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
            if (val || val === 0) params.set(key, val);
        });
        setSearchParams(params, { replace: true });
    };

    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-orange-600 mb-4'>Filter</h3>

            {/* Brand */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2'>Brand</label>
                {brand.map((item) => (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                            type='radio'
                            name='brand'
                            id={`brand-${item}`}
                            value={item}
                            onChange={handleFilterChange}
                            checked={filter.brand === item}
                            className='mr-2 h-4 w-4 text-yellow-500'
                        />
                        <label htmlFor={`brand-${item}`} className='text-gray-200'>{item}</label>
                    </div>
                ))}
            </div>

            {/* Processor */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2'>Processor</label>
                {processor.map((item) => (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                            type='radio'
                            name='processor'
                            id={`processor-${item}`}
                            value={item}
                            onChange={handleFilterChange}
                            checked={filter.processor === item}
                            className='mr-2 h-4 w-4 text-yellow-500'
                        />
                        <label htmlFor={`processor-${item}`} className='text-gray-200'>{item}</label>
                    </div>
                ))}
            </div>

            {/* RAM */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2'>RAM</label>
                {ram.map((item) => (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                            type='radio'
                            name='ram'
                            id={`ram-${item}`}
                            value={item}
                            onChange={handleFilterChange}
                            checked={filter.ram === item}
                            className='mr-2 h-4 w-4 text-yellow-500'
                        />
                        <label htmlFor={`ram-${item}`} className='text-gray-200'>{item}</label>
                    </div>
                ))}
            </div>

            {/* Storage */}
            <div className='mb-6'>
                <label className='block text-orange-600 font-medium mb-2'>Storage</label>
                {storage.map((item) => (
                    <div key={item} className='flex items-center mb-1'>
                        <input
                            type='radio'
                            name='storage'
                            id={`storage-${item}`}
                            value={item}
                            onChange={handleFilterChange}
                            checked={filter.storage === item}
                            className='mr-2 h-4 w-4 text-yellow-500'
                        />
                        <label htmlFor={`storage-${item}`} className='text-gray-200'>{item}</label>
                    </div>
                ))}
            </div>

            {/* Price Range */}
            <div className='mb-8'>
                <label className='block text-orange-600 font-medium mb-2'>Price Range</label>
                <input
                    type='range'
                    name='maxPrice'
                    min={0}
                    max={100}
                    onChange={handlePriceChange}
                    value={priceRange[1]}
                    className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
                />
                <div className='flex justify-between text-gray-600 mt-2'>
                    <span className='text-red-400'>${priceRange[0]}</span>
                    <span className='text-red-400'>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebarLaptop;
