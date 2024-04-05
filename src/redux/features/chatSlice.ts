import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../components/Message";

export interface ChatState {
  users: Record<string, { nickname: string; messages: IMessage[] }>;
  groups: Record<string, IMessage[]>;
}

const initialState: ChatState = {
  users: {},
  groups: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateGroupChat: (
      state,
      action: PayloadAction<{
        identity: string;
        message: IMessage | null;
      }>
    ) => {
      if (state.groups[action.payload.identity]) {
        if (action.payload.message === null) return;
        state.groups[action.payload.identity].push(action.payload.message);
      } else {
        if (action.payload.message === null) {
          state.groups[action.payload.identity] = [];
          return;
        }
        state.groups[action.payload.identity] = [action.payload.message];
      }
    },

    //TODO: Add updatePrivateChat reducer

    /*REMINDER: updateGroupChatName should be from backend,
     *          I believe we don't have this feature */

    updatePrivateChatName: (
      state,
      action: PayloadAction<{ identity: string; nickname: string }>
    ) => {
      state.users[action.payload.identity].nickname = action.payload.nickname;
    },
  },
});

export const { updateGroupChat, updatePrivateChatName } = chatSlice.actions;
export default chatSlice.reducer;
