"use client"

import { exitTenant } from "@/lib/tenant"

export const ExitButton = () => {
  return <button onClick={exitTenant}>Sair</button>
}
