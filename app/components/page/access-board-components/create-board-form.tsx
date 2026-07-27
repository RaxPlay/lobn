"use client"

import { BoardProps } from "@/app/access-board/page";
import { createNewBoard } from "@/utils/utils";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function CreateBoardForm(
  { boardName, setBoardName, boardPassword, setBoardPassword }: BoardProps,
) {
  const [newBoardId, setNewBoardId] = useState<string>("");

  const createNewBoardFunc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setNewBoardId(await createNewBoard(boardName, boardPassword));
    } catch (err) {
      console.error(err);
    }
  };

  if(newBoardId !== ""){
    redirect(`/board?id=${newBoardId}`);
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