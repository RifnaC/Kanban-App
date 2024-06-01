/* eslint-disable react/prop-types */
import { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@heroicons/react/16/solid';

const Column = ({ column, tasks, addTask }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddTaskClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = (columnId, task) => {
    addTask(columnId, task);
    setIsFormVisible(false);
  };

  return (
    <div className="bg-gray-200 rounded pb-3 w-1/3">
      <div className='flex justify-between bg-green-200 p-1'>
        <h2 className="text-lg text-center mt-0  font-bold mb-3">{column.title}</h2>
        <button
          onClick={handleAddTaskClick}
          className="bg-blue-500 text-white rounded w-50 "
        >
          <PlusIcon />
        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col space-y-2 px-2"
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isFormVisible && (
        <AddTask
          columnId={column.id}
          addTask={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Column;
