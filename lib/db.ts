import { neon } from "@neondatabase/serverless"

// Create a singleton connection to Neon
const connectionString = process.env.NEON_NEON_DATABASE_URL;

if (!connectionString) {
  // Isso é para evitar que o build falhe no Vercel/Next.js quando a variável não está definida
  // em tempo de build, mas será definida em tempo de execução.
  // Para testes locais, o erro de conexão ocorrerá em tempo de execução, o que é esperado.
  console.warn("NEON_NEON_DATABASE_URL não está definida. O banco de dados não funcionará.");
}

const sql = neon(connectionString || "postgres://placeholder:placeholder@placeholder:5432/placeholder");

export { sql }
