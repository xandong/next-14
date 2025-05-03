import { AuthLayout } from "@/components/layout/AuthLayout";
import { signup } from "../_actions";

export default function SignUp() {
  return <AuthLayout>
    <h1>Register</h1>

    <form className="flex flex-col gap-4 w-[400px]">
      <div className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />  
      </div>
      
      <button formAction={signup}>Sign up</button>
    </form>
  </AuthLayout>
}