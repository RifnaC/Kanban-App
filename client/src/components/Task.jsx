/* eslint-disable react/prop-types */
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { useState } from 'react';

const Task = ({ task, columnId, index, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const taskWithColumn = { ...updatedTask, columnId: columnId };
    axios.post(`http://localhost:3000/api/task/${task.id}`, taskWithColumn)
      .then(() => {
        onTaskUpdated(taskWithColumn);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleDeleteClick = () => {
    axios.delete(`http://localhost:3000/api/task/${task.id}`)
      .then(() => {
        onTaskDeleted(task.id);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-2 rounded flex justify-between shadow mb-2"
        >
          {isEditing ? (
            <form onSubmit={handleFormSubmit} className="space-y-2">
              <input
                name='columnId'
                type="hidden"
                value="column-1" />
              <input
                type="text"
                name="title"
                value={updatedTask.title}
                onChange={handleFormChange}
                placeholder="Title"
                className="p-2 border rounded w-full"
                required
              />
              <textarea
                name="description"
                value={updatedTask.description}
                onChange={handleFormChange}
                placeholder="Description"
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="date"
                name="dueDate"
                value={updatedTask.dueDate}
                onChange={handleFormChange}
                className="p-2 border rounded w-full"
                required
              />
              <button type="submit" className="bg-gradient-to-r from-cyan-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white p-2 rounded w-full">
                Save
              </button>
            </form>
          ) : (
            <div className='flex justify-around w-full'>
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className='text-sm'>{task.description}</p>
                <p className="text-sm text-gray-500">{task.dueDate.split("T")[0]}</p>
              </div>
              <div className='flex my-auto item-center'>
                <button onClick={handleEditClick} className="bg-cyan-900 text-white p-1 rounded mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>

                </button>
                <button onClick={handleDeleteClick} className="bg-cyan-900 text-white p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                  </svg>

                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
