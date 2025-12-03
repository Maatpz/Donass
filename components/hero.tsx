import { Button } from "@/components/ui/button"
import { Sparkles, ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/30 via-background to-primary/10 pt-20"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            Confecção Própria
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
            Seja a Dona de Si <Sparkles className="inline w-12 h-12 text-primary" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Moda sensual e moderna com confecção própria. Nossas peças combinam sofisticação, conforto e leveza para que
            você se sinta confiante e linda todos os dias.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground text-lg px-8 py-6"
            >
              <a
                href="https://wa.me/5521964456231?text=Olá! Gostaria de conhecer as peças da DonaS"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale Conosco no WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <a href="#pecas">Ver Coleção</a>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { icon: "✓", text: "Qualidade Garantida" },
              { icon: "✓", text: "Enviamos para Todo Brasil" },
              { icon: "✓", text: "Atendimento Personalizado" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-foreground font-medium">
                <span className="text-primary text-xl">{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <a href="#sobre" className="inline-block text-primary">
              <ArrowDown className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
