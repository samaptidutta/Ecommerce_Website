import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebarSmartwatch from '../../Components/Products/FilterSidebarSmartwatch ';
import ProductGridDetails from '../../Components/Products/ProductGridDetails';

const SmartWatch = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        brand: '',
        os: '',
        features: '',
        minPrice: 0,
        maxPrice: 500,
    });
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // toggle function for sidebar menu
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        // close sidebar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        // add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);
        // clean event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const fetchProducts = [
                {
                    _id: 1,
                    name: "Apple Watch Series 10",
                    price: 399,
                    images: [{ url: "https://picsum.photos/500/500?random=30", altText: "Apple Watch Series 10" }],
                    brand: "Apple",
                    os: "WatchOS",
                    features: "Heart Rate",
                },
                {
                    _id: 2,
                    name: "Samsung Galaxy Watch 7",
                    price: 299,
                    images: [{ url: "https://picsum.photos/500/500?random=31", altText: "Samsung Galaxy Watch 7" }],
                    brand: "Samsung",
                    os: "Wear OS",
                    features: "GPS",
                },
                {
                    _id: 3,
                    name: "Garmin Venu 3",
                    price: 449,
                    images: [{ url: "https://picsum.photos/500/500?random=32", altText: "Garmin Venu 3" }],
                    brand: "Garmin",
                    os: "Garmin OS",
                    features: "Waterproof",
                },
                {
                    _id: 4,
                    name: "Fitbit Versa 4",
                    price: 199,
                    images: [{ url: "https://picsum.photos/500/500?random=33", altText: "Fitbit Versa 4" }],
                    brand: "Fitbit",
                    os: "Fitbit OS",
                    features: "Heart Rate",
                },
                {
                    _id: 5,
                    name: "Huawei Watch GT 4",
                    price: 249,
                    images: [{ url: "https://picsum.photos/500/500?random=34", altText: "Huawei Watch GT 4" }],
                    brand: "Huawei",
                    os: "Wear OS",
                    features: "Cellular",
                },
                {
                    _id: 6,
                    name: "Apple Watch SE",
                    price: 279,
                    images: [{ url: "https://picsum.photos/500/500?random=35", altText: "Apple Watch SE" }],
                    brand: "Apple",
                    os: "WatchOS",
                    features: "GPS",
                },
                {
                    _id: 7,
                    name: "Samsung Galaxy Watch 6",
                    price: 249,
                    images: [{ url: "https://picsum.photos/500/500?random=36", altText: "Samsung Galaxy Watch 6" }],
                    brand: "Samsung",
                    os: "Wear OS",
                    features: "Waterproof",
                },
                {
                    _id: 8,
                    name: "Garmin Forerunner 265",
                    price: 349,
                    images: [{ url: "https://picsum.photos/500/500?random=37", altText: "Garmin Forerunner 265" }],
                    brand: "Garmin",
                    os: "Garmin OS",
                    features: "Heart Rate",
                },
                {
                    _id: 9,
                    name: "Fitbit Charge 6",
                    price: 159,
                    images: [{ url: "https://picsum.photos/500/500?random=38", altText: "Fitbit Charge 6" }],
                    brand: "Fitbit",
                    os: "Fitbit OS",
                    features: "GPS",
                },
            ];
            setProducts(fetchProducts);
            setFilteredProducts(fetchProducts); // Initialize filtered products
        }, 1000);
    }, []);

    useEffect(() => {
        const filtered = products.filter((item) => {
            return (
                (!filters.brand || item.brand === filters.brand) &&
                (!filters.os || item.os === filters.os) &&
                (!filters.features || item.features === filters.features) &&
                item.price >= filters.minPrice &&
                item.price <= filters.maxPrice
            );
        });
        setFilteredProducts(filtered);
    }, [products, filters]);

    return (
        <div className='mt-[140px] flex flex-col lg:flex-row'>
            {/* mobile filter button */}
            <button
                onClick={toggleSidebar}
                className='lg:hidden border border-neutral-600 shadow-md p-2 flex justify-center items-center bg-stone-700'
            >
                <FaFilter className='mr-2 text-gray-300' />
            </button>

            {/* filter sidebar */}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed mt-[100px] lg:mt-[0px] inset-y-0 z-30 left-0 w-64 bg-neutral-800 overflow-y-auto transition-transform duration-300 lg:sticky lg:translate-x-0`}
            >
                <FilterSidebarSmartwatch onFilterChange={setFilters} />
            </div>

            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-700 font-semibold'>
                    All Smartwatch Collection
                </h2>

                {/* product grid */}
                <ProductGridDetails product={filteredProducts} />
            </div>
        </div>
    );
};

export default SmartWatch;