"use client"

import { BoardProps } from "@/app/access-board/page";
import { socket } from "@/lib/socketClient";
import { createNewBoard } from "@/utils/utils";
import { redirect } from "next/navigation";
import { FaArrowUp } from "react-icons/fa";

export default function CreateBoardForm(
  { boardName, setBoardName, boardPassword, setBoardPassword, boardId, setBoardId }: BoardProps,
) {
  const createNewBoardFunc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBoardId(await createNewBoard(boardName, boardPassword));

      setBoardName("");
      setBoardPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  if(boardId !== ""){
    socket.emit("join-room", { boardId })
    redirect(`/board/${boardId}`);
  }

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
        className="mt-2"
      />

      <div className="flex w-[85%] gap-3">
        <input
          type="text"
          placeholder="New Board Password"
          value={boardPassword}
          onChange={(e) => {
            setBoardPassword(e.target.value);
          }}
          className="mt-3 w-[80%]"
        />

        <button type="submit" className="mt-3 flex justify-center items-center">
          <FaArrowUp />
        </button>
      </div>
    </form>
  );
}