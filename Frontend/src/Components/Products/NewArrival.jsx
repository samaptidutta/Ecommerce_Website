import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrival = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]); // Fixed variable name
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/newArrival`
        );
        console.log('New Arrivals API Response:', response.data);
        setNewArrivals(response.data.data || response.data); // Handle different response structures
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        setError('Failed to load new arrivals.');
        setIsLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.pageX - scrollRef.current.offsetLeft;
    const walk = newX - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft > 0;
      const rightScroll = container.scrollWidth - container.clientWidth - container.scrollLeft > 0;
      setCanScrollLeft(leftScroll);
      setCanScrollRight(rightScroll);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto text-center mb-10 relative bg-stone-800'>
        <h2 className='text-3xl font-bold mb-4 text-red-600'>New Arrivals, Some Great Deals!</h2>
        <p className='text-lg text-orange-600 mb-8'>
          Discover the newest must-haves. Upgrade your setup with our freshest picks.
        </p>
        <div className='absolute right-0 bottom-[-40px] flex space-x-2'>
          <button
            className={`p-2 rounded border ${canScrollLeft ? 'bg-orange-700 text-gray-200' : 'bg-orange-900 text-gray-400'}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <FiChevronLeft className='text-2xl' />
          </button>
          <button
            className={`p-2 rounded border ${canScrollRight ? 'bg-orange-700 text-gray-200' : 'bg-orange-900 text-gray-400'}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <FiChevronRight className='text-2xl' />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className='container mx-auto text-center'>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className='container mx-auto text-center'>
          <p className='text-red-500'>{error}</p>
        </div>
      ) : newArrivals.length === 0 ? (
        <div className='container mx-auto text-center'>
          <p>No new arrivals available.</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className={`container mx-auto overflow-x-scroll flex space-x-6 relative custom-scrollbar scroll-smooth ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {newArrivals.map((item) => (
            <div key={item._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
              <img
                src={item.images?.[0]?.url || 'https://via.placeholder.com/300'}
                alt={item.images?.[0]?.altText || item.name}
                className='w-full h-[300px] object-cover rounded-lg'
                draggable="false"
              />
              <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-yellow-200 p-1 text-center rounded-b-lg font-semibold'>
                <Link to={`/product/${item._id}`} className='block'>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewArrival;