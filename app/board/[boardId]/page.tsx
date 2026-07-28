import BoardMainPage from "@/app/components/page/board-components/board-client-main-page";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{boardId: string}>
}

export default async function Board({ params }: Props) {
  const { boardId } = await params;
  const session = await getSession();

  if(!session) redirect("/sign-in");

  const userName = session.user.name;
  
  return (
    <>
      <BoardMainPage boardId={boardId} userName={userName}/>
    </>
  );
}
