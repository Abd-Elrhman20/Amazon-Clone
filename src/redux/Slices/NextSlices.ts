"use client"
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//     value: any,
// }

const initialState: any = {
    productData: [],
    favoriteData: [],
    allProducts: [],
    userInfo: null,
}

export const nextSlice = createSlice({
    name: 'next',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // check if the product is already in the cart if yes then increase the quantity if not then add the product to the cart
            const productIndex = state.productData.findIndex(
                (item: any) => item.id === action.payload.id
            )
            if (productIndex >= 0) {
                state.productData[productIndex].quantity += 1
            } else {
                state.productData = [...state.productData, action.payload]
            }

            // state.productData = [...state.productData, action.payload]
        },
        addToFavorite: (state, action) => {
            const productIndex = state.favoriteData.findIndex(
                (item: any) => item.id === action.payload.id
            )
            if (productIndex >= 0) {
                state.favoriteData.splice(productIndex, 1)
            } else {
                state.favoriteData = [...state.favoriteData, action.payload]
            }
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: any) => item.id === action.payload.id
            );
            if (existingProduct !== undefined) {
                existingProduct.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: any) => item.id === action.payload.id
            );
            if (existingProduct?.quantity === 1) {
                existingProduct.quantity = 1;
            } else {
                existingProduct!.quantity--;
            }
        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter(
                (item: any) => item.id !== action.payload
            );
            state.productData.splice(action.payload, 1)
        },
        resetCart: (state) => {
            state.productData = []
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        },
        deleteFavorite: (state, action) => {
            state.favoriteData = state.favoriteData.filter(
                (item: any) => item._id !== action.payload
            );
        },
        resetFavoriteData: (state) => {
            state.favoriteData = [];
        },
    },
})

export default nextSlice.reducer
export const { addToCart, addToFavorite, increaseQuantity, decreaseQuantity, deleteProduct, resetCart, setAllProducts, deleteFavorite , resetFavoriteData } = nextSlice.actions
