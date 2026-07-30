"use client";

import { redirect } from "next/navigation";
import { Boards } from "./home-client-main-component";

interface Props {
  displayBoards: Boards[];
}

export default function DisplayBoards({
  displayBoards
}: Props) {
  return (
    <div id="boards-container">
      {displayBoards.map((board) => (
        <div key={board.membershipId} id="board" onClick={() => {redirect(`/board/${board.partOf}`)}}>
          <h2>{board.partOfName}</h2>
        </div>
      ))}
    </div>
  );
}
