import { useDroppable } from '@dnd-kit/react';

interface Props {
  id: string;
  children?: React.ReactNode
}

export default function Doing({ id, children }: Props) {
  const {ref} = useDroppable({id})

  return (
    <div id="board-element">
      <h2>Doing</h2>

      <div className='p-2 flex flex-col gap-2' ref={ref} id="doing">
        {children}
      </div>
    </div>
  )
}