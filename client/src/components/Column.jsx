/* eslint-disable react/prop-types */
import { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks, addTask, sock }) => {
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
      <div className='flex justify-between bg-cyan-900 p-2'>
        <h2 className="text-lg text-center font-bold m-2">{column.title}</h2>
        <button
          onClick={handleAddTaskClick}
          className=" text-white font-bold "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
          </svg>

        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col space-y-2 p-2 pb-0"
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