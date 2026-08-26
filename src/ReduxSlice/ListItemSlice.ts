import type { PayloadAction } from "@reduxjs/toolkit";
import {createSlice } from "@reduxjs/toolkit";

export interface ListItem {
  id: number;
  name: string;
  quantity: number;
  notes:string;
  catergory:string;
}

export interface ListItemState {
  listItems: ListItem | null
}
const initialState: ListItemState = {
    listItems: null, };

const listItemSlice = createSlice({
    name: "listItem",
    initialState,
    reducers: {
        setListItems: (state, action: PayloadAction<ListItem>) => {
            state.listItems = action.payload;
        }
    }
});

export const { setListItems } = listItemSlice.actions;
export default listItemSlice.reducer;