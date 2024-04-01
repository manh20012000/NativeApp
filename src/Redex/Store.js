import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer/auth.slice.js";
import actionVideo from "./Reducer/handlerNaviVideo.js";
import { commentChildrentSlice } from "./Reducer/updateComentChildren.js";
import { commentParentVideo } from "./Reducer/CommentVideoParent.js";
// import socketSlice  from "./Reducer/SocketConnection.js";
import StatusUser from "./Reducer/StatusUser.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    CommentChildrent:commentChildrentSlice.reducer,
    commentParentVideo: commentParentVideo.reducer,
    // Socket:socketSlice ,
    Status:StatusUser
  },
});
