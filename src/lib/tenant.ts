// lib/tenant.ts
export async function getTenantConfig(tenant: string) {
  const data = await fetch(`https://api.seucrm.com/api/tenants/${tenant}`)
  if (!data.ok) throw new Error("Tenant inválido")
  return data.json()
}

export function exitTenant() {
  const host = window.location.host

  let newHost = ""

  if (host.includes("localhost")) {
    // Ambiente local
    const parts = host.split(".")
    if (parts.length === 2) {
      newHost = "localhost:3000"
    } else {
      newHost = host
    }
  } else {
    // Produção
    const parts = host.split(".")
    if (parts.length > 2) {
      parts.shift()
      newHost = parts.join(".")
    } else {
      newHost = host
    }
  }

  window.location.href = `${window.location.protocol}//${newHost}`
}
