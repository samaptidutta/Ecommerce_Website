import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebarSmartWatch = ({ onFilterChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceRange, setPriceRange] = useState([0, 100000]); // Adjusted max for smartwatches in INR

    const [filters, setFilters] = useState({
        brand: '',
        rating: '',
        availability: '',
        discount: '',
        releaseYear: '',
        minPrice: 0,
        maxPrice: 100000,
    });

    const brands = ['boAt', 'Fire-Boltt', 'Noise', 'Amazfit', 'OnePlus'];
    const ratings = ['4', '3', '2'];
    const availabilities = ['In Stock', 'Pre-order'];
    const discounts = ['10', '20'];
    const releaseYears = ['2023 or newer', '2022', '2021 or older'];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
        brand: params.brand || '',
        rating: params.rating || '',
        availability: params.availability || '',
        discount: params.discount || '',
        releaseYear: params.releaseYear || '',
        minPrice: Number(params.minPrice) || 0,
        maxPrice: Number(params.maxPrice) || 100000,
        });
        setPriceRange([Number(params.minPrice) || 0, Number(params.maxPrice) || 100000]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        updateURLParams(newFilters);
        onFilterChange(newFilters); // Notify parent component
    };

    const handlePriceChange = (e) => {
        const newMaxPrice = Number(e.target.value);
        setPriceRange([filters.minPrice, newMaxPrice]);
        const newFilters = { ...filters, maxPrice: newMaxPrice };
        setFilters(newFilters);
        updateURLParams(newFilters);
        onFilterChange(newFilters); // Notify parent component
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
        if (value || value === 0) params.set(key, value);
        });
        setSearchParams(params, { replace: true });
    };

    return (
        <div className="p-4">
        <h3 className="text-xl font-medium text-orange-600 mb-4">Filter</h3>

        {/* Brand */}
        <div className="mb-6">
            <label className="block text-orange-600 font-medium mb-2">Brand</label>
            {brands.map((item) => (
            <div key={item} className="flex items-center mb-1">
                <input
                type="radio"
                name="brand"
                id={`brand-${item}`}
                value={item}
                onChange={handleFilterChange}
                checked={filters.brand === item}
                className="mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300"
                />
                <label htmlFor={`brand-${item}`} className="text-gray-200">{item}</label>
            </div>
            ))}
        </div>

        {/* Customer Rating */}
        <div className="mb-6">
            <label className="block text-orange-600 font-medium mb-2">Customer Rating</label>
            {ratings.map((item) => (
            <div key={item} className="flex items-center mb-1">
                <input
                type="radio"
                name="rating"
                id={`rating-${item}`}
                value={item}
                onChange={handleFilterChange}
                checked={filters.rating === item}
                className="mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300"
                />
                <label htmlFor={`rating-${item}`} className="text-gray-200">{item} Stars & Up</label>
            </div>
            ))}
        </div>

        {/* Availability */}
        <div className="mb-6">
            <label className="block text-orange-600 font-medium mb-2">Availability</label>
            {availabilities.map((item) => (
            <div key={item} className="flex items-center mb-1">
                <input
                type="radio"
                name="availability"
                id={`availability-${item}`}
                value={item}
                onChange={handleFilterChange}
                checked={filters.availability === item}
                className="mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300"
                />
                <label htmlFor={`availability-${item}`} className="text-gray-200">{item}</label>
            </div>
            ))}
        </div>

        {/* Discount */}
        <div className="mb-6">
            <label className="block text-orange-600 font-medium mb-2">Discount</label>
            {discounts.map((item) => (
            <div key={item} className="flex items-center mb-1">
                <input
                type="radio"
                name="discount"
                id={`discount-${item}`}
                value={item}
                onChange={handleFilterChange}
                checked={filters.discount === item}
                className="mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300"
                />
                <label htmlFor={`discount-${item}`} className="text-gray-200">{item}% Off or More</label>
            </div>
            ))}
        </div>

        {/* Release Year */}
        <div className="mb-6">
            <label className="block text-orange-600 font-medium mb-2">Release Year</label>
            {releaseYears.map((item) => (
            <div key={item} className="flex items-center mb-1">
                <input
                type="radio"
                name="releaseYear"
                id={`releaseYear-${item}`}
                value={item}
                onChange={handleFilterChange}
                checked={filters.releaseYear === item}
                className="mr-2 h-4 w-4 text-yellow-500 focus:ring-blue-400 border-gray-300"
                />
                <label htmlFor={`releaseYear-${item}`} className="text-gray-200">{item}</label>
            </div>
            ))}
        </div>

        {/* Price Range */}
        <div className="mb-8">
            <label className="block text-orange-600 font-medium mb-2">Price Range</label>
            <input
            type="range"
            name="maxPrice"
            min={0}
            max={100000}
            onChange={handlePriceChange}
            value={priceRange[1]}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 mt-2">
            <span className="text-red-400">₹{priceRange[0]}</span>
            <span className="text-red-400">₹{priceRange[1]}</span>
            </div>
        </div>
        </div>
    );
    };

export default FilterSidebarSmartWatch;