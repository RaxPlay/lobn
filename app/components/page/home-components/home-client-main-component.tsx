"use client";

import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";

interface Props {
  userName: string;
}

export default function HomeMainPage({ userName }: Props) {

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
      </div>
    </div>
  );
}
