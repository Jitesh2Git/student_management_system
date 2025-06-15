import express from "express";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import {
  deleteAdmin,
  deleteUserByAdmin,
  getAdmin,
  getAllUsers,
  updateAdmin,
  updateUserByAdmin,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.use(authorize, isAdmin);

adminRouter.get("/get-users", getAllUsers);

adminRouter.patch("/update-user/:id", updateUserByAdmin);

adminRouter.delete("/delete-user/:id", deleteUserByAdmin);

adminRouter.route("/:id").get(getAdmin).put(updateAdmin).delete(deleteAdmin);

export default adminRouter;
