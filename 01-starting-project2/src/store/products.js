/* eslint-disable no-self-assign */
import {createSlice} from '@reduxjs/toolkit';

const amos = [
    { title: 'Test Item', description:"This is a first product - amazing!", quantity: 3, total: 18, price: 6 },
    { title: 'Iphone', description:"This is a first product - amazing!", quantity: 3, total: 18, price: 5 },
    { title: 'Skuma', description:"This is a first product - amazing!", quantity: 3, total: 18, price: 3 },
    { title: 'Carbage', description:"This is a first product - amazing!", quantity: 3, total: 18, price: 10 }
]

const initialProductsState = {products:amos};

const productsSlice = createSlice({
    name:'products',
    initialState: initialProductsState,
    reducers:{
        getProducts(state){
            state.products = state.products;
        }
    }
})


export const getProductsAction = productsSlice.actions;

export default productsSlice.reducer;