import express from "express";
const authRoute = express();

import { registerController, loginController, getMeController, logoutController } from "../controllers/auth.controller.js";

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.get("/getMe", getMeController);
authRoute.post("/delete", logoutController);

export default authRoute;