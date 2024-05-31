/* eslint-disable react/prop-types */
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-2 rounded shadow mb-2"
        >
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">{task.dueDate}</p>
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
