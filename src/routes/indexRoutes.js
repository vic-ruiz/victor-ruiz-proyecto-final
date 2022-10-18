import { Router } from "express";
import productsRouter from "./productsRoutes.js";
import cartRouter from "./cartRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();

router.use("/productos", productsRouter);
router.use("/carrito", cartRouter)
router.use("/", userRouter)

export default router;
