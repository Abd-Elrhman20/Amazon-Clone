'use client'
import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@clerk/nextjs';
import { resetCart } from '@/redux/Slices/NextSlices';

const CheckoutForm = () => {
    const stripe: any = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = React.useState<any>(false);
    const [message, setMessage] = React.useState<any>(null);
    const [email, setEmail] = React.useState<any>('');
    const { productData } = useSelector((state: any) => state.next)
    const { user } = useUser()

    const [totalAmount, setTotalAmount] = useState<any>()
    const dispatch = useDispatch()

    useEffect(() => {
        let total = 0
        productData.map((item: any) => {
            total += item.price * item.quantity
            return
        })
        setTotalAmount(total.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    }, [])


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (elements == null) {
            return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            return;
        }

        setIsLoading(true);

        const res = await fetch('/api/create-intent', {
            method: 'POST',
            body: JSON.stringify({ totalAmount: totalAmount!}),
            // body: JSON.stringify({amount: 1000}),
        });
        const secretKey = await res.json();
        // console.log(totalAmount)

        const { error } = await stripe.confirmPayment({
            clientSecret: secretKey,
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/success",
            }
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions: any = {
        layout: "tabs",
    };
    return (
        <div className='w-2/4 m-auto p-5 h-[70.6vh] '>
            <form id="payment-form" onSubmit={handleSubmit}>
                <LinkAuthenticationElement
                    id="link-authentication-element"
                    onChange={(e: any) => setEmail(e.target.value)}
                />
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button style={{ background: "rgb(5, 112, 222)", borderRadius: "5px", color: "white" }} className='w-full h-full p-2 my-2' disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    )
};

export default CheckoutForm