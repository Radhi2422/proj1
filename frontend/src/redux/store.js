import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./problemSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
    reducer: {
        problem: problemReducer,
        auth: authReducer,
        theme: themeReducer,
    },
});

// to be added in redux:
// logged-in user: done
// theme: done
// shopping-cart
// product-list-->to be reconsidered
// selected product
// loading state
// error messages
