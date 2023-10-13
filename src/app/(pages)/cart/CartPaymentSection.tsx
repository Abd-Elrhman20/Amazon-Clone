"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { SiMediamarkt } from "react-icons/si";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'

const CartPaymentSection = () => {
    const { productData } = useSelector((state: any) => state.next)
    const [totalAmount, setTotalAmount] = useState<any>()
    let { user, isSignedIn } = useUser()
    const Router = useRouter()

    useEffect(() => {
        let total = 0
        productData.map((item: any) => {
            total += item.price * item.quantity
            return
        })

        setTotalAmount(total.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    }, [productData])


    // Stripe checkout ///////////////////////////

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
                <span className='bg-green-600 rounded-full p-1 h-6 w-6 text-sm flex items-center justify-center mt-1'> <SiMediamarkt /> </span>
                <p className='text-sm'>Your order qualifies for FREE Shipping by Choosing this option at
                    checkout. See details....</p>
            </div>
            <p className='flex items-center justify-start between px-2 font-semibold'>Total : <span className='font-bold text-xl'>
                {totalAmount}
            </span></p>
            <div className="flex flex-col items-center">
                {isSignedIn ? <button onClick={() => { Router.push("/payment") }} className={`w-full h-10 text-sm font-semibold  bg-opacity-90 text-white rounded-lg bg-green-600 hover:bg-green-700 `}>Buy</button> : <button disabled className={`w-full h-10 text-sm font-semibold  bg-opacity-90 text-white rounded-lg cursor-not-allowed bg-amazon_blue `}>Buy</button>}
                {/* <button  className={`w-full h-10 text-sm font-semibold  bg-opacity-90 text-white rounded-lg ${isSignedIn ? "bg-green-600 hover:bg-green-700 active:" : "cursor-not-allowed bg-amazon_blue"} `}>Buy</button> */}
                {isSignedIn ? null : <p className={`text-xs mt-2 text-red-500 font-semibold animate-bounce  ${isSignedIn ? "hidden" : "block"} `}>Please login to continue</p>}
            </div>
        </div>
    )
}

export default CartPaymentSection