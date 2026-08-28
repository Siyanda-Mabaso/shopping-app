import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../ReduxSlice/SignUp";
import loginReducer from "../ReduxSlice/LoginSlice";
// import listReducer from "../ReduxSlice/ListSlice"
import shoppingListReducer from "../ReduxSlice/shoppingListSlice";


const store = configureStore({
reducer: {
signUp: signUpReducer,
login: loginReducer,
// list: listReducer,
    shoppingLists: shoppingListReducer,
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;