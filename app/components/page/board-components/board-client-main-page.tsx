"use client";

import { getBoardName } from "@/utils/utils";
import { useEffect, useState } from "react";
import Todo from "./todo-component";
import Doing from "./doing-component";
import Done from "./done-component";
import AddTaskForm from "./add-task-form";
import { FaHouse } from "react-icons/fa6";
import { redirect } from "next/navigation";

interface Props {
  boardId: string;
  userName: string
}

export default function BoardMainPage({ boardId, userName }: Props) {
  const [boardName, setBoardName] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    const fetchBoardName = async () => {
      setBoardName(await getBoardName(boardId));
    };
    fetchBoardName();
  }, []);

  const goHomeFunc = () => redirect(`/home/${userName}`);

  return (
    <div className="flex justify-center">
      <div id="container" className="mt-40 w-[80%] text-center">
        <header className="flex justify-center items-center">
          <h1>{boardName}</h1>

          <button className="back-home-btn relative left-[30%]" onClick={goHomeFunc}>
            <FaHouse />
          </button>
        </header>

        <div className="flex justify-center mt-5">
          <AddTaskForm newTask={newTask} setNewTask={setNewTask} />
        </div>

        <div id="kan-ban-container">
          <Todo />
          <Doing />
          <Done />
        </div>
      </div>
    </div>
  );
}
