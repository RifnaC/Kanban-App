import express from "express";
import { addTask, deleteTask, getAllTasks, updateTask } from "../Controllers/taskController.js";
const router = express.Router();

// Get all tasks
router.get("/tasks", getAllTasks);

// Add task
router.post("/task", addTask);

// Update task
router.post('/task/:id', updateTask);

// Delete task
router.delete('/task/:id', deleteTask);

export { router as taskRouter }