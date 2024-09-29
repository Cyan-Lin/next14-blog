"use client";
import { signIn } from "next-auth/react";

async function LoginPage() {
  return (
    <div>
      <button onClick={() => signIn("github", { callbackUrl: "/blog" })}>
        Login with Github
      </button>
    </div>
  );
}

export default LoginPage;
