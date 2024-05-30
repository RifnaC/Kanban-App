import { useState, useEffect } from 'react';
import Column from './Column';

const Board = () => {
  const initialData = {
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To Do',
        taskIds: ['task-1', 'task-2'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskIds: ['task-3'],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };
  const [data, setData] = useState(initialData)
  useEffect(()=> {
    setData(initialData)
  }, [])
  return (
    <>
      <h1 className='text-center text-2xl mb-7 font-bold'>Kanban Broad</h1>
      <div className="flex space-x-4 p-4">
        {
          data.columnOrder.map((colId) => {
            const column = data.columns[colId];
            const task = column.taskIds.map((taskId) => data.tasks[taskId]);
            return <Column key={column.id} column={column}  tasks={task}/>

          })
        }
      </div>
    </>
  );
};

export default Board;
