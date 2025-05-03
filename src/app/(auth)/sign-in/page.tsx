import { AuthLayout } from "@/components/layout/AuthLayout";
import { login } from "@/app/(auth)/_actions";

export default function SignIn() {
  return <AuthLayout>
    <h1 className="font-bold text-2xl">Login</h1>

    <form className="flex flex-col gap-4 w-[400px]">
      <div className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />  
      </div>

      <button formAction={login}>Log in</button>
    </form>
  </AuthLayout>
}