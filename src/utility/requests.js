import C from "./constants";

class Request {
  constructor(api, http = C.HTTP.GET, body = null) {
    this.api = api;
    this.http = http;
    this.body = body;
  }
  static getAllProducts() {
    return new Request(C.API.GetAllProducts, C.HTTP.GET);
  }
  static addProducts(body) {
    return new Request(C.API.AddProduct, C.HTTP.POST, body);
  }
  static editProducts(body, id) {
    return new Request(C.API.EditProduct + id, C.HTTP.PUT, body);
  }
}

export default Request;
