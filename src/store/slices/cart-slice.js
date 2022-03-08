import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    items : [],
    totalQuantity : 0
 };

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addItemsToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            console.log('existing item in add Items : ', existingItem);
            state.totalQuantity++;
            if(!existingItem) {
                state.items.push({
                    id : newItem.id,
                    name : newItem.title,
                    price : newItem.price,
                    quantity : 1,
                    totalPrice : newItem.price
                })
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },

        removeItemsToCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            console.log('state.items : ', state.items);
            console.log('existingItem in remove : ', existingItem);
            state.totalQuantity--;
            // filter out if the quantity of item to be removed is only 1
            if(existingItem.quantity === 1)  {
                state.items = state.items.filter(item => item.id !== id)
            }
            else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;