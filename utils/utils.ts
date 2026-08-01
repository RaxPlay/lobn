"use server";

import { db } from "@/app/src";
import { BoardTable, MembersTable, TaskTable } from "@/auth-schema";
import { and, eq, ne } from "drizzle-orm";

//Database related functions
export const createNewBoard = async (
  newBoardName: string,
  newBoardPassword: string,
  boardCreator: string,
) => {
  const newBoard = await db
    .insert(BoardTable)
    .values({
      boardName: newBoardName,
      boardPassword: newBoardPassword,
      boardCreator,
    })
    .returning({
      boardId: BoardTable.boardId,
    });

  return newBoard[0].boardId;
};

export const getUsersBoard = async (userId: string) => {
  const boards = db
    .select({
      membershipId: MembersTable.membershipId,
      partOfName: MembersTable.partOfName,
      partOf: MembersTable.partOf,
    })
    .from(MembersTable)
    .where(eq(MembersTable.memberId, userId));

  return boards
};

export const getBoardId = async (boardName: string, boardPassword: string) => {
  const board = await db
    .select({
      boardId: BoardTable.boardId,
    })
    .from(BoardTable)
    .where(
      and(
        eq(BoardTable.boardName, boardName),
        eq(BoardTable.boardPassword, boardPassword),
      ),
    );

  return board;
};

export const getBoardName = async (boardId: string) => {
  const board = await db
    .select({
      boardName: BoardTable.boardName,
    })
    .from(BoardTable)
    .where(eq(BoardTable.boardId, boardId));

  return board[0].boardName;
};

export const joinBoard = async (
  boardId: string,
  boardName: string,
  newMemberName: string,
  newMemberId: string,
) => {
  const checkExisting = await db
    .select()
    .from(MembersTable)
    .where(
      and(
        eq(MembersTable.memberId, newMemberId),
        eq(MembersTable.partOf, boardId),
      ),
    );

  if (checkExisting.length > 0) {
    return;
  }

  await db.insert(MembersTable).values({
    memberId: newMemberId,
    memberName: newMemberName,
    partOf: boardId,
    partOfName: boardName,

  });
};

export const createNewTask = async (
  taskContent: string,
  taskCreator: string,
  boardId: string,
  taskZone: string,
) => {
  const [task] = await db
    .insert(TaskTable)
    .values({
      taskContent,
      taskCreator,
      boardId,
      taskZone,
    })
    .returning({
      taskId: TaskTable.taskId,
      taskContent: TaskTable.taskContent,
      taskCreator: TaskTable.taskCreator,
      taskZone: TaskTable.taskZone,
      boardId: TaskTable.boardId
    });

  return task;
};

export const getTasks = async (boardId: string) => {
  const allTasks = await db
    .select({
      taskId: TaskTable.taskId,
      taskContent: TaskTable.taskContent,
      taskCreator: TaskTable.taskCreator,
      taskZone: TaskTable.taskZone,
      boardId: TaskTable.boardId,
    })
    .from(TaskTable)
    .where(eq(TaskTable.boardId, boardId));

  return allTasks;
};
