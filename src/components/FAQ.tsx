import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "O que acontece com minha foto depois?",
    answer: "Sua foto é apagada em 24 horas. Respeitamos rigorosamente sua privacidade e não usamos suas imagens para treinar nossa IA."
  },
  {
    question: "Foto muito rasgada funciona?",
    answer: "Sim, nossa IA consegue reconstruir áreas danificadas na maioria dos casos. No entanto, se o rosto principal estiver completamente destruído, os resultados podem variar."
  },
  {
    question: "E se eu não gostar do resultado com garantia 30 dias?",
    answer: "Oferecemos uma garantia incondicional de 30 dias. Se não gostar dos resultados, devolvemos seu dinheiro sem burocracia."
  },
  {
    question: "A colorização fica natural?",
    answer: "Sim. A IA analisa o contexto histórico, os tons de pele e as texturas para aplicar cores realistas, diferentemente dos filtros tradicionais."
  },
  {
    question: "Quanto custa?",
    answer: "Temos pacotes a partir de R$ 9,90, pagos apenas quando você for usar. Sem mensalidades obrigatórias e com pagamento único disponível."
  },
  {
    question: "Quanto tempo demora?",
    answer: "O processamento completo, incluindo restauração facial e upscaler para 4K, leva cerca de 30 segundos em média."
  },
  {
    question: "Sou obrigado a assinar plano mensal?",
    answer: "Não. Oferecemos pacotes avulsos para quem quer usar apenas algumas vezes, além de planos para uso frequente."
  },
  {
    question: "Quais formatos são aceitos?",
    answer: "Aceitamos JPG, PNG, WEBP e HEIC com tamanho máximo de 50MB por arquivo."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="bg-dark-card border border-dark-border rounded-xl overflow-hidden transition-colors hover:border-dark-border/80"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          >
            <span className="font-medium text-white">{faq.question}</span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} 
            />
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-6 pb-5 pt-1 text-gray-400 text-sm leading-relaxed border-t border-dark-border/50">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
