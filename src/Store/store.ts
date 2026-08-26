import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../ReduxSlice/SignUp";
import loginReducer from "../ReduxSlice/LoginSlice";
import listReducer from "../ReduxSlice/ListSlice"
import itemReducer from "../ReduxSlice/ListItemSlice"

const store = configureStore({
reducer: {
signUp: signUpReducer,
login: loginReducer,
list: listReducer,
item: itemReducer
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;