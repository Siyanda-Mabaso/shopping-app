import type { RootState } from "../Store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ListItem } from "./ListItemSlice";

export interface Lists {
name: string;
numberOfItems: number;
description :string;
id?:number;
userId?: string;
items:ListItem[]
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
    
    const listSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
      
        },
        extraReducers:(builder)=>{
            builder

            .addCase(fetchListsThunk.pending,(state)=>{
                state.isLoading= true
                state.error=null
            })

            .addCase(fetchListsThunk.fulfilled,(state, action)=>{
                state.isLoading=false
                state.lists=action.payload
                state.error= null
            })   
        
            .addCase(fetchListsThunk.rejected,(state,action)=>{
                state.isLoading=false
                state.error=action.payload as string
            })

            builder
            .addCase(addListThunk.fulfilled,(state,action)=>{
                state.lists.push(action.payload)
            })
        }
    })


 export const {  } = listSlice.actions;
 export default listSlice.reducer;