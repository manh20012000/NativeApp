import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  datacomment: [],
};
export const commentChildrentSlice = createSlice({
  name: 'commentChildrent',
  initialState: initialAuthState,
  reducers: {
    getDataCommentChildrent: (state, action) => {
      state.datacomment = action.payload;
    },
    updateDataCommentChildrent:  (state, action) => {
      // console.log('New data:', action.payload);
      state.datacomment = [...state.datacomment, ...action.payload];
    },
    addComment: (state, action) => {
      state.datacomment.push(action.payload);
    },
  },
});
export const { getDataCommentChildrent, updateDataCommentChildrent,addComment } = commentChildrentSlice.actions;
export default commentChildrentSlice.reducer;