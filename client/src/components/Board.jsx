// src/components/Board.js
import { useState, useEffect } from 'react';
import Column from './Column';
import { initialData } from '../data/initialData';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socketIO  from "socket.io-client"

const socket = socketIO.connect("http://localhost:3000")
const Board = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setData(initialData);
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
  };

  const addTask = (columnId, task) => {
    const newTaskId = `task-${uuidv4()}`;
    const newTask = { id: newTaskId, ...task };

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const column = data.columns[columnId];
    const newTaskIds = [...column.taskIds, newTaskId];
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
    axios.get('http://localhost:3000/auth/logout')
      .then(response => {
        if (response.status === 200) {
          navigate('/login')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl m-3 px-6 text-white  font-bold text-center'>Kanban Board</h1>
        <div className='text-right  m-3 px-6 text-white font-semibold'><button onClick={handleLogout}>Logout</button></div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 p-4 mx-5">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} addTask={addTask} socket ={socket}/>;
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
