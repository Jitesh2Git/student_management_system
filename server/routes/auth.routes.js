import { Router } from "express";
import {
  signIn,
  signOut,
  signUp,
  signUpUserByAdmin,
  verifyToken,
} from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

const authRouter = Router();

authRouter.get("/verify", verifyToken);

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-up-user", authorize, isAdmin, signUpUserByAdmin);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;
