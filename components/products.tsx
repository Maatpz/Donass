"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  description?: string
  price: number
  image_url: string
}

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

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [useFallback, setUseFallback] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()

        if (data.products) {
          setProducts(data.products)
          setUseFallback(data.useFallback || false)
        }
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getWhatsAppLink = (productName: string, price: number) => {
    const message = `Olá! Tenho interesse no produto: ${productName} - ${formatPrice(price)}`
    return `https://wa.me/5521964456231?text=${encodeURIComponent(message)}`
  }

  if (loading) {
    return (
      <section id="pecas" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <p className="text-xl text-muted-foreground">Carregando produtos...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return (
      <section id="pecas" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Coleção Exclusiva DonaS
              </h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Em breve novos produtos disponíveis
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pecas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Coleção Exclusiva DonaS
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Peças únicas que combinam elegância, conforto e sofisticação
            </p>
            {useFallback && (
              <p className="text-sm text-muted-foreground mt-4 bg-muted px-4 py-2 rounded-lg inline-block">
                💡 Produtos de demonstração. Acesse{" "}
                <a href="/setup" className="underline font-semibold">
                  configuração
                </a>{" "}
                para adicionar seus produtos reais.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-3 p-4">
                  <div className="w-full">
                    <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
                    {product.description && <p className="text-sm text-muted-foreground mb-2">{product.description}</p>}
                    <p className="text-2xl font-bold text-primary">{formatPrice(Number(product.price))}</p>
                  </div>
                  <Button asChild className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
                    <a
                      href={getWhatsAppLink(product.name, Number(product.price))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar via WhatsApp
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
