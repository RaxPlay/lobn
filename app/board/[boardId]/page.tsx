import BoardMainPage from "@/app/components/page/board-components/board-client-main-page";

interface BoardInfo {
  boardName: string;
}

type Props = {
  params: Promise<{boardId: string}>
}

export default async function Board({ params }: Props) {
  const { boardId } = await params;
  
  return (
    <>
      <BoardMainPage boardId={boardId}/>
    </>
  );
}
