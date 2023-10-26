import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: { products: productReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
