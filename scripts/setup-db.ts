#!/usr/bin/env node
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid"

if (!NEON_DATABASE_URL) {
  console.error("❌ Error: NEON_DATABASE_URL environment variable is not set")
  console.error("Please add it to your .env.local file")
  process.exit(1)
}

const sql = neon(NEON_DATABASE_URL)

async function setupDatabase() {
  console.log("🚀 Starting database setup...\n")

  try {
    console.log("📋 Creating admins table...")
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
    console.log("✅ Admins table created\n")

    console.log("📋 Creating products table...")
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
    console.log("✅ Products table created\n")

    console.log("👤 Creating admin user...")
    const passwordHash = await bcrypt.hash("DonaS2025!", 10)
    await sql`
      INSERT INTO admins (email, password_hash, name)
      VALUES ('admin@donas.com', ${passwordHash}, 'Administrador DonaS')
      ON CONFLICT (email) DO NOTHING
    `
    console.log("✅ Admin user created\n")

    console.log("🛍️  Seeding products...")
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
        INSERT INTO products (id, name, price, image_url, description, category)
        VALUES (${uuid()}, ${product.name}, ${product.price}, ${product.image_url}, ${product.description}, ${product.category})
        ON CONFLICT DO NOTHING
      `
    }
    console.log("✅ Products seeded\n")

    console.log("🎉 Database setup completed successfully!\n")
    console.log("📝 Admin credentials:")
    console.log("   Email: admin@donas.com")
    console.log("   Password: DonaS2025!\n")
    console.log("🌐 You can now run 'npm run dev' and access:")
    console.log("   - Public site: http://localhost:3000")
    console.log("   - Admin panel: http://localhost:3000/admin/login\n")
  } catch (error) {
    console.error("❌ Setup failed:", error)
    process.exit(1)
  }
}

setupDatabase()
