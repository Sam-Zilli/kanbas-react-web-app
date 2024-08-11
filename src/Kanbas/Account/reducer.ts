import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log("Current user before update:", state.currentUser);
      console.log("Action received:", action);

      state.currentUser = action.payload;

      console.log("Current user after update:", state.currentUser);
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
