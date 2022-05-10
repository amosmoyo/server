import {createSlice} from '@reduxjs/toolkit';

const initilaCartProducts = {cartProducts:[], showCart:true};

const cartSlice = createSlice({
    name:'cart',
    initialState:initilaCartProducts,
    reducers: {
      addProduct(state, action) {
        const prod = state.cartProducts.find((x) => {
          if(x.title === action.payload.title) {
           return x.quantity += 1;
          }
        });

        const data = {...prod};
        
        if(data.title) {
          state.cartProducts.map((x) => {
            return x
          });
        } else {
          state.cartProducts.push(action.payload)
        }
      },
      removeProduct(state, action) {
        state.cartProducts.filter((x) => x.title === action.payload);
      },
      toggleCart(state) {
        state.showCart = !state.showCart;
      },
      increment(state, action){
        state.cartProducts.map((x) => {
          if(x.title === action.payload) {
            x.quantity++
          }
          return x
        });
      },
      decrement(state, action) {
        state.cartProducts.map((x) => {
          if(x.title === action.payload) {
            x.quantity -= 1;
          }
          return x
        });
      }
    }
})

export const cartSliceActions = cartSlice.actions;

export default cartSlice.reducer;