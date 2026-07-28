import React from 'react'
import { DisplayTasks } from './board-client-main-page'

interface Props {
  displayTasks: DisplayTasks[];
}

export default function Todo({ displayTasks }: Props) {


  return (
    <div id="board-element">
      <h2>Todo</h2>

      {displayTasks.map((task) => (
        <div key={task.taskId}>
          {task.taskContent}
        </div>
      ))}
    </div>
  )
}
