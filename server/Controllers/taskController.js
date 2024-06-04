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


// UPDATE a task
export const updateTask =(req, res) => {
    Task.findById(req.params.id)
      .then(task => {
        task.title = req.body.title;
        task.description = req.body.description;
        task.dueDate = Date.parse(req.body.dueDate);
        task.columnId = req.body.columnId;
  
        task.save()
          .then(() => res.json('Task updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  };
  
  // DELETE a task
export const deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(() => res.json('Task deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  }