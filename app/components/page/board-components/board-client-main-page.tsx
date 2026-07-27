"use client"

import { getBoardName } from "@/utils/utils"
import { useEffect, useState } from "react"

interface Props {
  boardId: string
}

export default function BoardMainPage({boardId}: Props) {
  const [boardName, setBoardName] = useState<string>("")

  useEffect(() => {
    const fetchBoardName = async() => {
      setBoardName(await getBoardName(boardId));
    }
    fetchBoardName();
  }, [])

  return (
    <div className="flex justify-center">
      <h1>{boardName}</h1>
    </div>
  )
}
