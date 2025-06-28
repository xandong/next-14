// app/[tenant]/page.tsx
import { redirect } from "next/navigation"

export default function TenantRootRedirect() {
  redirect(`/dashboard`)
}
