import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { SignInState } from "./SignUp";

const API_URL = "http://localhost:3000/users";

interface ProfileState {
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
};

// Update user
export const updateProfileThunk = createAsyncThunk(
  "profile/update",
  async (user: SignInState, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/${user.id}`,
        user
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to update profile"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Updating profile
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
