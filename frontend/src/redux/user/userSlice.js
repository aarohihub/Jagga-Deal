import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      console.log("Sign in reducer called");
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    signInFailure: (state) => {
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSucess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    SignOutUserStart: (state) => {
      state.loading = true;
    },
    SignOutUserSucess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  logout,
  signInStart,
  signInFailure,
  signInSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailure,
  SignOutUserStart,
  SignOutUserSucess,
  S,
} = userSlice.actions;
export default userSlice.reducer;
