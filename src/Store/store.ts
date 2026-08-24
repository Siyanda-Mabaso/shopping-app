import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../ReduxSlice/SignUp";
import loginReducer from "../ReduxSlice/LoginSlice";

const store = configureStore({
reducer: {
signUp: signUpReducer,
login: loginReducer,
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;