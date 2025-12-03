import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getCurrentAdmin } from "@/lib/auth"

// GET single product (public)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID do produto não fornecido" }, { status: 400 })
    }

    const result = await sql`
      SELECT id, name, description, price, image_url, created_at, updated_at
      FROM products
      WHERE id = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ product: result[0] })
  } catch (error) {
    console.error("Get product error:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json(
      {
        error: "Erro ao buscar produto",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}

// PUT update product (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado. Faça login novamente." }, { status: 401 })
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID do produto não fornecido" }, { status: 400 })
    }
    const { name, description, price, image_url } = await request.json()

    // Validate input
    if (!name || !price) {
      return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 })
    }

    const priceNum = Number.parseFloat(price)
    if (isNaN(priceNum) || priceNum < 0) {
      return NextResponse.json({ error: "Preço inválido" }, { status: 400 })
    }

    // Update product
    const result = await sql`
      UPDATE products
      SET 
        name = ${name},
        description = ${description || ""},
        price = ${priceNum},
        image_url = ${image_url || "/placeholder.svg?height=400&width=300"},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, description, price, image_url, created_at, updated_at
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: result[0],
    })
  } catch (error) {
    console.error("Update product error:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json(
      {
        error: "Erro ao atualizar produto",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}

// DELETE product (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado. Faça login novamente." }, { status: 401 })
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID do produto não fornecido" }, { status: 400 })
    }

    // Delete product
    const result = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete product error:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json(
      {
        error: "Erro ao deletar produto",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
