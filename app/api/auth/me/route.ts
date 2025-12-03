import { NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const admin = await getCurrentAdmin()

    if (!admin) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Get full admin details
    const result = await sql`
      SELECT id, email, name, created_at
      FROM admins
      WHERE id = ${admin.adminId}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Admin não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ admin: result[0] })
  } catch (error) {
    console.error("[v0] Get current admin error:", error)
    return NextResponse.json({ error: "Erro ao buscar dados do admin" }, { status: 500 })
  }
}
