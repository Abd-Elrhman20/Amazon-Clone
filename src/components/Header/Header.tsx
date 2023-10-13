"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiCaretDown } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'
import { SlLocationPin } from 'react-icons/sl'
import { useSelector, useDispatch } from 'react-redux'
import SearchProducts from '../Search/SearchProducts'


const Header = () => {
    const { productData, favoriteData, userInfo, allProducts } = useSelector((state: any) => state.next);
    let { isSignedIn, user }: any = useUser()
    const Router = useRouter()
    const [searchQuery, setSearchQuery] = useState<any>();
    const [searchedItems, setSearchedItems] = useState<any>([]);

    function filterItemsForSearch(InputValue: String) {
        setSearchQuery(InputValue.toLocaleLowerCase())
        const items: any = []
        allProducts.filter((item: any) => {
            if (item.title.toLocaleLowerCase().includes(searchQuery)) {
                items.push(item)
                setSearchedItems(items)
                // console.log(searchedItems);
            }
        })
    }
    // console.log(allProducts);

    return (
        <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
            <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
                {/* logo */}
                <Link
                    href={"/"}
                    className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
                >
                    <Image className="w-28 object-cover mt-1" src="/images/logo.png" alt="logo" width={112} height={100} />
                </Link>
                {/* delivery */}
                <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
                    <SlLocationPin />
                    <div className="text-xs">
                        <p>Deliver to</p>
                        <p className="text-white font-bold uppercase">USA</p>
                    </div>
                </div>
                {/* SearchBar */}
                <div className='flex-1 h-10 hidden md:inline-flex items-center justify-between relative'>
                    <input onChange={(e: any) => filterItemsForSearch(e.target.value)} value={searchQuery} type="text" placeholder='Search products' className='w-full h-full rounded-md px-2 placeholder:text-sm text-base border-[3px] text-black border-transparent outline-none focus-visible:border-amazon_yellow' />
                    <span className='w-12 h-full bg-amazon_yellow text-black text-2xl flex justify-center items-center absolute right-0 rounded-tr-md rounded-br-md'><HiOutlineSearch /></span>
                    {searchQuery ?
                        <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
                            {searchedItems?.map((item: any) => <SearchProducts item={item} setSearchQuery={setSearchQuery} key={item._id} />)}
                        </div>
                        : ""}
                </div>
                {/* SignIn */}
                <Link href={` ${isSignedIn ? "" : "/sign-in"}`}>
                    {isSignedIn ? <div className='text-xs text-gray-100 flex items-center justify-between p-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]'>
                        <UserButton afterSignOutUrl="/" />
                        <div className='flex justify-center items-center flex-col ml-2 '>
                            <p> {user?.firstName} </p>
                            <p className='flex items-center text-white font-bold'>{user?.emailAddresses.map((email: any) => email.emailAddress)}</p>
                        </div>
                    </div>
                        : <div className='text-xs text-gray-100 flex flex-col justify-center p-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]'>
                            <p> Hello, please sign-in </p>
                            <p className='flex items-center text-white font-bold'>Account & Lists <span> <BiCaretDown /> </span> </p>
                        </div>}
                </Link>
                {/* favorite */}
                <div className='text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative' onClick={() => { Router.push("/favorite") }}>
                    <p>Marked</p>
                    <p className='text-white font-bold'>& Favorite</p>
                    {favoriteData?.length > 0 ? <span className='absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex justify-center items-center tex-xs text-amazon_yellow'>{favoriteData.length}</span> : ""}
                </div>
                {/* Cart */}
                <Link href='/cart' className='px-2 flex items-center border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative'>
                    <Image className="w-auto object-cover h-8" src="/images/cartIcon.png" alt="cart-Image" width={40} height={40} />
                    <p className='text-xs text-white font-bold mt-3'>Cart</p>
                    <span className='text-amazon_yellow absolute text-sm top-2 left-[29px] font-semibold'>{productData ? productData.length : 0}</span>
                </Link>
            </div>
        </div>
    )
}

export default Header