import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  socket: null, 
  isConnected: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState: initialAuthState,
  reducers: {
    connectSocket: (state, action) => {
      state.socket = action.payload.socket;
      state.isConnected = true;
      console.log("Socket connected:", action.payload.socket);
    },
    DisconnectSocket: (state, action) => {
      
      state.socket = null;
      state.isConnected = false;
      console.log('disconnect')
    },
  },
});
// Action creators are generated for each case reducer function
export const { connectSocket, DisconnectSocket } = socketSlice .actions;
export default socketSlice .reducer;
