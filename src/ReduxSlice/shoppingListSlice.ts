import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/lists";

/* =========================
   TYPES
========================= */

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
}

export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  notes: string;
  category: string;
  items: ShoppingItem[];
  createdAt: string;
}

export interface ShoppingListState {
  lists: ShoppingList[];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingListState = {
  lists: [],
  loading: false,
  error: null,
};

/* =========================
   FETCH LISTS
========================= */

export const fetchListsThunk = createAsyncThunk(
  "list/fetchAll",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}?userId=${userId}`
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch lists"
      );
    }
  }
);

/* =========================
   CREATE LIST
========================= */

export const createShoppingListThunk = createAsyncThunk(
  "list/create",
  async (
    listData: Omit<ShoppingList, "id">,
    thunkAPI
  ) => {
    try {
      const newList = {
        ...listData,
        id: Date.now().toString(),
      };

      const response = await axios.post(
        API_URL,
        newList
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to create list"
      );
    }
  }
);

/* =========================
   EDIT LIST
========================= */

export const editListThunk = createAsyncThunk(
  "list/edit",
  async (
    listData: ShoppingList,
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${listData.id}`,
        listData
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to update list"
      );
    }
  }
);

/* =========================
   DELETE LIST
========================= */

export const deleteListThunk = createAsyncThunk(
  "list/delete",
  async (
    listId: string,
    thunkAPI
  ) => {
    try {
      await axios.delete(
        `${API_URL}/${listId}`
      );

      return listId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to delete list"
      );
    }
  }
);

/* =========================
   ADD ITEM
========================= */

export const addItemThunk = createAsyncThunk(
  "list/addItem",
  async (
    data: {
      listId: string;
      name: string;
      quantity: number;
    },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as {
        shoppingLists: ShoppingListState;
      };

      const list =
        state.shoppingLists.lists.find(
          (list) =>
            list.id === data.listId
        );

      if (!list) {
        return thunkAPI.rejectWithValue(
          "List not found"
        );
      }

      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: data.name,
        quantity: data.quantity,
        completed: false,
      };

      const updatedList = {
        ...list,
        items: [
          ...list.items,
          newItem,
        ],
      };

      const response = await axios.put(
        `${API_URL}/${data.listId}`,
        updatedList
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to add item"
      );
    }
  }
);

/* =========================
   EDIT ITEM
========================= */

export const editItemThunk = createAsyncThunk(
  "list/editItem",
  async (
    data: {
      listId: string;
      item: ShoppingItem;
    },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as {
        shoppingLists: ShoppingListState;
      };

      const list =
        state.shoppingLists.lists.find(
          (list) =>
            list.id === data.listId
        );

      if (!list) {
        return thunkAPI.rejectWithValue(
          "List not found"
        );
      }

      const updatedItems =
        list.items.map((item) =>
          item.id === data.item.id
            ? data.item
            : item
        );

      const updatedList = {
        ...list,
        items: updatedItems,
      };

      const response = await axios.put(
        `${API_URL}/${data.listId}`,
        updatedList
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to edit item"
      );
    }
  }
);

/* =========================
   UPDATE ITEM
   Same thunk, different name
========================= */

export const updateItemThunk = editItemThunk;

/* =========================
   DELETE ITEM
========================= */

export const deleteItemThunk = createAsyncThunk(
  "list/deleteItem",
  async (
    data: {
      listId: string;
      itemId: string;
    },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as {
        shoppingLists: ShoppingListState;
      };

      const list =
        state.shoppingLists.lists.find(
          (list) =>
            list.id === data.listId
        );

      if (!list) {
        return thunkAPI.rejectWithValue(
          "List not found"
        );
      }

      const updatedList = {
        ...list,
        items: list.items.filter(
          (item) =>
            item.id !== data.itemId
        ),
      };

      const response = await axios.put(
        `${API_URL}/${data.listId}`,
        updatedList
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to delete item"
      );
    }
  }
);

/* =========================
   TOGGLE ITEM
========================= */

export const toggleItemThunk = createAsyncThunk(
  "list/toggleItem",
  async (
    data: {
      listId: string;
      itemId: string;
    },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as {
        shoppingLists: ShoppingListState;
      };

      const list =
        state.shoppingLists.lists.find(
          (list) =>
            list.id === data.listId
        );

      if (!list) {
        return thunkAPI.rejectWithValue(
          "List not found"
        );
      }

      const updatedItems =
        list.items.map((item) =>
          item.id === data.itemId
            ? {
                ...item,
                completed:
                  !item.completed,
              }
            : item
        );

      const updatedList = {
        ...list,
        items: updatedItems,
      };

      const response = await axios.put(
        `${API_URL}/${data.listId}`,
        updatedList
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to toggle item"
      );
    }
  }
);

/* =========================
   SLICE
========================= */

const shoppingListSlice = createSlice({
  name: "shoppingLists",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(
        fetchListsThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchListsThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.lists = action.payload;
        }
      )

      .addCase(
        fetchListsThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload as string;
        }
      )

      /* CREATE */
      .addCase(
        createShoppingListThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createShoppingListThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.lists.push(action.payload);
        }
      )

      .addCase(
        createShoppingListThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload as string;
        }
      )

      /* EDIT LIST */
      .addCase(
        editListThunk.fulfilled,
        (state, action) => {
          const index =
            state.lists.findIndex(
              (list) =>
                list.id === action.payload.id
            );

          if (index !== -1) {
            state.lists[index] =
              action.payload;
          }
        }
      )

      /* DELETE LIST */
      .addCase(
        deleteListThunk.fulfilled,
        (state, action) => {
          state.lists =
            state.lists.filter(
              (list) =>
                list.id !== action.payload
            );
        }
      );

    /* =====================
       REPLACE UPDATED LIST
    ===================== */

    const replaceList = (
      state: ShoppingListState,
      action: {
        payload: ShoppingList;
      }
    ) => {
      const index =
        state.lists.findIndex(
          (list) =>
            list.id === action.payload.id
        );

      if (index !== -1) {
        state.lists[index] =
          action.payload;
      }
    };

    builder
      .addCase(
        addItemThunk.fulfilled,
        replaceList
      )

      .addCase(
        editItemThunk.fulfilled,
        replaceList
      )

      .addCase(
        deleteItemThunk.fulfilled,
        replaceList
      )

      .addCase(
        toggleItemThunk.fulfilled,
        replaceList
      );
  },
});

export default shoppingListSlice.reducer;
