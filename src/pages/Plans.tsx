import { Check } from "lucide-react";
import FAQ from "../components/FAQ";

export default function Plans() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Simples e transparente. <br className="hidden sm:block" />
            <span className="text-gold-gradient">Pague só o que usar.</span>
          </h1>
          <p className="text-xl text-gray-400">
            Escolha seu plano e comece agora. Restaure suas memórias a partir de R$ 9,90.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          
          {/* Plano Avulso */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col relative transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Plano Avulso</h3>
              <p className="text-gray-400 min-h-[48px]">Ideal para quem quer restaurar algumas fotos sem compromisso. Baixe 3 fotos em alta qualidade, sem marca d'água, e sem prazo de validade.</p>
            </div>
            
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">R$ 9,90</span>
              <span className="text-gray-400">/ único</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <FeatureItem text="3 fotos para baixar em alta qualidade" />
              <FeatureItem text="Fotos não expiram" />
              <FeatureItem text="Qualidade 4K" />
              <FeatureItem text="Sem marca d'água" />
              <FeatureItem text="Suporte prioritário" />
            </ul>

            <a 
              href="https://pay.cakto.com.br/3a6adds" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl border border-dark-border bg-dark-bg text-white font-medium text-center hover:bg-white/5 transition-colors"
            >
              Comprar agora
            </a>
          </div>

          {/* Plano Básico */}
          <div className="bg-dark-card border border-gold-start/50 rounded-2xl p-8 flex flex-col relative transition-transform hover:-translate-y-1 hover-gold-shadow z-10 scale-100 md:scale-105 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-dark-bg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Mais Popular
            </div>
            
            <div className="mb-6 mt-2">
              <h3 className="text-2xl font-bold text-white mb-2">Plano Básico</h3>
              <p className="text-gray-400 min-h-[48px]">Para quem restaura com frequência. Baixe até 10 fotos por mês em 4K Ultra sem marca d'água.</p>
            </div>
            
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gold-start">R$ 19,90</span>
              <span className="text-gray-400">/ mês</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <FeatureItem text="10 fotos todo mês" />
              <FeatureItem text="Qualidade 4K Ultra" />
              <FeatureItem text="Sem marca d'água" />
              <FeatureItem text="Processamento prioritário" />
              <FeatureItem text="Suporte em até 24h" />
            </ul>

            <a 
              href="https://pay.cakto.com.br/k9jcthi_874913" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gold-gradient text-black font-bold text-center hover:opacity-90 transition-opacity"
            >
              Assinar Básico
            </a>
          </div>

          {/* Plano Premium */}
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 flex flex-col relative transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Plano Premium</h3>
              <p className="text-gray-400 min-h-[48px]">Para uso profissional. Baixe até 30 fotos por mês com processamento prioritário e qualidade máxima.</p>
            </div>
            
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">R$ 49,90</span>
              <span className="text-gray-400">/ mês</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <FeatureItem text="30 fotos todo mês" />
              <FeatureItem text="Qualidade 4K Ultra máxima" />
              <FeatureItem text="Sem marca d'água" />
              <FeatureItem text="Processamento imediato sem fila" />
              <FeatureItem text="Suporte VIP em até 12h" />
            </ul>

            <a 
              href="https://pay.cakto.com.br/8usrb65" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl border border-dark-border bg-dark-bg text-white font-medium text-center hover:bg-white/5 transition-colors"
            >
              Assinar Premium
            </a>
          </div>

        </div>

        {/* WhatsApp Custom Section */}
        <div className="max-w-5xl mx-auto mb-20 p-10 rounded-[32px] bg-[#1C1C1C] border border-gold-start/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-start/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-gold-start/10 transition-colors"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-3">Prefere que a gente faça para você?</h3>
              <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                Nossa equipe especializada restaura sua foto com cuidado artesanal. Entre em contato pelo WhatsApp e receba um orçamento personalizado.
              </p>
            </div>
            <a 
              href="https://wa.me/5500000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(37,211,102,0.3)]"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar com especialista no WhatsApp
            </a>
          </div>
        </div>

        <div className="text-center mb-20">
          <p className="text-gray-400 mb-6">Pix, cartão ou Apple Pay. Garantia de 30 dias.</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            {/* Payment methods and trust badges simulated via text/badges */}
            <span className="text-sm font-semibold flex items-center gap-1"><Check className="w-4 h-4 text-green-500"/> Garantia 30 dias</span>
            <span className="text-sm font-semibold flex items-center gap-1"><Check className="w-4 h-4 text-green-500"/> SSL 256-bit</span>
            <span className="text-sm font-semibold flex items-center gap-1"><Check className="w-4 h-4 text-green-500"/> PCI Compliant</span>
            <span className="text-sm font-semibold flex items-center gap-1 text-gold-start">★ 4.9 de 5</span>
            <div className="flex items-center gap-2 ml-4">
              <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold">PIX</span>
              <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold">VISA</span>
              <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold">MASTER</span>
              <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold">APPLE PAY</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Dúvidas Frequentes</h2>
          <FAQ />
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-5 h-5 text-gold-start shrink-0 mt-0.5" />
      <span className="text-gray-300 text-sm">{text}</span>
    </li>
  );
}
