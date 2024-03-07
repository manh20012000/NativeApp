import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer/auth.slice.js";
import actionVideo from "./Reducer/handlerNaviVideo.js";
import { commentChildrentSlice } from "./Reducer/updateComentChildren.js";
import { commentParentVideo } from "./Reducer/CommentVideoParent.js";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    CommentChildrent: commentChildrentSlice.reducer,
    commentParentVideo: commentParentVideo.reducer,
  },
});
