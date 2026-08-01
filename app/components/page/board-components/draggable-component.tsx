import { useDraggable } from '@dnd-kit/react'

interface Props {
  id: string | number,
  task: {
    taskContent: string
    taskCreator: string
  }
}

export default function Draggable({id, task}: Props) {
  const {ref} = useDraggable({id});
  
  return (
    <div ref={ref} id='task'>
      {task.taskContent}
    </div>
  )
}
