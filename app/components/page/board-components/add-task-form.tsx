"use client";

import { FaArrowUp } from "react-icons/fa";

interface Props {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddTaskForm({ newTask, setNewTask }: Props) {
  return (
    <form action="" className="flex w-[40%] gap-3">
      <input type="text" placeholder="New Task" />
      <button
        type="submit"
        className="w-[13%] flex justify-center items-center"
      >
        <FaArrowUp />
      </button>
    </form>
  );
}
