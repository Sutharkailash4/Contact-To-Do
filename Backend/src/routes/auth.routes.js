import express from "express";
const authRoute = express();

import { registerController, loginController, getMeController, logoutController } from "../controllers/auth.controller.js";
import { identifyUser } from "../middleware/auth.middleware.js";
import { registerValidation, loginValidation } from "../validator/validator.js";

authRoute.post("/register", registerValidation, registerController);
authRoute.post("/login", loginValidation, loginController);
authRoute.get("/getMe", identifyUser, getMeController);
authRoute.post("/logout", identifyUser, logoutController);

export default authRoute;