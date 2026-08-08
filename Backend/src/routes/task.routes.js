import express from "express";
const taskRoute = express();

import { createTaskController, getAllTaskController, deleteTaskController } from "../controllers/task.controller.js";
import { identifyUser } from "../middleware/auth.middleware.js";

taskRoute.post("/createTask", identifyUser, createTaskController);
taskRoute.get("/getAllTask", identifyUser, getAllTaskController);
taskRoute.delete("/deleteTask/:taskId", identifyUser, deleteTaskController);

export default taskRoute;