/* eslint-disable react/prop-types */
import Task from './Task';

const Column = ({ column, tasks }) => {
  return (
    <div className="bg-gray-200 rounded p-3 w-1/3">
      <h2 className="text-lg text-center font-bold mb-3">{column.title}</h2>
      {tasks.map((task)=> <Task key={task.id} text={task.content} />)}
      
      <Task text="Sample Task 2" />
    </div>
  );
};

export default Column;
