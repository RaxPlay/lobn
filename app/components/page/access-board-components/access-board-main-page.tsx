"use client";

import { useState } from "react";
import JoinBoardForm from "./join-board-form";
import CreateBoardForm from "./create-board-form";

export interface BoardProps {
  boardName: string;
  setBoardName: React.Dispatch<React.SetStateAction<string>>;
  boardPassword: string;
  setBoardPassword: React.Dispatch<React.SetStateAction<string>>;
  boardId: string;
  setBoardId: React.Dispatch<React.SetStateAction<string>>;
}

export default function AccessBoardMainPage() {
  const [joinBoardName, setJoinBoardName] = useState<string>("");
  const [joinBoardPassword, setJoinBoardPassword] = useState<string>("");
  const [createBoardName, setCreateBoardName] = useState<string>("");
  const [createBoardPassword, setCreateBoardPassword] = useState<string>("");
  const [newBoardId, setNewBoardId] = useState<string>("");

  return (
    <div className="flex justify-center text-center">
      <div id="container" className="w-120 mt-40 pt-4 pb-8">
        <JoinBoardForm
          boardName={joinBoardName}
          setBoardName={setJoinBoardName}
          boardPassword={joinBoardPassword}
          setBoardPassword={setJoinBoardPassword}
          boardId={newBoardId}
          setBoardId={setNewBoardId}
        ></JoinBoardForm>

        <p className="mt-4">Or</p>

        <CreateBoardForm
          boardName={createBoardName}
          setBoardName={setCreateBoardName}
          boardPassword={createBoardPassword}
          setBoardPassword={setCreateBoardPassword}
          boardId={newBoardId}
          setBoardId={setNewBoardId}
        ></CreateBoardForm>
      </div>
    </div>
  );
}