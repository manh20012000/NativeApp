import { createSlice } from '@reduxjs/toolkit';
const initialAuthState = {
    datacommentParentVideo: [],
    index: 0,
    soluongcomment:0,
  };
  
  export const commentParentVideo = createSlice({
    name: 'commentParentVideo',
    initialState: initialAuthState,
    reducers: {
    getCommentParentViddeo: (state, action) => {
        state.datacommentParentVideo = action.payload;
      },
      updateCommentParentViddeo:  (state, action) => {
        // console.log('New data:', action.payload);
        state.datacommentParentVideo = [...state.datacommentParentVideo, ...action.payload];
      
      },
      addCommentParentVideo: (state, action) => {
          state.datacommentParentVideo = action.payload;
        //   console.log(state.datacommentParentVideo)
      },
    },
  });
  
  export const { getCommentParentViddeo, updateCommentParentViddeo,addCommentParentVideo } = commentParentVideo.actions;
  export default commentParentVideo.reducer;