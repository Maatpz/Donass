import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { sql } from "@/lib/db"
import AdminDashboard from "@/components/admin-dashboard"

export default async function AdminPage() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  const products = await sql`
    SELECT id, name, description, price, image_url, created_at, updated_at
    FROM products
    ORDER BY created_at DESC
  `

  return <AdminDashboard initialProducts={products} admin={admin} />
}
