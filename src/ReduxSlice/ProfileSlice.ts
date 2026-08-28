import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

import type { SignInState } from "./SignUp";
import { updateUser } from "./LoginSlice";

const API_URL =
  "http://localhost:3000/users";

interface ProfileState {
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
};

/* =========================
   UPDATE PROFILE
========================= */

export const updateProfileThunk =
  createAsyncThunk(
    "profile/update",

    async (
      user: SignInState,
      thunkAPI
    ) => {
      try {
        const response =
          await axios.put(
            `${API_URL}/${user.id}`,
            user
          );

        // Update login Redux state
        thunkAPI.dispatch(
          updateUser(response.data)
        );

        return response.data;

      } catch (err: any) {
        return thunkAPI.rejectWithValue(
          err.message ||
            "Failed to update profile"
        );
      }
    }
  );

/* =========================
   SLICE
========================= */

const profileSlice =
  createSlice({
    name: "profile",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
      builder

        .addCase(
          updateProfileThunk.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          updateProfileThunk.fulfilled,
          (state) => {
            state.loading = false;
          }
        )

        .addCase(
          updateProfileThunk.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload as string;
          }
        );
    },
  });

export default profileSlice.reducer;
