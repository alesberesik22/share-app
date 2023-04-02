import { createSlice } from "@reduxjs/toolkit";

interface INavbar {
  navbar: string;
}

const initialValues: INavbar = {
  navbar: "home",
};

export const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState: initialValues,
  reducers: {
    changeNavbar: (state, action) => {
      state.navbar = action.payload;
    },
  },
});

export const { changeNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
