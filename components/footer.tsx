import { Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#sobre", label: "Sobre DonaS" },
    { href: "#pecas", label: "Nossas Peças" },
    { href: "#contato", label: "Contato" },
  ]

  return (
    <footer id="contato" className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Navegação Rápida</h3>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Fale Conosco</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/5521964456231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (21) 96445-6231
                </a>
                <a
                  href="mailto:contato@donas.com.br"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contato@donas.com.br
                </a>
                <a
                  href="https://instagram.com/usedonaas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @usedonaas
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Localização</h3>
              <div className="flex items-start gap-2 text-primary-foreground/80 mb-4">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>São Gonçalo - RJ</p>
                  <p>Brasil</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p>✓ Confecção Própria</p>
                <p>✓ Enviamos para Todo o Brasil</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/80">
            <p>© 2025 DonaS. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
