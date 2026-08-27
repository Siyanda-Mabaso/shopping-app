// // src/ReduxSlice/ListSlice.ts
// import type { RootState } from "../Store/store";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { ListItem } from "./ListItemSlice";

// export interface Lists {
//   name: string;
//   numberOfItems: number;
//   description: string;
//   id?: string;
//   userId?: string;
//   createdAt: string;
//   items: ListItem[];
// }

// interface ListState {
//   lists: Lists[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: ListState = {
//   lists: [],
//   isLoading: false,
//   error: null,
// };

// // Thunk to add a completely new shopping list
// export const addListThunk = createAsyncThunk(
//   "lists/addLists",
//   async (newList: Omit<Lists, "id">, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState;
//       const userId = state.login.user?.id;

//       if (!userId) {
//         return rejectWithValue("User not logged in");
//       }
//       const listWithUserId = { ...newList, userId: userId };
//       const response = await fetch("http://localhost:3000/lists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(listWithUserId),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add list");
//       }

//       const listData = await response.json();
//       return listData as Lists;
//     } catch (error) {
//       return rejectWithValue("Failed to add list");
//     }
//   }
// );

// // Thunk to fetch all shopping lists from the server
// export const fetchListsThunk = createAsyncThunk(
//   "lists/fetchLists",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState;
//       const userId = state.login.user?.id;

//       if (!userId) {
//         return rejectWithValue("User not logged in");
//       }

//       const response = await fetch("http://localhost:3000/lists", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch lists");
//       }

//       const listsData = await response.json();
//       return listsData as Lists[];
//     } catch (error) {
//       return rejectWithValue("Failed to fetch lists");
//     }
//   }
// );

// /**
//  * NEW THUNK: Handles appending a single shopping item to an existing list array
//  * and syncs it straight to your backend server via a PUT/PATCH request.
//  */
// export const addItemThunk = createAsyncThunk(
//   "lists/addItem",
//   async (
//     payload: { listId: string; item: ListItem },
//     { getState, rejectWithValue }
//   ) => {
//     try {
//       const state = getState() as RootState;
//       const currentLists = (state.lists as ListState).lists;
      
//       // Find the specific list target
//       const targetList = currentLists.find((l) => l.id === payload.listId);
//       if (!targetList) return rejectWithValue("List not found");

//       // Build updated list with the new item added to the array
//       const updatedItems = [...targetList.items, payload.item];
//       const updatedList = { 
//         ...targetList, 
//         items: updatedItems,
//         numberOfItems: updatedItems.length 
//       };

//       // Send the update to your backend database server
//       const response = await fetch(`http://localhost:3000/lists/${payload.listId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedList),
//       });

//       if (!response.ok) throw new Error("Failed to add item to server");

//       const savedListData = await response.json();
//       return savedListData as Lists;
//     } catch (error) {
//       return rejectWithValue("Failed to add item to database");
//     }
//   }
// );

// const listSlice = createSlice({
//   name: "lists",
//   initialState,
//   reducers: {
//     // You can keep local reducers here if you decide to add client-only actions later
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Lists Handling
//       .addCase(fetchListsThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchListsThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.lists = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchListsThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Add List Handling
//       .addCase(addListThunk.fulfilled, (state, action) => {
//         state.lists.push(action.payload);
//       })

//       // Add Item Handling (Updates the specific list inside state array)
//       .addCase(addItemThunk.fulfilled, (state, action) => {
//         const index = state.lists.findIndex((l) => l.id === action.payload.id);
//         if (index !== -1) {
//           state.lists[index] = action.payload;
//         }
//       });
//   },
// });

// // Since addItem is an async backend request, we export the thunk instead
// export default listSlice.reducer;
// //