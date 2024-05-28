import { useState } from "react"
import { DragDropContext } from 'react-beautiful-dnd';

const Board = () => {
    const [complete, setComplete] = useState([]);
    const [inProgress, setInProgress]= useState([]);
    const [inComplete, setInComplete] = useState([]);
  return (
    <DragDropContext>
        <h1>Kanban Broad</h1>
        <div>

        </div>
    </DragDropContext>
  )
}

export default Board