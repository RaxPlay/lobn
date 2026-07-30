"use client";

import { BoardProps } from "./access-board-main-page";
import { socket } from "@/lib/socketClient";
import { getBoardId, joinBoard } from "@/utils/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

interface BoardInfo {
  boardId: string;
}

export default function JoinBoardForm({
  boardName,
  setBoardName,
  boardPassword,
  setBoardPassword,
  userName,
  userId,
}: BoardProps) {
  const [boardInfo, setBoardInfo] = useState<BoardInfo[]>([]);

  const joinBoardFunc = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setBoardInfo(await getBoardId(boardName, boardPassword)); // Checking if board exists by fetching it.
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const redirectUser = async () => {
      if (boardInfo.length !== 0) {
        let boardId = boardInfo[0].boardId;
        socket.emit("join-room", { board_id: boardId, userName });
        await joinBoard(boardId, boardName, userName, userId);
        redirect(`/board/${boardId}`);
      }
    };
    redirectUser();
  }, [boardInfo]);

  return (
    <form onSubmit={joinBoardFunc} className="flex flex-col items-center">
      <h1>Join Board</h1>

      <input
        type="text"
        placeholder="Board Name"
        value={boardName}
        onChange={(e) => {
          setBoardName(e.target.value);
        }}
        className="mt-2 board-input"
      />

      <input
        type="text"
        placeholder="Board Password"
        value={boardPassword}
        onChange={(e) => {
          setBoardPassword(e.target.value);
        }}
        className="mt-3 board-input"
      />

      <button
        type="submit"
        className="mt-3 flex justify-center items-center submit-btn"
      >
        <FaArrowUp />
      </button>
    </form>
  );
}
