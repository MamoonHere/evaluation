import Network from "../utility/network";
import Request from "../utility/requests";
import { setProductsList, addToProductList, editProduct } from "./productSlice";

class ProductModel {
  static getAllProducts() {
    return async (dispatch) => {
      const response = await Network(Request.getAllProducts());
      dispatch(setProductsList(response.products));
    };
  }
  static addProducts(body) {
    return async (dispatch) => {
      const response = await Network(Request.addProducts(body));
      dispatch(addToProductList(response));
    };
  }
  static editProduct(body, id) {
    return async (dispatch) => {
      console.log(body, id);
      const response = await Network(Request.editProducts(body, id));
      dispatch(editProduct(response));
    };
  }
}

export default ProductModel;
