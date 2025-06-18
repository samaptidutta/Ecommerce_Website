import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebarSmartPhone from '../../Components/Products/FilterSidebarSmartPhone';
import ProductGridDetails from '../../Components/Products/ProductGridDetails';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../../redux/slice/productSlice';

const AllElectronics = () => {
  const { collection } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const queryParams = Object.fromEntries([...searchParams]);

  // Fetch products when collection or query parameters change
  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle filter changes from FilterSidebarSmartPhone
  const handleFilterChange = (newFilters) => {
    setSearchParams(newFilters, { replace: true });
    setIsSidebarOpen(false); // Close sidebar on mobile after applying filters
  };

  return (
    <div className="mt-[140px] flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border border-neutral-600 shadow-md p-2 flex justify-center items-center bg-stone-700"
      >
        <FaFilter className="mr-2 text-gray-300" />
        <span className="text-gray-300">Filters</span>
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed mt-[100px] lg:mt-[0px] inset-y-0 z-30 left-0 w-64 bg-neutral-800 overflow-y-auto transition-transform duration-300 lg:sticky lg:translate-x-0`}
      >
        <FilterSidebarSmartPhone onFilterChange={handleFilterChange} />
      </div>

      {/* Product grid */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-700 font-semibold">
          {collection ? `${collection} Collection` : 'All Collection'}
        </h2>

        {loading && <div className="text-center text-gray-500">Loading products...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-500">No products found.</div>
        )}
        <ProductGridDetails products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default AllElectronics;