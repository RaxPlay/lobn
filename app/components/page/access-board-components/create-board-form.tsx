"use client";

import { BoardProps } from "./access-board-main-page";
import { socket } from "@/lib/socketClient";
import { createNewBoard, joinBoard } from "@/utils/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function CreateBoardForm({
  boardName,
  setBoardName,
  boardPassword,
  setBoardPassword,
  boardId,
  setBoardId,
  userName,
  userId,
}: BoardProps) {
  const createNewBoardFunc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBoardId(await createNewBoard(boardName, boardPassword, userName));
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    const redirectUser = async () => {
      if (boardId !== "") {
        socket.emit("join-room", { boardId, userName });
        await joinBoard(boardId, boardName, userName, userId);
        redirect(`/board/${boardId}`);
      }
    };
    redirectUser();
  }, [boardId]);

  return (
    <form onSubmit={createNewBoardFunc} className="flex flex-col items-center">
      <h1>Create Board</h1>

      <input
        type="text"
        placeholder="New Board Name"
        value={boardName}
        onChange={(e) => {
          setBoardName(e.target.value);
        }}
        className="mt-2 board-input"
      />
      <input
        type="text"
        placeholder="New Board Password"
        value={boardPassword}
        onChange={(e) => {
          setBoardPassword(e.target.value);
        }}
        className="mt-3 w-[80%] board-input"
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
