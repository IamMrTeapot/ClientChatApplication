import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: string | null;
}

const initialState: UserState = {
  user: null,
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
  },
});

export const { connection, disconnect } = userSlice.actions;
export default userSlice.reducer;
