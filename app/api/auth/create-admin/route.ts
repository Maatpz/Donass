import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

// This endpoint is for creating the first admin user
// In production, you should remove or protect this endpoint
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, senha e nome são obrigatórios" }, { status: 400 })
    }

    // Check if admin already exists
    const existing = await sql`
      SELECT id FROM admins WHERE email = ${email}
    `

    if (existing.length > 0) {
      return NextResponse.json({ error: "Admin já existe" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create admin
    const result = await sql`
      INSERT INTO admins (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name})
      RETURNING id, email, name, created_at
    `

    return NextResponse.json({
      success: true,
      admin: result[0],
    })
  } catch (error) {
    console.error("[v0] Create admin error:", error)
    return NextResponse.json({ error: "Erro ao criar admin" }, { status: 500 })
  }
}
