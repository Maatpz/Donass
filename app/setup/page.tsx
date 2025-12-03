"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; credentials?: any } | null>(null)

  const handleSetup = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao configurar banco de dados",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Configuração Inicial</CardTitle>
          <CardDescription className="text-center">
            Configure o banco de dados e crie o usuário administrador
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!result && (
            <Button
              onClick={handleSetup}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Configurando...
                </>
              ) : (
                "Iniciar Configuração"
              )}
            </Button>
          )}

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">{result.message}</p>
                  {result.success && result.credentials && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-md space-y-1 text-sm">
                      <p className="font-semibold text-purple-900">Credenciais de Acesso:</p>
                      <p>
                        <strong>Email:</strong> {result.credentials.email}
                      </p>
                      <p>
                        <strong>Senha:</strong> {result.credentials.password}
                      </p>
                      <Button
                        onClick={() => (window.location.href = "/admin/login")}
                        className="w-full mt-3 bg-purple-600 hover:bg-purple-700"
                      >
                        Ir para Login
                      </Button>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>Esta página cria as tabelas necessárias no banco de dados</p>
            <p>e adiciona o usuário administrador padrão.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
