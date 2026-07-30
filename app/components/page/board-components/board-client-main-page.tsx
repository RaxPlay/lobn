"use client";

import { getBoardName, getTasks } from "@/utils/utils";
import { useEffect, useState } from "react";
import Todo from "./todo-component";
import Doing from "./doing-component";
import Done from "./done-component";
import AddTaskForm from "./add-task-form";
import { FaHouse } from "react-icons/fa6";
import { redirect } from "next/navigation";
import { socket } from "@/lib/socketClient";

interface Props {
  boardId: string;
  userName: string;
}

export interface DisplayTasks {
  taskContent: string;
  taskCreator: string;
  boardId: string;
}

export default function BoardMainPage({ boardId, userName }: Props) {
  const [boardName, setBoardName] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [displayTasks, setDisplayTasks] = useState<DisplayTasks[]>([]);

  useEffect(() => {
    socket.emit("join-room", { boardId, userName });

    const fetchContent = async () => {
      setBoardName(await getBoardName(boardId));
      setDisplayTasks(await getTasks(boardId))
    };
    fetchContent();
  }, []);

  const goHomeFunc = () => redirect(`/home/${userName}`);
  
  return (
    <div className="flex justify-center">
      <div id="container" className="mt-40 w-[80%] text-center">
        <header className="flex justify-center items-center">
          <h1>{boardName}</h1>

          <button
            className="back-home-btn relative left-[30%]"
            onClick={goHomeFunc}
          >
            <FaHouse />
          </button>
        </header>

        <div className="flex justify-center mt-5">
          <AddTaskForm newTask={newTask} setNewTask={setNewTask} setDisplayTasks={setDisplayTasks} boardId={boardId} userName={userName}/>
        </div>

        <div id="kan-ban-container">
          <Todo displayTasks={displayTasks}/>
          <Doing />
          <Done />
        </div>
      </div>
    </div>
  );
}
