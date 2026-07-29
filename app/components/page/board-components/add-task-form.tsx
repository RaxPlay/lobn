"use client";

import { FaArrowUp } from "react-icons/fa";
import { DisplayTasks } from "./board-client-main-page";
import { createNewTask } from "@/utils/utils";
import { socket } from "@/lib/socketClient";

interface Props {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  setDisplayTasks: React.Dispatch<React.SetStateAction<DisplayTasks[]>>;

  boardId: string;
  userName: string;
}

export default function AddTaskForm({
  newTask,
  setNewTask,
  setDisplayTasks,
  boardId,
  userName,
}: Props) {
  const submitNewTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { taskContent: newTask, taskCreator: userName, boardId}
    setDisplayTasks((prev) => [...prev, data]);
    await createNewTask(newTask, userName, boardId)
    socket.emit("add-task", data)
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
