import Image from 'next/image'
import React from 'react'
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, increaseQuantity, decreaseQuantity } from '@/redux/Slices/NextSlices';
import Link from 'next/link'


const CartProduct = ({ item }: any) => {
    // console.log(item.id);

    const dispatch = useDispatch()
    return (
        <div className='bg-gray-100 rounded-lg flex items-center gap-5 p-3'>
            <Link className='flex items-center justify-center' href={{
                pathname: `/${item.id}`,
                query: {
                    id: item.id,
                    title: item.title,
                    brand: item.brand,
                    category: item.category,
                    description: item.description,
                    image: item.image,
                    isNew: item.isNew,
                    oldPrice: item.oldPrice,
                    price: item.price,
                },
            }}>
                <Image src={item.image} alt='product_image' width={130} height={130} objectFit='cover' className='hover:drop-shadow-xl hover:scale-105' />
            </Link>
            <div className='flex items-center px-2 gap-4'>
                <div className='flex  flex-col gap-1 '>
                    <p className='text-lg font-semibold text-amazon_blue'>{item.title}</p>
                    <p className='text-gray-600 text-sm'>{item.description}</p>
                    <p className='text-sm text-gray-600 '>Unit Price : <span className='font-semibold text-amazon_blue'>{(item.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
                    <div className='flex items-center gap-6 mb-2'>
                        <div className='flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300'>
                            <span className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300" onClick={() => dispatch(decreaseQuantity({
                                id: item.id,
                                brand: item.brand,
                                category: item.category,
                                description: item.description,
                                image: item.image,
                                isNew: item.isNew,
                                oldPrice: item.oldPrice,
                                price: item.price,
                                title: item.title,
                                quantity: 1,
                            }))}> <LuMinus />  </span>
                            <span> {item.quantity}  </span>
                            <span className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300" onClick={() => dispatch(increaseQuantity({
                                id: item.id,
                                brand: item.brand,
                                category: item.category,
                                description: item.description,
                                image: item.image,
                                isNew: item.isNew,
                                oldPrice: item.oldPrice,
                                price: item.price,
                                title: item.title,
                                quantity: 1,
                            }))}> <LuPlus />  </span>
                        </div>
                        <div className='flex items-center justify-center font-medium text-gray-400 text-sm hover:text-red-600 cursor-pointer duration-300' onClick={() => dispatch(deleteProduct({
                            id: item.id,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
                            title: item.title,
                            quantity: item.quantity,
                        }))}>
                            <IoMdClose className='mr-[1px] text-2xl' /> <p>Remove</p>
                        </div>
                    </div>
                </div>
                <div className='text-lg font-semibold text-amazon_blue'>
                    {(item.price * item.quantity).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
            </div>
        </div>
    )
}

export default CartProduct