// Trong file reducer.js hoặc tương tự
import { createSlice } from "@reduxjs/toolkit";

const initialAuthstate = {
  value: [],
};

export const CommentChildrent = createSlice({
  name: "updateCommentChildrent",
  initialState: initialAuthstate,
  reducers: {
    getDataCommentChildrent: (state, action) => {
      state.value = action.payload;
    },
    updateDataCommentChildrent: (state, action) => {
      state.value = action.payload;
      console.log("Updated state:", state.value);
    },
  },
});

export const { getDataCommentChildrent, updateDataCommentChildrent } =
  CommentChildrent.actions;
export default CommentChildrent.reducer;
