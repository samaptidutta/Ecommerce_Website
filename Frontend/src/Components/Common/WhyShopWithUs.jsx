import React from 'react'

const WhyShopWithUs = () => {
    return (
        <section className=" rounded-lg bg-gray-900 text-white py-14 px-6  mb-4">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-400 mb-6">Why Shop With <span className="text-yellow-500">DIGIMART</span>?</h2>
            <p className="text-lg mb-10 text-gray-300">
            At DIGIMART, we believe in delivering quality electronics at affordable prices. Whether you're looking for the latest smartphones, smartwatches, headphones, or gadgets – we’ve got it all.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="bg-stone-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-orange-300 mb-2">✅ 100% Genuine Products</h3>
                <p className="text-gray-400 text-sm">We sell only trusted and branded electronic items.</p>
            </div>
            <div className="bg-stone-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-orange-300 mb-2">🚚 Fast Delivery</h3>
                <p className="text-gray-400 text-sm">Get your orders delivered quickly and safely at your doorstep.</p>
            </div>
            <div className="bg-stone-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-orange-300 mb-2">🔄 Easy Returns</h3>
                <p className="text-gray-400 text-sm">Not satisfied? No worries! Easy return & refund policy.</p>
            </div>
            <div className="bg-stone-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-orange-300 mb-2">💸 Best Prices</h3>
                <p className="text-gray-400 text-sm">We offer competitive pricing across all categories.</p>
            </div>
            </div>
        </div>
        </section>
    )
    }

    export default WhyShopWithUs
