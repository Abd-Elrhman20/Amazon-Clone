'use client'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import { useSelector } from 'react-redux'
import { useUser } from '@clerk/nextjs'

const PaymentPage = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any);
    const { productData } = useSelector((state: any) => state.next)
    const { user } = useUser()

    const options: any = {
        mode: 'payment',
        amount: 50,
        products: productData,
        currency: 'usd',
        email: user?.emailAddresses[0].emailAddress,
    };
    
    return (
        <div className='w-full bg-white mt-5"'>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

export default PaymentPage