import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center gap-4'>
            <Image src="/images/logo.png" className='w-24' alt="logo" width={96} height={100} />
            <p className='text-sm -mt-4'>All rights reserved <a className='cursor-pointer hover:text-amazon_yellow duration-300' href="https://github.com/Abd-Elrhman20" target='_blank'>Abd-Elrhman</a></p>
        </div>
    )
}

export default Footer