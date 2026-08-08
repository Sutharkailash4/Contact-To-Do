import express from "express";
const taskRoute = express();

import { createTaskController, getAllTaskController, deleteTaskController } from "../controllers/task.controller.js";
import { identifyUser } from "../middleware/auth.middleware.js";
import { taskValidation } from "../validator/taskValidator.js";

taskRoute.post("/createTask", taskValidation, identifyUser, createTaskController);
taskRoute.get("/getAllTask", identifyUser, getAllTaskController);
taskRoute.delete("/deleteTask/:taskId", identifyUser, deleteTaskController);

export default taskRoute;