import React from 'react'

const checkoutData = {
    _id: "chk123456",
    createdAt: new Date().toISOString(),
    checkoutItems: [
        {
            productId: "1",
            name: "Samsung Galaxy M05",
            price: 6249,
            quantity: 1,
            image:"https://images.samsung.com/is/image/samsung/p6pim/in/feature/others/in-feature-galaxy-m05-4-gb-memory-543538896?$FB_TYPE_A_MO_PNG$"
        },
        {
            productId: "2",
            name: "Noise Smart Watch",
            price: 2999,
            quantity: 2,
            image:"https://images.samsung.com/is/image/samsung/p6pim/in/feature/others/in-feature-galaxy-m05-4-gb-memory-543538896?$FB_TYPE_A_MO_PNG$"
        }
    ],
    shippingAddress:{
        address:"123  electronic street",
        city:"Bangalore",
        state:"Karnataka",
        country:"India",
        
    }
}

const OrderConfirmation = () => {

    const calculateEstimateDelivery = ((createdAt) =>{
            const orderDate = new Date(createdAt)
            orderDate.setDate(orderDate.getDate() + 10); //Add 10 days to the order date
            return orderDate.toLocaleDateString();
    })
    return (
        <div className='mt-[140px] max-w-4xl mx-auto p-6 bg-white'>
        <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>Thank You for your order !</h1>

        {checkoutData && (
            <div className='p-6 rounded-lg border'>
                <div className='flex justify-between mb-20'>
                    {/*Order & id  */}
                    <div>
                        <h2 className='text-xl font-semibold '>
                            Order Id: {checkoutData.id}
                        </h2>
                        <p className='text-gray-500'>
                            Order date :{new Date(checkoutData.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    {/*Estimate Delivery */}
                    <div>
                        <p className='text-emerald-700 text-sm'>
                            Estimated Delivery : {calculateEstimateDelivery(checkoutData.createdAt)}
                        </p>
                    </div>
                </div>
                {/* Order items */}
                <div className='mb-20'>
                    {checkoutData.checkoutItems.map((items) =>(
                        <div key={items.productId} className='flex items-center mb-4'>
                            <img src={items.image} alt={items.name} className='w-16 h-16 object-cover rounded-mf mr-4'/>

                            <div>
                                <h4 className='text-md font-semibold'>{items.name}</h4>
                                {/* others properties */}
                                <div className='ml-auto text-right'>
                                    <p className='text-md'>{items.price}</p>
                                    <p className='text-sm text-gray-500'>QTY: {items.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Payment & delivery info */}
                <div className='grid grid-cols-2 gap-8'>
                    {/* payment Info */}
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                        <p className='text-gray-600'>Paypal</p>
                    </div>
                    {/* Delivery Info */}
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                        <p className='text-gray-600'>
                            {checkoutData.shippingAddress.address}
                        </p>
                        <p className='text-gray-600'>{checkoutData.shippingAddress.city}, {" "}, {checkoutData.shippingAddress.country}</p>
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default OrderConfirmation
