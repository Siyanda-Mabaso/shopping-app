import type { RootState } from "../Store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ListItem } from "./ListItemSlice";

export interface Lists {
  name: string;
  numberOfItems: number;
  description: string;
  id?: string;
  userId?: string;
  createdAt: string;
  items: ListItem[];
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


// ADD SHOPPING LIST
export const addListThunk = createAsyncThunk(
  "lists/addLists",
  async (
    newList: Omit<Lists, "id">,
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const userId = state.login.user?.id;

      if (!userId) {
        return rejectWithValue("User not logged in");
      }

      const listWithUserId = {
        ...newList,
        userId: userId,
      };

      const response = await fetch(
        "http://localhost:3000/lists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listWithUserId),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add list");
      }

      const listData = await response.json();

      return listData as Lists;

    } catch (error) {
      return rejectWithValue("Failed to add list");
    }
  }
);


// FETCH SHOPPING LISTS
export const fetchListsThunk = createAsyncThunk(
  "lists/fetchLists",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.login.user?.id;

      if (!userId) {
        return rejectWithValue("User not logged in");
      }

      const response = await fetch(
        `http://localhost:3000/lists?userId=${userId}`
      );

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


// ADD ITEM TO SHOPPING LIST
export const addItemThunk = createAsyncThunk(
  "lists/addItem",
  async (
    {
      listId,
      item,
    }: {
      listId: string;
      item: ListItem;
    },
    { rejectWithValue }
  ) => {
    try {

      // Get the shopping list
      const getListResponse = await fetch(
        `http://localhost:3000/lists/${listId}`
      );

      if (!getListResponse.ok) {
        throw new Error("Shopping list not found");
      }

      const list = await getListResponse.json();

      // Add the new item to the existing items
      const updatedItems = [
        ...(list.items || []),
        item,
      ];

      // Update the number of items
      const updatedList = {
        ...list,
        items: updatedItems,
        numberOfItems: updatedItems.length,
      };

      // Save the updated list
      const response = await fetch(
        `http://localhost:3000/lists/${listId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedList),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      return updatedList as Lists;

    } catch (error) {
      return rejectWithValue("Failed to add item");
    }
  }
);


const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // FETCH LISTS
    builder
      .addCase(fetchListsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchListsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload;
        state.error = null;
      })

      .addCase(fetchListsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });


    // ADD LIST
    builder
      .addCase(addListThunk.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      });


    // ADD ITEM
    builder
      .addCase(addItemThunk.fulfilled, (state, action) => {

        const index = state.lists.findIndex(
          (list) => list.id === action.payload.id
        );

        if (index !== -1) {
          state.lists[index] = action.payload;
        }

      });

  },
});

export default listSlice.reducer;