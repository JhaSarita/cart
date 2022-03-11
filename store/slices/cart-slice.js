import { createSlice } from '@reduxjs/toolkit';

//import { uiActions } from './ui-slice';

const initialState = { 
    items : [],
    totalQuantity : 0,
    cartChanged : false
 };

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

        addItemsToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            console.log('existing item in add Items : ', existingItem);
            state.totalQuantity++;
            state.cartChanged = true;
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
            state.cartChanged = true;
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

// creating action creator 
// export const sendCartData = (cart) => {
//     return async(dispatch) => {
//         dispatch(uiActions.showNotification({
//             status : 'pending',
//             title : 'sending',
//             message : 'Sending data to cart'
//         }));

//         const sendRequestToDatabase = async () => {
//             const response = await fetch('https://redux-http-2f9b7-default-rtdb.firebaseio.com/cart.json' , {
//                 method : 'PUT',
//                 body : JSON.stringify(cart)
//             });

//             if(!response.ok) {
//                 throw new Error('Something went wrong !!');
//             }
//         };

//         try {
//            await sendRequestToDatabase();
//             dispatch(
//                 uiActions.showNotification({
//                 status : 'success',
//                 title : 'Success...',
//                 message : 'sent cart data successfully!'
//             }));
//         } catch (error) {
//             dispatch(
//                 uiActions.showNotification({
//                 status : 'error',
//                 title : 'Error...',
//                 message : 'sending cart data failed!'
//             }));
//         }
//     }
// }

export const cartActions = cartSlice.actions;

export default cartSlice;