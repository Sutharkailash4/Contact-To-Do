import express from "express";
const taskRoute = express.Router();

import { createTaskController, getAllTaskController, getTaskByIdController, updateTaskController, deleteTaskController } from "../controllers/task.controller.js";
import { identifyUser } from "../middleware/auth.middleware.js";
import { taskValidation } from "../validator/taskValidator.js";

taskRoute.post("/createTask", identifyUser, taskValidation, createTaskController);
taskRoute.get("/getAllTasks", identifyUser, getAllTaskController);
taskRoute.get("/getTask/:taskId", identifyUser, getTaskByIdController);
taskRoute.put("/updateTask/:taskId", identifyUser, taskValidation, updateTaskController);
taskRoute.delete("/deleteTask/:taskId", identifyUser, deleteTaskController);

export default taskRoute;