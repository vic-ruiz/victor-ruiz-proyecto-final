import { Router } from "express";
import ProductsController from "../controllers/productsController.js";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.getProducts)
productsRouter.get('/categoria/:categoria', productsController.getProductsByCategory)
productsRouter.get('/:id', productsController.getProductById)
productsRouter.post('/', productsController.createProduct)
productsRouter.put('/:id', productsController.updateProduct)
productsRouter.delete('/:id', productsController.deleteProduct)

export default productsRouter