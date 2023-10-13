import React from "react";
import { useDispatch } from "react-redux";
import Link from 'next/link'

const SearchProducts = ({ item , key , setSearchQuery }: any) => {
    function handleSearchQuery() {
        setSearchQuery("")
    }
    return (
        <div className="hover:bg-amazon_light hover:opacity-80 bg-amazon_yellow rounded-xl p-2 m-1" key={key} onClick={handleSearchQuery}>
                <Link href={{
                    pathname: `/${item._id}`,
                    query: {
                        id: item._id,
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
                
                    <div className="flex items-center gap-4">
                        <img className="w-24" src={item.image} alt="productImage" />
                        <div>
                            <p className="text-xs -mb-1">
                                {item.brand}_{item.category}
                            </p>
                            <p className="text-lg font-medium">{item.title}</p>
                            <p className="text-xs">{item.description.substring(0, 100)}</p>
                            <p className="text-sm flex items-center gap-1">
                                price:{" "}
                                <span className="font-semibold">
                                    {(item.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-gray-600 line-through">
                                    {(item.oldPrice).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                            </p>
                        </div>
                        <div className="flex-1 text-right px-4">
                            <p className="text-base font-semibold animate-bounce text-amazon_blue">
                                Save {(item.oldPrice - item.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </p>
                        </div>
                    </div>
                </Link>
        </div>
    );
};

export default SearchProducts;
