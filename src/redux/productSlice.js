import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductsList: (_, action) => {
      return action.payload;
    },
    addToProductList: (state, action) => {
      return [...state, action.payload];
    },
    editProduct: (state, action) => {
      return state.map((obj) =>
        obj.id === action.payload.id ? action.payload : obj
      );
    },
  },
});

export const { setProductsList, addToProductList, editProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
