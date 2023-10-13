'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
// import { useEffect } from "react";
// import axios from "axios";
import { HiShoppingCart } from 'react-icons/hi'
import { FaHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, addToFavorite, setAllProducts } from '@/redux/Slices/NextSlices';
import Link from 'next/link'


import { QueryClient, QueryClientProvider, useQuery, } from 'react-query'
const queryClient = new QueryClient()

const Products = () => {
    const { productData, favoriteData, allProducts } = useSelector((state: any) => state.next)
    const dispatch = useDispatch()

    return (
        <QueryClientProvider client={queryClient}>
            <Example />
        </QueryClientProvider>
    )


    // ///////////////////////////////////////// React-Query /////////////////////////////////////////

    function Example() {
        const { isLoading, error, data, isFetched } = useQuery({
            queryKey: ['repoData'],
            queryFn: () =>
                fetch('https://fakestoreapiserver.reactbd.com/tech').then(
                    (res: any) => res.json(),
                ),
        })

        if (isLoading) return <div className='spinner w-full h-full flex flex-col justify-center items-center'>
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p className='text-2xl font-bold text-amazon_blue'>Loading...</p>
        </div>

        if (error) return 'An error has occurred: ' + error
        
        isFetched && dispatch(setAllProducts(data))

        return (
            <div className='w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
                {data?.map(({ _id, title, brand, category, description, image, isNew, oldPrice, price }: any) => <div className='w-full z-30 bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden' key={_id} >
                    <div className='w-full h-[260px] relative'>
                        <Link href={{
                            pathname: `/${_id}`,
                            query: {
                                id: _id,
                                title: title,
                                brand: brand,
                                category: category,
                                description: description,
                                image: image,
                                isNew: isNew,
                                oldPrice: oldPrice,
                                price: price,
                            },
                        }}>
                            <Image className='w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300' src={image} alt={title} width={300} height={300} />
                        </Link>
                        <div className='heart-cart w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 rounded-md bg-transparent flex flex-col translate-x-20 duration-300 transition-transform group-hover:translate-x-0'>
                            <span onClick={() => {
                                dispatch(addToCart({
                                    id: _id,
                                    title: title,
                                    brand: brand,
                                    category: category,
                                    description: description,
                                    image: image,
                                    isNew: isNew,
                                    oldPrice: oldPrice,
                                    price: price,
                                    quantity: 1,
                                }))
                            }} className='w-full h-full justify-center items-center flex border-b-[1px] border-b-gray-300 bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300 text-xl'> <HiShoppingCart /> </span>
                            <span onClick={() => {
                                dispatch(addToFavorite({
                                    id: _id,
                                    title: title,
                                    brand: brand,
                                    category: category,
                                    description: description,
                                    image: image,
                                    isNew: isNew,
                                    oldPrice: oldPrice,
                                    price: price,
                                }))
                            }} className={`w-full h-full justify-center ite ms-center flex border-b-[1px] border-b-gray-300 bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300 text-xl items-center ${favoriteData.some((item: any) => item.id === _id)} `}> <FaHeart /> </span>
                        </div>
                        {isNew && (
                            <p className="absolute top-0 right-0 text-amazon_blue font-medium text-xs animate-bounce">
                                save {(oldPrice - price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}.00
                            </p>
                        )}
                    </div>
                    <hr />
                    <div className='px-4 py-3 flex flex-col gap-1'>
                        <p className='text-xs text-gray-500'>{category}</p>
                        <p className='text-base font-medium'>{title}</p>
                        <p className='flex items-baseline gap-2'>
                            <span className='text-sm line-through text-gray-400'>{(oldPrice).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                            <span className='text-amazon_blue font-semibold'>{(price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </p>
                        <p className='text-xs text-gray-600 text-justify'>{(description).substring(0, 200)}</p>
                        <button onClick={() => {
                            dispatch(addToCart({
                                id: _id,
                                title: title,
                                brand: brand,
                                category: category,
                                description: description,
                                image: image,
                                isNew: isNew,
                                oldPrice: oldPrice,
                                price: price,
                                quantity: 1,
                            }))
                        }} className='h-10 w-full font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-3'>Add to cart</button>
                    </div>
                </div>)
                }
            </div >
        )
    }

}
export default Products