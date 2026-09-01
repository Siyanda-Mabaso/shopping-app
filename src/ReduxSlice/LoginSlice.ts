import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";
import type { SignInState } from "./SignUp";

export interface LoginState {
  user: SignInState | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const savedUser = localStorage.getItem("user");

const initialState: LoginState = {
  user: savedUser
    ? JSON.parse(savedUser)
    : null,

  isLoggedIn: !!savedUser,

  isLoading: false,

  error: null,
};

/* =========================
   LOGIN
========================= */

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (
    credentials: Pick<
      SignInState,
      "email" | "password"
    >,
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users",
        {
          params: {
            email: credentials.email,
            password: credentials.password,
          },
        }
      );

      if (response.data.length === 0) {
        return thunkAPI.rejectWithValue(
          "Invalid email or password"
        );
      }

      return response.data[0];

    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Login failed"
      );
    }
  }
);

/* =========================
   SLICE
========================= */

const loginSlice = createSlice({
  name: "login",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;

      // Remove user when logging out
      localStorage.removeItem('user');
    },

    // Update user in Redux
    updateUser: (
      state,
      action
    ) => {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },
  },

  extraReducers: (builder) => {
    builder

      /* LOGIN START */
      .addCase(
        loginThunk.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      /* LOGIN SUCCESS */
      .addCase(
        loginThunk.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.user = action.payload;

          state.isLoggedIn = true;

          // Save user so refresh doesn't log them out
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload)
          );
        }
      )

      /* LOGIN FAILED */
      .addCase(
        loginThunk.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            action.payload as string;
        }
      );
  },
});

export const {
  logout,
  updateUser,
} = loginSlice.actions;

export default loginSlice.reducer;
