import { BoardProps } from "@/app/access-board/page";
import { FaArrowUp } from "react-icons/fa";

export default function JoinBoardForm({
  boardName,
  setBoardName,
  boardPassword,
  setBoardPassword,
}: BoardProps) {
  return (
    <form action="" className="flex flex-col items-center">
      <h1>Join Board</h1>

      <input
        type="text"
        placeholder="Board Name"
        value={boardName}
        onChange={(e) => {
          setBoardName(e.target.value);
        }}
        className="mt-2"
      />

      <div className="flex w-[85%] gap-3">
        <input
          type="text"
          placeholder="Board Password"
          value={boardPassword}
          onChange={(e) => {
            setBoardPassword(e.target.value);
          }}
          className="mt-3 w-[80%]"
        />

        <button type="submit" className="mt-3 flex justify-center items-center">
          <FaArrowUp/>
        </button>
      </div>
    </form>
  );
}