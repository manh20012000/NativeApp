import { createSlice } from "@reduxjs/toolkit";
const initialAuthstate = {
  value: 0,
};
export const Authslice = createSlice({
  name: "auth",
  initialState: initialAuthstate,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
      console.log("login state with reduxToolkit");
    },
    logout: (state, action) => {
      state.value = null;
    },
    UpdateAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, UpdateAuth } = Authslice.actions;

export default Authslice.reducer;
