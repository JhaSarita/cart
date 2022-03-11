import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { sendCartData, fetchCartData } from './store/actions/cart-actions';
//import { uiActions } from './store/slices/ui-slice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.isCartVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);
    console.log('notification : ', notification);
    
    useEffect(() =>  {
        dispatch(fetchCartData());
    }, [dispatch])


    useEffect(() => {

        if(isInitial) {
            isInitial = false;
            return;
        }
        
        if(cart.cartChanged) {
            dispatch(sendCartData(cart));
        }
        
        

        // const sendCartData = async() =>  {
        //     dispatch(
        //         uiActions.showNotification({
        //         status : 'pending',
        //         title : 'Sending...',
        //         message : 'sending cart data !'
        //     }));

        //     const response = await fetch('https://redux-http-2f9b7-default-rtdb.firebaseio.com/cart.json' , {
        //         method : 'PUT',
        //         body : JSON.stringify(cart)
        //     });

        //     if(!response.ok) {
        //         throw new Error('Some error occured !');
        //     }

        //     //const responseData = await response.json();
        //     // data sent successfully 
        //     dispatch(
        //         uiActions.showNotification({
        //         status : 'success',
        //         title : 'Success...',
        //         message : 'sent cart data successfully!'
        //     }));
        // }
        
        
        // sendCartData().catch(error => {
        //     dispatch(
        //         uiActions.showNotification({
        //         status : 'error',
        //         title : 'Error...',
        //         message : 'sending cart data failed!'
        //     }));
        // })
    }, [cart, dispatch]);
    

  return (
    <Fragment>
        { notification && <Notification 
        status={notification.status} 
        title={notification.title} 
        message={notification.message}/> }
        <Layout>
        { showCart && <Cart /> }
        <Products />
        </Layout>
    </Fragment>
  );
};

export default App;
