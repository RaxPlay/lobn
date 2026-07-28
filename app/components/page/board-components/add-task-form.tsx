"use client";

import { FaArrowUp } from "react-icons/fa";
import { DisplayTasks } from "./board-client-main-page";
import { createNewTask } from "@/utils/utils";

interface Props {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  setDisplayTasks: React.Dispatch<React.SetStateAction<DisplayTasks[]>>;
  boardId: string;
  userName: string;
}

export default function AddTaskForm({ newTask, setNewTask, setDisplayTasks, boardId, userName }: Props) {
  const submitNewTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setDisplayTasks(await createNewTask(newTask, userName, boardId));


    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <form onSubmit={submitNewTask} className="flex w-[40%] gap-3">
      <input
        type="text"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      <button
        type="submit"
        className="w-[13%] flex justify-center items-center"
      >
        <FaArrowUp />
      </button>
    </form>
  );
}