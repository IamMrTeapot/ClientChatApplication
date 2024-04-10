import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDropdownItem } from "../../components/DropdownItem";

export interface AvailableState {
  users: IDropdownItem[];
  groups: IDropdownItem[];
  privateChats : IDropdownItem[];
}

const initialState: AvailableState = {
  users: [],
  groups: [],
  privateChats : [],
};

export const availableSlice = createSlice({
  name: "availableList",
  initialState,
  reducers: {
    setAvailableList: (
      state,
      action: PayloadAction<{ users: IDropdownItem[]; groups: IDropdownItem[]; privateChats : IDropdownItem[]; }>
    ) => {
      state.users = action.payload.users;
      state.groups = action.payload.groups;
      state.privateChats = action.payload.privateChats;
    },
  },
});

export const { setAvailableList } = availableSlice.actions;
export default availableSlice.reducer;
