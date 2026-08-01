"use client";

import { FaArrowUp } from "react-icons/fa";
import { DisplayTasks } from "./board-client-main-page";
import { createNewTask } from "@/utils/utils";
import { socket } from "@/lib/socketClient";
import { useEffect } from "react";

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
  useEffect(() => {
    socket.on("add-task", (data) => {
      setDisplayTasks((prev) => [...prev, data]);
    });

    return () => {
      socket.off("add-task");
    };
  }, []);

  const submitNewTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const tempId = crypto.randomUUID();
    const optimisticTask = {
      taskId: tempId,
      taskContent: newTask,
      taskCreator: userName,
      boardId,
      taskZone: "todo",
    };

    setDisplayTasks((prev) => [...prev, optimisticTask]);

    const savedTask = await createNewTask(newTask, userName, boardId, "todo");

    setDisplayTasks((prev) =>
      prev.map((t) => (t.taskId === tempId ? savedTask : t)),
    );

    socket.emit("add-task", savedTask);

    setNewTask("");
  };

  return (
    <form
      onSubmit={submitNewTask}
      className="flex w-[40%] justify-center gap-3"
    >
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
