"use client";

import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";
import DisplayBoards from "./display-users-boards";
import { useEffect, useState } from "react";
import { getUsersBoard } from "@/utils/utils";

interface Props {
  userName: string;
  userId: string
}

export interface Boards {
  partOf: string
}

export default function HomeMainPage({ userName, userId }: Props) {
  const [displayBoards, setDisplayBoards] = useState<Boards[]>([]);

  useEffect(() => {
    const getBoardsFunc = async() => {
      setDisplayBoards(await getUsersBoard(userId))
    }
    getBoardsFunc()
  }, [])

  const goToSettings = () => redirect(`/user-settings/${userName}`)
  const goJoinBoard = () => redirect(`/access-board`)

  return (
    <div className="flex justify-center">
      <div id="container" className="mt-40 w-[80%] text-center">
        <header className="flex items-center justify-center">
          <h1>
            Welcome Home <span className="underline">{userName}</span>
          </h1>

          <button className="relative left-[20%]" onClick={goJoinBoard}>
            <GrLogin/>
          </button>
          
          <button className="relative left-[26%]" onClick={goToSettings}>
            <FaUser/>
          </button>
        </header>

        <section>
          <DisplayBoards displayBoards={displayBoards} setDisplayBoards={setDisplayBoards}/>
        </section>
      </div>
    </div>
  );
}
