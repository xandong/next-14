// app/_sites/[tenant]/sair/page.tsx
import { redirect } from "next/navigation"

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL || "/"

export default function SairDoTenant() {
  redirect(`http://${domainUrl}`)
}
