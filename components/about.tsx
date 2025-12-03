import { Sparkles, Heart, Shield, Truck, Star } from "lucide-react"

export function About() {
  const values = [
    {
      icon: Star,
      title: "Qualidade",
      description: "Produtos confeccionados com excelência",
    },
    {
      icon: Sparkles,
      title: "Exclusividade",
      description: "Peças únicas e diferenciadas",
    },
    {
      icon: Heart,
      title: "Atendimento Humanizado",
      description: "Vendas personalizadas via WhatsApp",
    },
    {
      icon: Shield,
      title: "Confiança",
      description: "Trocas e devoluções garantidas",
    },
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Enviamos para todo o Brasil",
    },
  ]

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Sobre a DonaS</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Nascemos com a missão de oferecer moda feminina de alta qualidade
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Mission */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Missão e Propósito</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nascemos com a missão de oferecer moda feminina de alta qualidade, com peças que valorizam a beleza e a
                confiança de cada mulher. Acreditamos que a moda é uma forma de expressão pessoal, por isso selecionamos
                cuidadosamente cada detalhe da nossa coleção.
              </p>
            </div>

            {/* Own Manufacturing */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Confecção Própria</h3>
              <p className="text-muted-foreground leading-relaxed">
                Garantimos qualidade desde a escolha dos tecidos até o acabamento final. Enviamos para todo o Brasil com
                segurança e rapidez. O melhor: você compra direto pelo WhatsApp, sem intermediários!
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground text-center mb-8">Nossos Valores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors text-center space-y-3"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
