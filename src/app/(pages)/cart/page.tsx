"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from './CartProduct'
import ResetCart from './ResetCart'
import Link from 'next/link'
import CartPaymentSection from './CartPaymentSection'

const CartPage = () => {
    const { productData } = useSelector((state: any) => state.next)
    
    return (
        <div className={`max-w-screen-2xl mx-auto px-6 grid grid-cols-5 gap-10 py-4 ${productData.length >= 3 ? null : "h-[80vh]"} `}>
            {productData.length > 0 ? <> <div className='bg-white col-span-4 p-4 rounded-lg h-fit'>
                <div className='items-center justify-between flex border-b-[1px] border-b-gray-400 pb-1'>
                    <p className='text-2xl font-semibold text-amazon_blue'>Shopping Cart </p>
                    <p className='text-lg font-semibold text-amazon_blue'>Subtitle </p>
                </div>
                <div className='pt-2 flex flex-col gap-2 select-none'>
                    {productData.map((item: any) => <div key={item._id}>
                        <CartProduct item={item} />
                    </div>)}
                    <ResetCart  />
                </div>
            </div> 
            <div className='bg-white h-64 col-span-1 p-4 rounded-lg flex items-center justify-center'><CartPaymentSection /></div>
            </> : <div className="bg-white col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg h-auto">
                <h1 className="text-2xl font-medium">Your Cart is empty!</h1>
                <Link href="/">
                    <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black">Go to shopping</button>
                </Link>
            </div>}
        </div>
    )
}

export default CartPage