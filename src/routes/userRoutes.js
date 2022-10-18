import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/login", userController.getLogin);
userRouter.post("/login", userController.postlogin) 
userRouter.get("/errorLogin", userController.errorLogin);

userRouter.get("/register", userController.getRegister);
userRouter.post("/register", userController.postRegister);
userRouter.get("/errorRegister", userController.errorRegister);
userRouter.get('/mailRegister', userController.mailRegister);


userRouter.get("/logout", userController.logoutSession);


export default userRouter;
