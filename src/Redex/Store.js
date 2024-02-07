import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import actionVideo from "./handlerNaviVideo.js";
import { commentChildrentSlice } from "./updateComentChildren.js";
import { commentParentVideo } from "./CommentVideoParent.js";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    CommentChildrent: commentChildrentSlice.reducer,
    commentParentVideo:commentParentVideo.reducer
  },
});
