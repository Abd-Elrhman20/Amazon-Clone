import { resetCart } from '@/redux/Slices/NextSlices'
import React from 'react'
import { useDispatch } from 'react-redux'

const ResetCart = () => {
    const dispatch = useDispatch()
    
    return (
        <button className='w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300' onClick={()=>dispatch(resetCart())}>Reset cart</button>
    )
}

export default ResetCart