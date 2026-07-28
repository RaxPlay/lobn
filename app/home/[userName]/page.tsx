import HomeMainPage from "@/app/components/page/home-components/home-client-main-component";

type Props = {
  params: Promise<{userName: string}>
}

export default async function HomePage({params}: Props) {
  const { userName } = await params;
  
  return (
    <>
      <HomeMainPage userName={userName}/>
    </>
  )
}
