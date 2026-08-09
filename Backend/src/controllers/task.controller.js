import taskModel from "../models/task.model.js";

const createTaskController = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address } = req.body;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !phoneNumber?.toString()?.trim() ||
      !address?.trim()
    ) {
      return res.status(400).json({
        message: "Enter all contact details",
      });
    }

    const { id } = req.user;

    const task = await taskModel.create({
      user: id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber,
      address: address.trim(),
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllTaskController = async (req, res) => {
  try {
    const { id } = req.user;

    const allTasks = await taskModel.find({ user: id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Tasks fetched successfully",
      allTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getTaskByIdController = async (req, res) => {
  try {
    const { id } = req.user;
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task id is required" });
    }

    const task = await taskModel.findOne({ _id: taskId, user: id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const { id } = req.user;
    const { taskId } = req.params;
    const { firstName, lastName, email, phoneNumber, address } = req.body;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !phoneNumber?.toString()?.trim() ||
      !address?.trim()
    ) {
      return res.status(400).json({ message: "Enter all contact details" });
    }

    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: taskId, user: id },
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber,
        address: address.trim(),
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.user;
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({
        message: "Task id is required",
      });
    }

    const deletedTask = await taskModel.findOneAndDelete({
      _id: taskId,
      user: id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      taskId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export {
  createTaskController,
  getAllTaskController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
};
