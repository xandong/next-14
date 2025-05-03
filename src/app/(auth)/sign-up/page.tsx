"user client"

import Link from "next/link"

import { signup } from "../_actions"
import { AuthLayout } from "@/components/layout/auth-layout"
import { Button } from "@/components/_ui/button"
import { Input } from "@/components/_ui/input"
import { PasswordInput } from "@/components/_ui/input-password"

export default function SignUp() {
  return (
    <AuthLayout>
      <h1 className="font-bold text-2xl mb-8">Register</h1>

      <form className="flex flex-col gap-4 w-[320px] max-w-full">
        <div className="flex flex-col">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex flex-col">
          <PasswordInput
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <Button formAction={signup}>Sign up</Button>
      </form>

      <div className="pt-6">
        <Link href={"/sign-in"}>Sign In</Link>
      </div>
    </AuthLayout>
  )
}
