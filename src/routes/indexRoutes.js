import { Router } from "express";
import productsRouter from "./productsRoutes.js";
import cartRouter from "./cartRoutes.js";

const router = Router();

router.use("/productos", productsRouter);
router.use("/carrito", cartRouter)

export default router;
