import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function NavBar() {
  const session = await getSession();

  if (!session) {
    return (
      <nav className="flex justify-center gap-20 py-5 bg-[#292828] rounded-b-lg">
        <Link href="/sign-in" className="hover:underline">Sign-In</Link>
        <Link href="/sign-up" className="hover:underline">Sign-Up</Link>
      </nav>
    );
  }

  return <div></div>;
}
