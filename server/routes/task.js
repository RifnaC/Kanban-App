import express from "express";
import { addTask, deleteTask, getAllTasks, updateTask } from "../Controllers/taskController.js";
const router = express.Router();

router.get("/tasks", getAllTasks);
router.post("/task", addTask);
router.post('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);
export { router as taskRouter }