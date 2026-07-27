"use server"

import { db } from "@/app/src"
import { BoardTable } from "@/auth-schema"

export const createNewBoard = async(newBoardName: string, newBoardPassword: string) => {
  const newBoard = await db.insert(BoardTable).values({
    boardName: newBoardName,
    boardPassword: newBoardPassword,
  }).returning({
    boardId: BoardTable.boardId
  });

  return newBoard[0].boardId
};