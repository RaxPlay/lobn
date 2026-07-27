"use server";

import { db } from "@/app/src";
import { BoardTable } from "@/auth-schema";
import { and, eq } from "drizzle-orm";


//Database related functions
export const createNewBoard = async (
  newBoardName: string,
  newBoardPassword: string,
) => {
  const newBoard = await db
    .insert(BoardTable)
    .values({
      boardName: newBoardName,
      boardPassword: newBoardPassword,
    })
    .returning({
      boardId: BoardTable.boardId,
    });

  return newBoard[0].boardId;
};

export const getBoard = async (boardName: string, boardPassword: string) => {
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

  console.log(board)
  return board;
};
