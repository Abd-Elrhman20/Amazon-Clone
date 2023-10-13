import Footer from '@/components/Footer/Footer'
import BottomHeader from '@/components/Header/BottomHeader'
import Header from '@/components/Header/Header'
import React, { ReactElement } from 'react'

const RootLayout = ({ children }: any) => {
    return (
        <>
            <Header />
            <BottomHeader />
            {children}
            <Footer />
        </>
    )
}

export default RootLayout