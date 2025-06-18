    import React, { useEffect, useState } from 'react'
    import { toast } from 'react-toastify'
    import ProductGridDetails from './ProductGridDetails'
    import { useParams } from 'react-router-dom'
    import { useDispatch, useSelector } from 'react-redux'
    import { fetchSimilarProducts } from '../../redux/slice/productSlice'
    import { addToCart } from '../../redux/slice/cartSlice'

    const ProductDetails = ({ productId }) => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.product)
    const { user, guestId } = useSelector((state) => state.auth)

    const [mainImg, setMainImg] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const productfetchId = productId || id

    useEffect(() => {
        if (productfetchId) {
        dispatch(fetchSimilarProducts({ id: productfetchId }))
        }
    }, [dispatch, productfetchId])

    const handleAddToCart = () => {
        setIsButtonDisabled(true)
        dispatch(
        addToCart({
            productId: productfetchId,
            guestId,
            userId: user?._id
        })
        )
        .then(() => {
            toast.success("Product added to cart", {
            duration: 1000
            })
        })
        .finally(() => {
            setIsButtonDisabled(false)
        })
    }

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
        setMainImg(selectedProduct.images[0].url)
        }
    }, [selectedProduct])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <section className='p-6'>
        {selectedProduct && (
            <div className='max-w-6xl mx-auto bg-stone-900 p-8 rounded-lg'>
            {/* best seller */}
            <div className='flex flex-col md:flex-row'>
                {/* left thumbnails */}
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                {selectedProduct.images.map((item, ind) => (
                    <img
                    key={ind}
                    src={item.url}
                    alt={item.altText || `Thumbnail ${ind}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImg === item.url ? "border-red-700" : "border-gray-200"}`}
                    onClick={() => setMainImg(item.url)}
                    />
                ))}
                </div>

                {/* Main image */}
                <div className='md:w-1/2'>
                <div className='mb-4'>
                    <img
                    src={mainImg || 'https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww'}
                    alt="main product"
                    className='w-full h-auto object-cover rounded-lg'
                    />
                </div>
                </div>

                {/* mobile thumbnail */}
                <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                {selectedProduct.images.map((item, ind) => (
                    <img
                    key={ind}
                    src={item.url}
                    alt={item.altText || `Thumbnail ${ind}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImg === item.url ? "border-red-700" : "border-gray-200"}`}
                    onClick={() => setMainImg(item.url)}
                    />
                ))}
                </div>

                {/* right section */}
                <div className='md:w-1/2 md:ml-15'>
                <h1 className='text-2xl md:text-3xl font-semibold mb-2 text-orange-500'>
                    {selectedProduct.name}
                </h1>

                <p className='text-lg text-gray-200 mb-1 line-through'>
                    {selectedProduct.originalPrice && `₹${selectedProduct.originalPrice}`}
                </p>

                <p className='text-xl text-orange-500 mb-2'>
                    ₹{selectedProduct.reducePrice}
                </p>

                <p className='mb-4 text-yellow-400'>
                    {selectedProduct.description}
                </p>

                <div className='mb-4'>
                    <p className='text-orange-600'>Brand : {selectedProduct.brand}</p>
                    <p className='text-orange-600'>Operating System : {selectedProduct.operating}</p>
                    <p className='text-orange-600'>Ram : {selectedProduct.ram}</p>
                    <p className='text-orange-600'>CPU : {selectedProduct.cpu}</p>
                    <p className='text-orange-600'>CPU Speed : {selectedProduct.speed}</p>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isButtonDisabled}
                    className={`bg-neutral-700 text-yellow-500 py-2 px-6 w-full mb-4 rounded-lg font-semibold cursor-pointer ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-orange-800"}`}
                >
                    {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                </button>
                </div>
            </div>
            </div>
        )}

        {/* you may like */}
        <div className='mt-20'>
            <h2 className='text-2xl text-center font-semibold mb-4 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
            You May Also Like
            </h2>
            {similarProducts?.length > 0 ? (
            <ProductGridDetails product={similarProducts} />
            ) : (
            <p className='text-center text-gray-400'>No similar products found.</p>
            )}
        </div>
        </section>
    )
    }

export default ProductDetails
