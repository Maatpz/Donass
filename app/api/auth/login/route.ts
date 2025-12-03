import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { createToken, setAuthToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    try {
      // Find admin by email
      const result = await sql`
        SELECT id, email, password_hash, name 
        FROM admins 
        WHERE email = ${email}
      `

      if (result.length === 0) {
        return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
      }

      const admin = result[0]

      // Verify password
      const isValidPassword = await bcrypt.compare(password, admin.password_hash)

      if (!isValidPassword) {
        return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
      }

      // Create JWT token
      const token = await createToken({
        adminId: admin.id,
        email: admin.email,
      })

      // Set cookie
      await setAuthToken(token)

      return NextResponse.json({
        success: true,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      })
    } catch (dbError: any) {
      console.error("Database error:", dbError)

      if (dbError.message && dbError.message.includes('relation "admins" does not exist')) {
        return NextResponse.json(
          {
            error: "DATABASE_NOT_SETUP",
            message: "Banco de dados não configurado. Acesse /setup para configurar.",
          },
          { status: 503 },
        )
      }

      return NextResponse.json(
        { error: "Erro ao acessar banco de dados. Verifique se está configurado." },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Erro interno do servidor. Verifique os logs." }, { status: 500 })
  }
}
