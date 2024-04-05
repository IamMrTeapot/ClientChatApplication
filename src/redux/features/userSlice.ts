import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: string | null;
  selectedChatName: string | null;
  selectedChatIdentity: string | null;
  selectedChatType: "users" | "groups" | null;
}

const initialState: UserState = {
  user: null,
  selectedChatName: null,
  selectedChatIdentity: null,
  selectedChatType: null,
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
      action: PayloadAction<{
        name: string;
        identity: string;
        isGroup: boolean;
      }>
    ) => {
      state.selectedChatName = action.payload.name;
      state.selectedChatIdentity = action.payload.identity;
      state.selectedChatType = action.payload.isGroup ? "groups" : "users";
    },
    deselectChat: (state) => {
      state.selectedChatName = null;
      state.selectedChatIdentity = null;
      state.selectedChatType = null;
    },
  },
});

export const { connection, disconnect, selectChat, deselectChat } =
  userSlice.actions;
export default userSlice.reducer;
