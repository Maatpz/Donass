import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getCurrentAdmin } from "@/lib/auth"

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Vestido Elegante",
    description: "Vestido roxo elegante perfeito para ocasiões especiais",
    price: 120,
    image_url: "/elegant-purple-dress.jpg",
  },
  {
    id: 2,
    name: "Saia Jeans",
    description: "Saia jeans moderna e versátil",
    price: 80,
    image_url: "/denim-skirt.png",
  },
  {
    id: 3,
    name: "Vestido Casual",
    description: "Vestido casual confortável para o dia a dia",
    price: 95,
    image_url: "/casual-dress.jpg",
  },
  {
    id: 4,
    name: "Saia Midi",
    description: "Saia midi elegante e sofisticada",
    price: 110,
    image_url: "/midi-skirt.jpg",
  },
  {
    id: 5,
    name: "Vestido Longo",
    description: "Vestido longo para eventos especiais",
    price: 180,
    image_url: "/long-evening-dress.jpg",
  },
  {
    id: 6,
    name: "Short Saia",
    description: "Short saia prático e estiloso",
    price: 75,
    image_url: "/skort-shorts.jpg",
  },
  {
    id: 7,
    name: "Conjunto Cropped",
    description: "Conjunto cropped moderno e confortável",
    price: 150,
    image_url: "/cropped-set.jpg",
  },
  {
    id: 8,
    name: "Calça Pantalona",
    description: "Calça pantalona elegante e versátil",
    price: 130,
    image_url: "/wide-leg-pants.png",
  },
  {
    id: 9,
    name: "Blusa Ciganinha",
    description: "Blusa ciganinha delicada e feminina",
    price: 65,
    image_url: "/off-shoulder-top.jpg",
  },
  {
    id: 10,
    name: "Saia Lápis",
    description: "Saia lápis clássica e elegante",
    price: 90,
    image_url: "/pencil-skirt.jpg",
  },
  {
    id: 11,
    name: "Macaquinho",
    description: "Macaquinho prático e estiloso",
    price: 145,
    image_url: "/romper.jpg",
  },
  {
    id: 12,
    name: "Vestido Curto",
    description: "Vestido curto moderno e confortável",
    price: 105,
    image_url: "/short-dress.jpg",
  },
]

// GET all products (public)
export async function GET() {
  try {
    const products = await sql`
      SELECT id, name, description, price, image_url, created_at, updated_at
      FROM products
      ORDER BY created_at DESC
    `

    return NextResponse.json({ products, useFallback: false })
  } catch (error: any) {
    if (error?.code === "42P01" || error?.message?.includes("does not exist")) {
      return NextResponse.json({ products: FALLBACK_PRODUCTS, useFallback: true })
    }

    console.error("[v0] Get products error:", error)
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
  }
}

// POST create product (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const { name, description, price, image_url } = await request.json()

    // Validate input
    if (!name || !price) {
      return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 })
    }

    // Create product
    const result = await sql`
      INSERT INTO products (name, description, price, image_url)
      VALUES (${name}, ${description || ""}, ${price}, ${image_url || "/placeholder.svg?height=400&width=300"})
      RETURNING id, name, description, price, image_url, created_at, updated_at
    `

    return NextResponse.json({
      success: true,
      product: result[0],
    })
  } catch (error) {
    console.error("[v0] Create product error:", error)
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}
