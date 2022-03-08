import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cart-slice";
import uiSlice from "./slices/ui-slice";

const store = configureStore({
    reducer : {
        cart : cartSlice.reducer,
        ui : uiSlice.reducer
    }
});

export default store;