/* eslint-disable react/prop-types */
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks, }) => {
  return (
    <div className="bg-gray-200 rounded pb-3 w-1/3">
      <div className='flex justify-between bg-cyan-900 p-2'>
        <h2 className="text-lg text-center font-bold m-2">{column.title}</h2>
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
    </div>
  );
};

export default Column;