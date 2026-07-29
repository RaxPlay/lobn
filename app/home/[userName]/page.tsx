import HomeMainPage from "@/app/components/page/home-components/home-client-main-component";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{userName: string}>
}

export default async function HomePage({params}: Props) {
  const { userName } = await params;
  const session = await getSession();

  if(!session) redirect("/sign-in");
  
  const userId = session.user.id

  return (
    <>
      <HomeMainPage userName={userName} userId={userId}/>
    </>
  )
}
