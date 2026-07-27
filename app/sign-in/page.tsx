import { getSession } from "@/lib/auth";
import { signInAction } from "../api/auth";
import { redirect } from "next/navigation";
import SocialSignInButton from "../components/auth/social-sign-in-button";
import NavBar from "../components/auth/auth-navbar";

export default async function SignInPage() {
  const session = await getSession();

  if (session) redirect("/");

  return (
    <>
      <NavBar></NavBar>

      <div className="flex justify-center">
        <form
          action={signInAction}
          id="container"
          className="flex flex-col items-center mt-40 px-3 py-4"
        >
          <h1>Sign In</h1>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="mt-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="mt-3"
          />

          <button type="submit" className="mt-4 py-2">
            Sign In with Email
          </button>

          <p className="my-4">Or</p>

          <SocialSignInButton />
        </form>
      </div>
    </>
  );
}
