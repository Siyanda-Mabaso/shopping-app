import {createSlice} from "@reduxjs/toolkit"

import type {PayloadAction} from "@reduxjs/toolkit"
import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import type{SignInState} from "./SignUp"

export interface LoginState {
 user: SignInState |null
 isLoggedIn:boolean;
  isLoading: boolean;
  error: string | null;

}

const initialState: LoginState = {
 user: null,
 isLoggedIn: false,
  isLoading: false,
  error: null,

};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: Pick<SignInState, "email" | "password">, thunkAPI) => {
    try {
      // 4. json-server requires query parameters via the 'params' object
      const response = await axios.get("http://localhost:3000/users", {
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      });

      // json-server returns an array for filter queries. 
      // If array is empty, the user typed the wrong email or password.
      if (response.data.length === 0) {
        return thunkAPI.rejectWithValue("Invalid email or password");
      }

      // Return the matched user object (first item in array)
      return response.data[0]; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state)=>{
        state.user = null,
        state.isLoggedIn =false 
        state.error = null
    }
  },
  extraReducers:(builder)=> {
    builder
    .addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginThunk.fulfilled, (state, action: PayloadAction<SignInState>) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;