import SignOutButton from "@/app/components/auth/social-sign-out-button";

type Props = {
  params: Promise<{userName: string}>
}

export default async function UserSettings({ params }: Props) {
  const { userName } = await params;

  return (
    <div className="flex justify-center">
      <div id="container" className="mt-40 text-center w-[50%] h-80">
        <h1>Settings</h1>

        <div>
          <SignOutButton/>
        </div>
      </div>
    </div>
  )
}
