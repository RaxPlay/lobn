"use client"

import { Boards } from "./home-client-main-component"

interface Props {
  displayBoards: Boards[];
  setDisplayBoards: React.Dispatch<React.SetStateAction<Boards[]>>
}

export default function DisplayBoards({displayBoards, setDisplayBoards}: Props) {  
  return (
    <div>
      {displayBoards.map((board) => (
        <div key={board.membershipId}>
          {board.partOfName}
        </div>
      ))}
    </div>
  )
}
