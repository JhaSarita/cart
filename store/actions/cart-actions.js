import { uiActions } from "../slices/ui-slice";
import { cartActions } from "../slices/cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://redux-http-2f9b7-default-rtdb.firebaseio.com/cart.json');
            
            if(!response.ok) {
                throw new Error('Could not fetch data !!');
            }
            const responseData = await response.json();
            return responseData;
        };
        
        try {
            const cartData = await fetchData();
            //dispatch(cartActions.replaceCart(cartData));

            //if we delete the entire cart the empty item array should be there in firebase 
            // items should be there and not undefined 
            
            dispatch(cartActions.replaceCart({
                items : cartData.items || [],
                totalQuantity : cartData.totalQuantity
            }));

            dispatch(
                uiActions.showNotification({
                status : 'success',
                title : 'Success...',
                message : 'sent cart data successfully!'
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                status : 'error',
                title : 'Error...',
                message : 'sending cart data failed!'
            }));
        }
    }
}
export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.showNotification({
            status : 'pending',
            title : 'sending',
            message : 'Sending data to cart'
        }));

        const sendRequestToDatabase = async () => {
            const response = await fetch('https://redux-http-2f9b7-default-rtdb.firebaseio.com/cart.json' , {
                method : 'PUT',
                //body : JSON.stringify(cart)
                body : JSON.stringify({items : cart.items, totalQuantity : cart.totalQuantity})
            });

            if(!response.ok) {
                throw new Error('Something went wrong !!');
            }
        };

        try {
           await sendRequestToDatabase();
            dispatch(
                uiActions.showNotification({
                status : 'success',
                title : 'Success...',
                message : 'sent cart data successfully!'
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                status : 'error',
                title : 'Error...',
                message : 'sending cart data failed!'
            }));
        }
    }
}

