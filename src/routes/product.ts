import { Hono } from "hono";
import {
  getProductDetail,
  getProducts,
  insertProduct,
  removeProduct,
  updateProduct,
} from "controllers/productControllers";

const Product = new Hono();

Product.get("/", ...getProducts);
Product.get("/:id", ...getProductDetail);
Product.post("/", ...insertProduct);
Product.delete("/:id", ...removeProduct);
Product.put("/:id", ...updateProduct);

export default Product;
