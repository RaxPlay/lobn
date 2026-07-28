import { getSession } from "@/lib/auth";
import AccessBoardMainPage from "../components/page/access-board-components/access-board-main-page";
import { redirect } from "next/navigation";

export default async function AccessBoard() {
  const session = await getSession();

  if(!session) redirect("/sign-in")

  if (session) {
    const userName = session?.user.name;
    const userId = session?.user.id;

    return (
      <div>
        <AccessBoardMainPage userName={userName} userId={userId} />
      </div>
    );
  }
}
