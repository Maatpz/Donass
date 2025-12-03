#!/usr/bin/env node
import { neon } from "@neondatabase/serverless"

const NEON_NEON_DATABASE_URL = process.env.NEON_DATABASE_URL

if (!NEON_DATABASE_URL) {
  console.error("❌ Error: NEON_DATABASE_URL environment variable is not set")
  process.exit(1)
}

const sql = neon(NEON_DATABASE_URL)

async function resetDatabase() {
  console.log("⚠️  WARNING: This will delete all data from the database!\n")

  try {
    console.log("🗑️  Dropping tables...")
    await sql`DROP TABLE IF EXISTS products CASCADE`
    await sql`DROP TABLE IF EXISTS admins CASCADE`
    console.log("✅ Tables dropped\n")

    console.log("✨ Database reset complete!")
    console.log("Run 'npm run setup' to recreate tables and seed data\n")
  } catch (error) {
    console.error("❌ Reset failed:", error)
    process.exit(1)
  }
}

resetDatabase()
