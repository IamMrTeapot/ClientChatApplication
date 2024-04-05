import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: string | null;
  selectedChatName: string | null;
  selectedChatIdentity: string | null;
}

const initialState: UserState = {
  user: null,
  selectedChatName: null,
  selectedChatIdentity: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connection: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    disconnect: (state) => {
      state.user = null;
    },
    selectChat: (
      state,
      action: PayloadAction<{ name: string; identity: string }>
    ) => {
      state.selectedChatName = action.payload.name;
      state.selectedChatIdentity = action.payload.identity;
    },
    deselectChat: (state) => {
      state.selectedChatName = null;
      state.selectedChatIdentity = null;
    },
  },
});

export const { connection, disconnect, selectChat, deselectChat } =
  userSlice.actions;
export default userSlice.reducer;
