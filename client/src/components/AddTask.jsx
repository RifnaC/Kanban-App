/* eslint-disable react/prop-types */
import Axios from 'axios';
import { useState } from 'react';
const AddTask = ({ columnId, onTaskAdded }) => {

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const task = {
      ...newTask,
      columnId
    };

    try {
      const response = await Axios.post("https://kanban-app-beryl.vercel.app/api/task", task)
      const newTaskId = response.data._id;
      const newTaskWithId = { id: newTaskId, ...task };
      onTaskAdded(newTaskWithId);
      setIsFormVisible(false);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Error adding task', error)
    }
  };

  return (
  <>
    { isFormVisible && (
      <div className='bg-transparent border-2 mx-auto w-1/2 border-blue-200 flex justify-center items-center'>
        <form onSubmit={handleFormSubmit} className="space-y-2 m-5 px-5">
          <input 
           name='columnId'
           type="hidden"
            value="column-1"/>
          <input
            name='title'
            type="text"
            value={newTask.title}
            onChange={handleFormChange}
            placeholder="Title"
            className="p-2 border rounded w-full px-3"
            required
          />
          <textarea
            name='description'
            value={newTask.description}
            onChange={handleFormChange}
            placeholder="Description"
            className="p-2 border rounded w-full"
            required
          />
          <input
            name='dueDate'
            type="date"
            value={newTask.dueDate}
            onChange={handleFormChange}
            className="p-2 border rounded w-full "
            required
          />
          <button type="submit" className="bg-cyan-800 text-white p-2 rounded w-full">
            Save Task
          </button>
        </form>

      </div>
    ) }
  </>
  )
};

export default AddTask;
