import { createSlice } from '@reduxjs/toolkit'
const initialAuthstate= {
    isVideoPlaying: true,
  }
  export const actionVideo = createSlice({
    name: 'auth',
    initialState: {
      isVideoPlaying: true,
    },
    reducers: {
      setVideoPlaying: (state, action) => {
        state.isVideoPlaying = action.payload;
      },

    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setVideoPlaying} = actionVideo.actions
  
  export default actionVideo.reducer