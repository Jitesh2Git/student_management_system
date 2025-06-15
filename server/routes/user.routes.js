import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.use(authorize);

userRouter.route("/:id").get(getUser).patch(updateUser);

export default userRouter;
