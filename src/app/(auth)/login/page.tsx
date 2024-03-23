import { handleGithubLogin } from "@/lib/action";

async function LoginPage() {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
    </div>
  );
}

export default LoginPage;
