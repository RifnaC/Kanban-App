/* eslint-disable react/prop-types */
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks }) => {
  return (
    <div className="bg-gray-200 rounded p-3 w-1/3">
      <h2 className="text-lg font-bold mb-3">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col space-y-2"
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
