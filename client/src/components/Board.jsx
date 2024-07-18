/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddTask from './AddTask';

// const socket = socketIO.connect("http://localhost:3000")
const Board = () => {
  const navigate = useNavigate()
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [data, setData] = useState({ tasks: {}, columns: {}, columnOrder: [] });

  const handleAddTaskClick = () => {
    if (isFormVisible === false) {
      setIsFormVisible(true);
    } else {
      setIsFormVisible(false)
    }

  };

  const handleFormSubmit = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    axios.get('https://kanban-app-beryl.vercel.app/api/tasks/')
      .then(response => {
        const tasks = {};
        const columns = {
          'column-1': { id: 'column-1', title: 'To Do', taskIds: [] },
          'column-2': { id: 'column-2', title: 'In Progress', taskIds: [] },
          'column-3': { id: 'column-3', title: 'Done', taskIds: [] },
        };
        const columnOrder = ['column-1', 'column-2', 'column-3'];
        response.data.tasks.map(task => {
          tasks[task._id] = { id: task._id, title: task.title, description: task.description, dueDate: task.dueDate };
          columns[task.columnId].taskIds.push(task._id);
        });

        setData({ tasks, columns, columnOrder });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);

    const movedTask = data.tasks[draggableId];
    movedTask.columnId = destination.droppableId;
    axios.post(`https://kanban-app-beryl.vercel.app/api/task/${draggableId}`, movedTask)
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleTaskAdded = (task) => {
    const newTasks = { ...data.tasks, [task.id]: task };
    const column = data.columns[task.columnId];
    const newTaskIds = [...column.taskIds, task.id];
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
  };
  const handleLogout = () => {
    axios.get('https://kanban-app-beryl.vercel.app/auth/logout')
      .then(response => {
        if (response.status === 200) {
          navigate('/login')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
  const handleTaskUpdated = (updatedTask) => {
    const newTasks = { ...data.tasks, [updatedTask.id]: updatedTask };
    setData(prevState => ({ ...prevState, tasks: newTasks }));
  };
  const handleTaskDeleted = (taskId) => {
    const { [taskId]: deletedTask, ...newTasks } = data.tasks;
    const newColumns = { ...data.columns };
    Object.keys(newColumns).map(columnId => {
      newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(id => id !== taskId);
    });

    setData(prevState => ({
      ...prevState,
      tasks: newTasks,
      columns: newColumns,
    }));
  };
  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl m-3 px-6 text-white  font-bold text-center'>Kanban Board</h1>
        <div className='text-right  m-3 px-6 text-white font-semibold '>
          <button
            onClick={handleAddTaskClick}
            className=" text-white font-bold mx-4"
          >Add Task</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {isFormVisible && (
        <AddTask
          columnId="column-1"
          onTaskAdded={handleTaskAdded}
          addTask={handleFormSubmit}
          FormVisible={() => setIsFormVisible(isFormVisible)}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 p-4 mx-5">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted} />;
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
