"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Como faço para comprar?",
    answer:
      'Basta clicar no botão "Comprar via WhatsApp" no produto desejado. Você será redirecionado para uma conversa com nossa equipe, onde poderá tirar dúvidas, escolher tamanho, cor e combinar a entrega.',
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Aceitamos Pix (instantâneo), Cartão de Crédito, Boleto e Transferência Bancária. Todos os detalhes serão combinados via WhatsApp de acordo com sua preferência.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo varia de acordo com a região. Em média, 3 a 7 dias úteis após a confirmação do pagamento. Enviamos por transportadora confiável e você recebe com segurança.",
  },
  {
    question: "Posso trocar ou devolver o produto?",
    answer:
      "Sim! Aceitamos trocas e devoluções dentro de 7 dias após o recebimento. Se o produto chegar com defeito ou não for o esperado, entre em contato pelo WhatsApp que resolvemos rapidinho!",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Dúvidas Frequentes</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Tudo o que você precisa saber sobre nossas peças e atendimento
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-foreground pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-muted-foreground leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
