"use client";

import { authClient } from "@/lib/client";
import { FaGithub } from "react-icons/fa";

export default function SocialSignInButton() {
  const signInWithGitHub = async () =>
    await authClient.signIn.social({
      callbackURL: "/",
      provider: "github",
    });

  return (
    <button onClick={signInWithGitHub} className="flex items-center gap-2">
      <FaGithub />
      Sign In with GitHub
    </button>
  );
}
