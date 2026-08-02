"use client";

import { type ComponentProps } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { getBoardName, getTasks, updateTaskZone } from "@/utils/utils";
import { useEffect, useState } from "react";
import Todo from "./todo-component";
import Doing from "./doing-component";
import Done from "./done-component";
import AddTaskForm from "./add-task-form";
import { FaHouse } from "react-icons/fa6";
import { redirect } from "next/navigation";
import { socket } from "@/lib/socketClient";
import Draggable from "./draggable-component";

interface Props {
  boardId: string;
  userName: string;
}

type OnDragEnd = NonNullable<
  ComponentProps<typeof DragDropProvider>["onDragEnd"]
>;

export interface DisplayTasks {
  taskId: string;
  taskContent: string;
  taskCreator: string;
  taskZone: string;
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
      setDisplayTasks(await getTasks(boardId));
    };
    fetchContent();
  }, []);

  const handleDragEnd: OnDragEnd = async (event) => {
    if (event.canceled) return;

    const { source, target } = event.operation;
    if (!target) return;

    const taskId = String(source?.id);
    const newZone = String(target.id);

    const draggedTask = displayTasks.find((t) => t.taskId === taskId);
    if (!draggedTask || draggedTask.taskZone === newZone) return;

    setDisplayTasks((prev) =>
      prev.map((t) => (t.taskId === taskId ? { ...t, taskZone: newZone } : t)),
    );

    await updateTaskZone(taskId, newZone);
  };

  const goHomeFunc = () => redirect(`/home/${userName}`);

  return (
    <div className="flex justify-center">
      <div id="container" className="mt-40 w-[80%] text-center animate-fade-up animate-duration-[1200ms]">
        <header className="board-header items-center text-end">
          <div>
            <h1>{boardName}</h1>
          </div>
          <div className="text-end p-4">
            <button className="back-home-btn" onClick={goHomeFunc}>
              <FaHouse />
            </button>
          </div>
        </header>

        <div className="flex justify-center mt-5">
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            setDisplayTasks={setDisplayTasks}
            boardId={boardId}
            userName={userName}
          />
        </div>

        <div id="kan-ban-container">
          <DragDropProvider onDragEnd={handleDragEnd}>
            <Todo id="todo">
              {displayTasks
                .filter((task) => task.taskZone === "todo")
                .map((task) => (
                  <Draggable key={task.taskId} id={task.taskId} task={task} />
                ))}
            </Todo>
            <Doing id="doing">
              {displayTasks
                .filter((task) => task.taskZone === "doing")
                .map((task) => (
                  <Draggable key={task.taskId} id={task.taskId} task={task} />
                ))}
            </Doing>
            <Done id="done">
              {displayTasks
                .filter((task) => task.taskZone === "done")
                .map((task) => (
                  <Draggable key={task.taskId} id={task.taskId} task={task} />
                ))}
            </Done>
          </DragDropProvider>
        </div>
      </div>
    </div>
  );
}
