import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: '2023-08-16',
});


export async function POST(request: any) {
    const data: any = await request.json();
    console.log(data);
    const amount = data.totalAmount
    // console.log(amount);
    // const products = data.products; // products is an array of objects


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: 'USD',
        });
        return NextResponse.json(paymentIntent.client_secret, { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 400 });
    }
}