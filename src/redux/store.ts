import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import availableSlice from "./features/availableSlice";
import chatSlice from "./features/chatSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    availableSlice,
    chatSlice,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
