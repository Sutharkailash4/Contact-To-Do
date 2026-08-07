import express from "express";
const authRoute = express();

import { registerController, loginController, getMeController, logoutController } from "../controllers/auth.controller.js";
import { identifyUser } from "../middleware/auth.middleware.js";

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.get("/getMe", identifyUser, getMeController);
authRoute.post("/delete", identifyUser, logoutController);

export default authRoute;