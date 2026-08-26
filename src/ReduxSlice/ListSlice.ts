import type { RootState } from "../Store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface Lists{
name: string;
numberOfItems: number;
id?:number;
userId?: string;
}

interface ListState {
  lists: Lists[];
  isLoading: boolean;
  error: string | null;
}
const initialState: ListState = {
  lists: [],
  isLoading: false,
  error: null,
};

export const addListThunk = createAsyncThunk(
    "lists/addLists",
    async (newList: Omit<Lists,"id">,{getState, rejectWithValue})=>{
        try {
            const state = getState() as RootState;
            const userId = state.login.user?.id;
            
            if (!userId) {
                return rejectWithValue("User not logged in");
            }
            const listWithUserId = { ...newList, userId: userId,};
            const response = await fetch("http://localhost:3000/lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(listWithUserId),
            });

            if (!response.ok) {
                throw new Error("Failed to add list");
            }

            const listData = await response.json();
            return listData as Lists;
        }catch (error) {
            return rejectWithValue("Failed to add list");
        }
    }
      );

    export const fetchListsThunk = createAsyncThunk(
        "lists/fetchLists",
        async (_, { getState, rejectWithValue }) => {
            try {
                const state = getState() as RootState;
                const userId = state.login.user?.id;

                if (!userId) {
                    return rejectWithValue("User not logged in");
                }

                const response = await fetch("http://localhost:3000/lists", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch lists");
                }

                const listsData = await response.json();
                return listsData as Lists[];
            } catch (error) {
                return rejectWithValue("Failed to fetch lists");
            }
        }
    );