"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { z } from "zod"

const signInSchema = z.object({
  email: z
    .string({ message: "Invalid email address" })
    .email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
})

type SignInSchema = z.infer<typeof signInSchema>

export async function login(formData: SignInSchema) {
  const data = signInSchema.parse(formData)

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error({ error })
    return { error: `Error when sign in. ${error.message}` }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters")
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"]
      })
    }
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export async function signup(
  formData: SignUpSchema
): Promise<{ error: undefined | string; confirmation_sent: boolean }> {
  const data = signUpSchema.parse(formData)

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match", confirmation_sent: false }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        firstName: data.firstName,
        lastName: data.lastName
      }
    }
  })
  if (error) {
    console.error(error)
    return {
      error: `Error when sign up. ${error.message}`,
      confirmation_sent: false
    }
  }

  if (process.env.SUPABASE_EMAIL_CONFIRMATION !== "1") {
    revalidatePath("/", "layout")
    redirect("/")
  }

  return { error: undefined, confirmation_sent: true }
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  console.log({ error })

  revalidatePath("/", "layout")
  redirect("/login")
}
