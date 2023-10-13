"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { resetCart } from '@/redux/Slices/NextSlices'
import { useDispatch } from 'react-redux'

const SuccessPage = () => {
    const dispatch = useDispatch()
    // http://localhost:3000/success?payment_intent=pi_3NzjqyH6vaxIr2k90JO3IgF6&payment_intent_client_secret=pi_3NzjqyH6vaxIr2k90JO3IgF6_secret_18ZANp1Ucx8TEO1WF9sRfq49T&redirect_status=succeeded
    // http://localhost:3000/success?payment_intent=pi_3Nzjz4H6vaxIr2k90tGOCan9&payment_intent_client_secret=pi_3Nzjz4H6vaxIr2k90tGOCan9_secret_jHI9skGNMHFrS0ikugPOlkIoY&redirect_status=succeeded
    const currentUrl = window.location.href
    
    useEffect(() => {
        if (currentUrl.includes('redirect_status=succeeded')) {
            dispatch(resetCart())
        }
    }, [])

    return (
        <div className='h-[71vh]'>
            <div className="flex flex-col gap-2 items-center justify-center py-20 ]">
                <h1 className="text-2xl text-hoverBg font-semibold">
                    Thank you for shopping in our store!
                </h1>
                <Link
                    className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300"
                    href={"/"}
                    onClick={() => dispatch(resetCart())}
                >
                    <p>Continue Shopping</p>
                </Link>
            </div>
        </div>
    )
}

export default SuccessPage