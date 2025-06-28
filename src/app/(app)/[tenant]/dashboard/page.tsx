import { ExitButton } from "../_exit/button"

export default function TenantDashboard({
  params
}: {
  params: { tenant: string }
}) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Tenant: {params.tenant}</p>

      <ExitButton />
    </div>
  )
}
