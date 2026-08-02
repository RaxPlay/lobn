import { getSession } from "@/lib/auth";
import { signUpAction } from "../api/auth";
import { redirect } from "next/navigation";
import SocialSignInButton from "../components/auth/social-sign-in-button";
import NavBar from "../components/auth/auth-navbar";

export default async function SignUpPage() {
  const session = await getSession();

  if (session) redirect("/");

  return (
    <>
      <NavBar></NavBar>

      <div className="flex justify-center">
        <form
          action={signUpAction}
          id="container"
          className="flex flex-col items-center mt-40 px-3 py-4 animate-fade-up animate-duration-[1200ms]"
        >
          <h1>Sign Up</h1>
          <input
            type="text"
            name="name"
            placeholder="User Name"
            required
            className="mt-2"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="mt-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="mt-3"
          />

          <button type="submit" className="mt-4 py-2">
            Sign Up with Email
          </button>

          <p className="my-4">Or</p>

          <SocialSignInButton />
        </form>
      </div>
    </>
  );
}
