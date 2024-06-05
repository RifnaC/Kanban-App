import { Task } from "../models/Task.js";


export const addTask = async (req, res) => {
    const { columnId,title, description, dueDate } = req.body;
    try {
        const newTask = await Task.create({
            columnId: columnId, 
            title: title,
            description: description, 
            dueDate: new Date(dueDate),
            
        });
        return res.status(200).json({ message: "Task added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// update a task
export const updateTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const { title, description, dueDate, columnId } = req.body;
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      task.columnId = columnId;
      const updatedTask = await task.save();
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // DELETE a task
export const deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(500).json('Error: ' + err));
  }