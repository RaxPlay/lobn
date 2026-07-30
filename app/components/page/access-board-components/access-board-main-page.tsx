"use client";

import { useState } from "react";
import { FaHome } from "react-icons/fa";
import JoinBoardForm from "./join-board-form";
import CreateBoardForm from "./create-board-form";
import { redirect } from "next/navigation";

export interface BoardProps {
  boardName: string;
  setBoardName: React.Dispatch<React.SetStateAction<string>>;
  boardPassword: string;
  setBoardPassword: React.Dispatch<React.SetStateAction<string>>;
  boardId: string;
  setBoardId: React.Dispatch<React.SetStateAction<string>>;
  userName: string 
  userId: string 
}

export interface Props {
  userName: string 
  userId: string 
}

export default function AccessBoardMainPage({ userName, userId }: Props) {
  const [joinBoardName, setJoinBoardName] = useState<string>("");
  const [joinBoardPassword, setJoinBoardPassword] = useState<string>("");
  const [createBoardName, setCreateBoardName] = useState<string>("");
  const [createBoardPassword, setCreateBoardPassword] = useState<string>("");
  const [newBoardId, setNewBoardId] = useState<string>("");

  const goHome = () => {
    redirect(`/home/${userName}`);
  }

  return (
    <div className="flex justify-center text-center">
      <div id="container" className="w-120 mt-40 pt-4 pb-8">
        <header className="flex justify-end px-4">
          <button onClick={goHome}>
            <FaHome/>
          </button>
        </header>
        <JoinBoardForm
          boardName={joinBoardName}
          setBoardName={setJoinBoardName}
          boardPassword={joinBoardPassword}
          setBoardPassword={setJoinBoardPassword}
          boardId={newBoardId}
          setBoardId={setNewBoardId}
          userName={userName}
          userId={userId}
        ></JoinBoardForm>

        <p className="mt-4">Or</p>

        <CreateBoardForm
          boardName={createBoardName}
          setBoardName={setCreateBoardName}
          boardPassword={createBoardPassword}
          setBoardPassword={setCreateBoardPassword}
          boardId={newBoardId}
          setBoardId={setNewBoardId}
          userName={userName}
          userId={userId}
        ></CreateBoardForm>
      </div>
    </div>
  );
}