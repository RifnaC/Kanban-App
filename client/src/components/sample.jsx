// // src/components/Column.js
// import React from 'react';
// import Task from './Task';
// import { Droppable } from 'react-beautiful-dnd';

// const Column = ({ column, tasks }) => {
//   return (
//     <div className="flex flex-col bg-gray-200 p-4 rounded w-1/3">
//       <h3 className="font-bold text-lg mb-4">{column.title}</h3>
//       <Droppable droppableId={column.id}>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             className="bg-white p-4 rounded shadow-md"
//           >
//             {tasks.map((task, index) => (
//               <Task key={task.id} task={task} index={index} />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// };

// export default Column;
