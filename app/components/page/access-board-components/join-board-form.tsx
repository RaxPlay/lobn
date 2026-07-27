"use client";

import { BoardProps } from "@/app/access-board/page";
import { socket } from "@/lib/socketClient";
import { getBoardId } from "@/utils/utils";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

interface BoardInfo {
  boardId: string;
}

export default function JoinBoardForm({
  boardName,
  setBoardName,
  boardPassword,
  setBoardPassword,
}: BoardProps) {
  const [boardInfo, setBoardInfo] = useState<BoardInfo[]>([]);

  const joinBoard = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setBoardInfo(await getBoardId(boardName, boardPassword)); //Checking if board exists by fetching it.

      setBoardName("");
      setBoardPassword("");
    } catch (error) {
      
    }
  };

  if(boardInfo.length !== 0){
    let boardId = boardInfo[0].boardId
    socket.emit("join-room", boardId )
    redirect(`/board/${boardId}`);
  }

  return (
    <form onSubmit={joinBoard} className="flex flex-col items-center">
      <h1>Join Board</h1>

      <input
        type="text"
        placeholder="Board Name"
        value={boardName}
        onChange={(e) => {
          setBoardName(e.target.value);
        }}
        className="mt-2"
      />

      
        <input
          type="text"
          placeholder="Board Password"
          value={boardPassword}
          onChange={(e) => {
            setBoardPassword(e.target.value);
          }}
          className="mt-3"
        />

        <button type="submit" className="mt-3 flex justify-center items-center submit-button">
          <FaArrowUp />
        </button>
    </form>
  );
}
