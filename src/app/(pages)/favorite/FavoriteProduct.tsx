import { addToCart, deleteFavorite } from "@/redux/Slices/NextSlices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";



const FavoriteProduct = ({ item }: any) => {
    const dispatch = useDispatch();
    return (
        <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row py-2 items-center gap-4 mb-2">
            <Link href={{
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
                    price:item.price,
                },
            }}>
                <Image src={item.image} alt="Product image" width={150} height={150} className="hover:drop-shadow-xl hover:scale-105" />
            </Link>
            <div className="flex items-center px-2 gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm text-gray-600">
                        Unit price:{" "}
                        <span className="font-semibold text-amazon_blue">
                            {(item.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                    </p>
                    <button
                        onClick={() => {
                            dispatch(
                                addToCart({
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
                                })
                            )
                        }}
                        className="w-44 h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow duration-300 hover:text-black mt-2"
                    >
                        add to cart
                    </button>
                </div>
                <div className="text-lg font-semibold text-amazon_blue">
                    {(item.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
            </div>
        </div >
    );
};

export default FavoriteProduct;
