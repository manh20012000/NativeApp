import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import actionVideo from "./handlerNaviVideo.js";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    actionVideo,
  },
});
