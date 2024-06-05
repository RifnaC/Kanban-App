/* eslint-disable react/prop-types */
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { useState } from 'react';

const Task = ({ task, index, onTaskUpdated, onTaskDeleted }) => {
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
    const taskWithColumn = { ...updatedTask, columnId: task.columnId };
    console.log(taskWithColumn)
    axios.post(`http://localhost:3000/api/task/${task.id}`, updatedTask)
      .then(response => {
        onTaskUpdated(taskWithColumn);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleDeleteClick = () => {
    axios.delete(`http://localhost:3000/api/task/${task.id}`)
      .then(response => {
        console.log(task)
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
              <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                Save
              </button>
            </form>
          ) : (
            <div>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className='text-sm'>{task.description}</p>
              <div>
                <p className="text-sm text-gray-500">{task.dueDate}</p>

                <button onClick={handleEditClick} className="bg-yellow-500 text-white p-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={handleDeleteClick} className="bg-red-500 text-white p-1 rounded">
                  Delete
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
