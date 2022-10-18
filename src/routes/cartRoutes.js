import { Router } from "express";
import CartController from "../controllers/cartController.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get("/", cartController.getAll);
cartRouter.post("/", cartController.createCart);
cartRouter.delete("/:id", cartController.deleteCart);
cartRouter.post("/:id", cartController.addProductToCart);
cartRouter.delete("/:id/:productId", cartController.deleteProduct);

export default cartRouter;
