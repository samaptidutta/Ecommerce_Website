import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';


const cartItems = [
    {
        productId: "1",
        name: "Samsung Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage)",
        price: 6249,
        quantity: 1,
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/feature/others/in-feature-galaxy-m05-4-gb-memory-543538896?$FB_TYPE_A_MO_PNG$",
        brand: "Samsung"
    },
    {
        productId: "2",
        name: "Noise Smart Watch",
        price: 2999,
        quantity: 2,
        image: "https://images.pexels.com/photos/4672162/pexels-photo-4672162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        brand: "Noise"
    }
];


const Chekout = () => {
    const navigate = useNavigate()
    const [checkoutId,setCheckoutId] = useState(null)

    const handleCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(1234)
    }

        const handlePaymentSuccess = (details) => {
            console.log("payment  successfull",details);
            navigate("/order-confirmation")
            
        }

    const [shippingAddress, setShippingAddress] = useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        state:"",
        postalCode:"",
        country:"",
        phone:""
    })
    return (
        <div className='mt-[140px] grid grid-cols-1 lg:grid-cols-2 gap-8 mx-w-7xl mx-auto py-10 px-6 tracking-tighter'>

            {/* left section */}
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
                <form onSubmit={handleCheckout}>
                    <h3 className='text-lg mb-4'>Contact Details</h3>
                    <div className='mb-4 '>
                        <label htmlFor="" className='block text-gray-700'>Email</label>
                        <input type="email"
                        value="user@example.com"
                        className='w-full p-2 border rounded'
                        disabled
                        />
                    </div>
                    <h3 className='text-lg mb-4'>Delivery</h3>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor="" className='block text-gray-700'>First Name</label>
                            <input type="text" 
                            value={shippingAddress.firstName}
                            onChange={(e)=>setShippingAddress({...shippingAddress,firstName:e.target.value})}
                            className='w-full p-2 border rounded'
                            required
                            />
                        </div>


                        <div>
                            <label htmlFor="" className='block text-gray-700'>Last Name</label>
                            <input type="text" 
                            value={shippingAddress.lastName}
                            onChange={(e)=>setShippingAddress({...shippingAddress,lastName:e.target.value})}
                            className='w-full p-2 border rounded'
                            required
                            />
                        </div>
                    </div>


                    <div className='mb-4 '>
                        <label className='block text-gray-700'>
                                Address
                        </label>
                        <input type="text" 
                        value={shippingAddress.address}
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, address: e.target.value })
                        }
                        className='w-full p-2 border rounded'
                        required
                        />
                    </div>

                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor="" className='block text-gray-700'>City</label>
                            <input type="text" 
                            value={shippingAddress.city}
                            onChange={(e)=>setShippingAddress({...shippingAddress,city:e.target.value})}
                            className='w-full p-2 border rounded'
                            required
                            />
                        </div>


                        <div>
                            <label htmlFor="" className='block text-gray-700'>Postal Code</label>
                            <input type="text" 
                            value={shippingAddress.postalCode}
                            onChange={(e)=>setShippingAddress({...shippingAddress,postalCode:e.target.value})}
                            className='w-full p-2 border rounded'
                            required
                            />
                        </div>
                    </div>

                    <div className='mb-4 '>
                        <label className='block text-gray-700'>
                                Country
                        </label>
                        <input type="text" 
                        value={shippingAddress.country}
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, country: e.target.value })
                        }
                        className='w-full p-2 border rounded'
                        required
                        />
                    </div>

                    <div className='mb-4 '>
                        <label className='block text-gray-700'>
                                Phone Number
                        </label>
                        <input type="text" 
                        value={shippingAddress.phone}
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, phone: e.target.value })
                        }
                        className='w-full p-2 border rounded'
                        required
                        />
                    </div>

                    <div  className='mt-6'>

                        {!checkoutId ? (
                            <button className='w-full bg-black text-white py-3 rounded'>Continue to payment</button>
                        ):
                        (
                            <div>
                                <h3 className='text-lg mb-4'>Pay With Paypal</h3>

                                {/* paypal component */}
                                {/* <PaypalButton type="submit" amount={100} onSuccess={handlePaymentSuccess} onError={(err)=>alert("Payment Failed. Try again")}/> */}
                                <PaypalButton
                                type="submit"
                                amount={cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                                currency="USD"
                                onSuccess={handlePaymentSuccess}
                                onError={(err) => alert("Payment Failed. Try again")}
                                />
                            </div>
                        )
                        }

                    </div>
                </form>
            </div>

            {/* right section */}

            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-xl font-semibold mb-6 border-b pb-2'>Order Summary</h3>

                {/* Cart items */}
                    <div className='space-y-4'>
                        {cartItems.map((item) => (
                        <div
                            key={item.productId}
                            className='flex gap-4 border rounded-lg p-4 bg-white shadow-sm'>
                            <img
                            src={item.image}
                            alt={item.name}
                            className='w-20 h-20 object-cover rounded-md'
                            />
                        <div className='flex-1'>
                        <h4 className='text-md font-medium'>{item.name}</h4>
                        <p className='text-sm text-gray-500'>Brand: {item.brand}</p>
                        <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                        </div>
                        <div className='text-right font-semibold text-gray-800'>
                        ${item.price * item.quantity}
                        </div>
                    </div>
                    ))}
                </div>

                {/* Total */}
                <div className='border-t mt-6 pt-4 text-right'>
                        <p className='text-lg font-semibold'>
                        Total:{' '}
                        ₹
                        {cartItems.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                        )}
                        </p>
                </div>
                
            </div>

            
        </div>
    )
}

export default Chekout
