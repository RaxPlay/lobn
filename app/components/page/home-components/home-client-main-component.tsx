"use client";

import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";
import DisplayBoards from "./display-users-boards";
import { useEffect, useState } from "react";
import { getBoardId, getUsersBoard } from "@/utils/utils";

interface Props {
  userName: string;
  userId: string;
}

export interface Boards {
  membershipId: string;
  partOfName: string;
  partOf: string;
}

export default function HomeMainPage({ userName, userId }: Props) {
  const [displayBoards, setDisplayBoards] = useState<Boards[]>([]);

  useEffect(() => {
    const getBoardsInfo = async () => {
      setDisplayBoards(await getUsersBoard(userId));
    };
    getBoardsInfo();
  }, []);

  const goToSettings = () => redirect(`/user-settings/${userName}`);
  const goJoinBoard = () => redirect(`/access-board`);

  return (
    <div className="flex justify-center">
      <div id="container" className="mt-40 w-[80%] text-center animate-fade-up animate-duration-[1200ms]">
        <header className="home-header items-center">
          <h1>
            Welcome Home <span className="underline">{userName}</span>
          </h1>

          <div className="flex justify-end gap-5 p-4">
            <button onClick={goJoinBoard}>
              <GrLogin />
            </button>

            <button onClick={goToSettings}>
              <FaUser />
            </button>
          </div>
        </header>

        <section>
          <DisplayBoards displayBoards={displayBoards} />
        </section>
      </div>
    </div>
  );
}
