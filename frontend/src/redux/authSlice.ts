import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}
const initialState = {
  isAuthenticated: false,
  accessToken: "",
  name: "",
  id: "",
  image: "",
};

export const authStoreSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.id = action.payload.id;
      state.image = action.payload.image;
    },
    clearAuth: (state) => {
      (state.accessToken = ""), (state.isAuthenticated = false);
      (state.name = ""), (state.id = ""), (state.image = "");
    },
  },
});

export const { clearAuth, setAuth } = authStoreSlice.actions;
export default authStoreSlice.reducer;
