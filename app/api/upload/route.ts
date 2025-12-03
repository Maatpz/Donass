import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo fornecido" }, { status: 400 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          error: "Configuração de upload não disponível. Configure BLOB_READ_WRITE_TOKEN nas variáveis de ambiente.",
          details:
            "Para desenvolvimento local, você pode usar URLs de imagens diretas (ex: https://exemplo.com/imagem.jpg)",
        },
        { status: 503 },
      )
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      allowOverwrite: true,
    })

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json(
      {
        error: "Falha no upload da imagem",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
