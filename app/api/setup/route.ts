import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

const connectionString = process.env.NEON_NEON_DATABASE_URL;

if (!connectionString) {
  throw new Error("NEON_NEON_DATABASE_URL não está definida.");
}

const sql = neon(connectionString);

export async function POST() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email)`

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT,
        category VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`

    const passwordHash = await bcrypt.hash("DonaS2025!", 10)

    await sql`
      INSERT INTO admins (email, password_hash, name)
      VALUES ('admin@donas.com', ${passwordHash}, 'Administrador DonaS')
      ON CONFLICT (email) DO NOTHING
    `

    const products = [
      {
        name: "Vestido Elegante",
        price: 120.0,
        image_url: "/elegant-purple-dress.jpg",
        description: "Vestido elegante perfeito para ocasiões especiais",
        category: "Vestidos",
      },
      {
        name: "Saia Jeans",
        price: 80.0,
        image_url: "/denim-skirt.png",
        description: "Saia jeans versátil para o dia a dia",
        category: "Saias",
      },
      {
        name: "Vestido Casual",
        price: 95.0,
        image_url: "/casual-dress.jpg",
        description: "Vestido casual confortável e moderno",
        category: "Vestidos",
      },
      {
        name: "Saia Midi",
        price: 110.0,
        image_url: "/midi-skirt.jpg",
        description: "Saia midi elegante e sofisticada",
        category: "Saias",
      },
      {
        name: "Vestido Longo",
        price: 180.0,
        image_url: "/long-evening-dress.jpg",
        description: "Vestido longo para eventos especiais",
        category: "Vestidos",
      },
      {
        name: "Short Saia",
        price: 75.0,
        image_url: "/skort-shorts.jpg",
        description: "Short saia prático e estiloso",
        category: "Shorts",
      },
      {
        name: "Conjunto Cropped",
        price: 150.0,
        image_url: "/cropped-set.jpg",
        description: "Conjunto cropped moderno e sensual",
        category: "Conjuntos",
      },
      {
        name: "Calça Pantalona",
        price: 130.0,
        image_url: "/wide-leg-pants.png",
        description: "Calça pantalona elegante e confortável",
        category: "Calças",
      },
      {
        name: "Blusa Ciganinha",
        price: 65.0,
        image_url: "/off-shoulder-blouse.jpg",
        description: "Blusa ciganinha romântica e delicada",
        category: "Blusas",
      },
      {
        name: "Saia Lápis",
        price: 90.0,
        image_url: "/pencil-skirt.jpg",
        description: "Saia lápis clássica e versátil",
        category: "Saias",
      },
      {
        name: "Macaquinho",
        price: 145.0,
        image_url: "/romper-jumpsuit.jpg",
        description: "Macaquinho moderno e prático",
        category: "Macacões",
      },
      {
        name: "Vestido Curto",
        price: 105.0,
        image_url: "/short-dress.jpg",
        description: "Vestido curto perfeito para o verão",
        category: "Vestidos",
      },
    ]

    for (const product of products) {
      await sql`
        INSERT INTO products (name, price, image_url, description, category)
        VALUES (${product.name}, ${product.price}, ${product.image_url}, ${product.description}, ${product.category})
        ON CONFLICT DO NOTHING
      `
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
      credentials: {
        email: "admin@donas.com",
        password: "DonaS2025!",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to setup database", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
