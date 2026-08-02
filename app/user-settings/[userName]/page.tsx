import SignOutButton from "@/app/components/auth/social-sign-out-button";

type Props = {
  params: Promise<{userName: string}>
}

export default async function UserSettings({ params }: Props) {
  return (
    <div className="flex justify-center">
      <div id="container" className="mt-40 text-center w-[30%] h-80 p-4 animate-fade-up animate-duration-[1200ms]">
        <h1>Settings</h1>

        <div className="mt-5">
          <SignOutButton/>
        </div>
      </div>
    </div>
  )
}
