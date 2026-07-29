import React from 'react'
import { DisplayTasks } from './board-client-main-page'
import { FaTrash } from 'react-icons/fa';

interface Props {
  displayTasks: DisplayTasks[];
}

export default function Todo({ displayTasks }: Props) {
  return (
    <div id="board-element">
      <h2>Todo</h2>

      <div className='p-2 flex flex-col gap-2'>
      {displayTasks.map((task, index) => (
        <div key={index} id='task'>
          {task.taskContent}
        </div>
      ))}

      </div>
    </div>
  )
}
