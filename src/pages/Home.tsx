import React from "react";
import { Link } from "react-router-dom";
import { Star, Wand2, Clock, Heart, Shield, ShieldCheck, Download, Lock, CheckCircle2, ChevronRight } from "lucide-react";
import ImageCompare from "../components/ImageCompare";
import FAQ from "../components/FAQ";

const examples = [
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop", text: "Restauração, 1952" },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop", text: "Danos Severos, 1985" },
  { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop", text: "Restauração, 1975" },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop", text: "Colorização, 1982" },
  { img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop", text: "Restauração, 1984" },
  { img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop", text: "Danos Severos, 1995" }
];

export default function Home() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-10 pt-8 sm:pt-16 pb-12 sm:pb-20 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center">
        <div className="text-left flex flex-col items-start">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1 text-gold-start">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-currentColor" />)}
            </div>
            <span className="text-sm font-semibold text-white ml-2">4,9 de 5 estrelas</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[72px] leading-[1.1] md:leading-none font-extrabold tracking-[-1px] md:tracking-[-2px] mb-6">
            Restaure.<br />Reviva.<br />
            <span className="text-gold-gradient">Reimagine.</span>
          </h1>
          <p className="text-base sm:text-[18px] text-text-muted mb-8 sm:mb-10 max-w-xl leading-relaxed">
            A memória da sua família, em três tempos. Estúdios cobram R$ 200 e levam dias. Aqui são 30 segundos. Restaure suas memórias a partir de R$ 9,90.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <Link 
              to="/editor"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-gold-gradient shadow-lg"
            >
              Restaurar foto agora
            </Link>
            <div className="flex flex-col justify-center text-xs text-text-muted tracking-tight font-medium">
              <span>Sem mensalidade obrigatória.</span>
              <span>Pronto em 30 segundos.</span>
            </div>
          </div>
        </div>

        <div className="w-full relative h-[260px] sm:h-[380px] lg:h-[480px] rounded-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <ImageCompare 
            beforeImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
            afterImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
            beforeClassName="grayscale contrast-125 brightness-80"
          />
        </div>
      </section>

      {/* Contrast Banner */}
      <section className="hidden border-y border-dark-border bg-dark-card/50 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
            Estúdios cobram R$ 50–200 e levam dias. <br className="hidden md:block" />
            <span className="text-gold-gradient font-bold">Aqui são 30 segundos.</span> Sem mensalidade obrigatória.
          </h2>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:h-[120px] md:py-0 border-t border-dark-border bg-dark-card">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-2 md:grid-cols-4 gap-y-8 items-center px-4 lg:px-10">
          <StatBox title="97%" text="Se emocionam" className="border-r border-dark-border md:border-r-dark-border" />
          <StatBox title="30s" text="De espera" className="border-r-0 md:border-r md:border-dark-border" />
          <StatBox title="92%" text="Presenteiam" className="border-r border-dark-border md:border-r-dark-border" />
          <StatBox title="30 Dias" text="Garantia Total" className="border-r-0" />
        </div>
      </section>

      {/* Before and After Grid */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">Antes e depois. Sem retoque.</h2>
            <p className="text-base sm:text-xl text-gray-400">Passe o dedo e veja a mágica acontecer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, i) => (
              <div key={i} className="flex flex-col gap-4">
                <ImageCompare 
                  beforeImage={example.img}
                  afterImage={example.img}
                  beforeClassName="grayscale contrast-125 sepia-[.3] blur-[1px] brightness-75"
                />
                <p className="text-sm font-medium text-gray-400 text-center uppercase tracking-widest">
                  {example.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             <div className="flex flex-col items-center">
               <div className="w-16 h-16 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center mb-6">
                 <span className="text-2xl font-bold text-gold-start">1</span>
               </div>
               <h3 className="text-xl font-bold mb-3">Envie a fotografia</h3>
               <p className="text-gray-400">Simples e rápido. Aceitamos JPG, PNG, WEBP e HEIC de até 50MB.</p>
             </div>
             <div className="flex flex-col items-center relative">
               <div className="hidden md:block absolute top-8 -left-[20%] w-[40%] h-px bg-gradient-to-r from-transparent via-gold-start/50 to-transparent"></div>
               <div className="w-16 h-16 rounded-2xl bg-dark-card border border-gold-start/50 flex items-center justify-center mb-6 relative z-10">
                 <span className="text-2xl font-bold text-gold-start">2</span>
               </div>
               <h3 className="text-xl font-bold mb-3">A IA trabalha</h3>
               <p className="text-gray-400">Reconstruímos áreas danificadas, devolvemos cores reais e removemos manchas.</p>
               <div className="hidden md:block absolute top-8 -right-[20%] w-[40%] h-px bg-gradient-to-r from-transparent via-gold-start/50 to-transparent"></div>
             </div>
             <div className="flex flex-col items-center">
               <div className="w-16 h-16 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center mb-6">
                 <span className="text-2xl font-bold text-gold-start">3</span>
               </div>
               <h3 className="text-xl font-bold mb-3">Baixe em 4K</h3>
               <p className="text-gray-400">Resultado incrível, pronto para imprimir e sem marca d'água no arquivo final.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 bg-dark-card/50 border-y border-dark-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-gold-start mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-12">Privacidade em primeiro lugar.</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <PrivacyItem icon={<Clock />} text="Apagada em 24 horas" />
            <PrivacyItem icon={<Lock />} text="Não treina nossa IA" />
            <PrivacyItem icon={<ShieldCheck />} text="Cifrada em trânsito com TLS 1.3" />
            <PrivacyItem icon={<CheckCircle2 />} text="Sem olhos humanos" />
            <PrivacyItem icon={<Download />} text="Você apaga quando quiser" />
            <PrivacyItem icon={<Shield />} text="LGPD integral" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">Quem restaurou, se emocionou.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Maria Clara" location="São Paulo, SP" year="Foto de 1978"
              text="Chorei muito quando vi minha avó com essas cores! Foi o melhor presente de aniversário que eu poderia ter dado para minha mãe."
            />
            <TestimonialCard 
              name="João Pedro" location="Curitiba, PR" year="Foto de 1955"
              text="Eu tinha apenas essa foto do meu casamento rasgada. Parecia que estava tudo perdido. Impressionante o nível de detalhes do rosto."
            />
            <TestimonialCard 
              name="Ana Beatriz" location="Belo Horizonte, MG" year="Foto de 1989"
              text="Sempre achei que esses sites cobravam caro e nunca entregavam. O plano de R$ 9,90 valeu cada centavo! Imprimi em um quadro gigante."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-dark-card/30">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <FAQ />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-gradient opacity-10 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            A foto que você ainda não restaurou está esperando.
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10">
            Escolha seu plano e comece agora.
          </p>
          <Link 
            to="/editor"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-xl bg-gold-gradient hover-gold-shadow transition-all group"
          >
            Restaurar foto agora
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatBox({ title, text, className = "" }: { title: string, text: string, className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center h-full justify-center px-2 ${className}`}>
      <span className="text-[20px] md:text-[24px] font-bold text-gold-start block mb-1">{title}</span>
      <span className="text-[10px] md:text-[12px] text-text-muted uppercase tracking-[0.5px] font-medium leading-tight">{text}</span>
    </div>
  );
}

function PrivacyItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gold-start w-5 h-5 shrink-0">
        {icon}
      </div>
      <span className="font-medium text-gray-300">{text}</span>
    </div>
  );
}

function TestimonialCard({ name, location, year, text }: { name: string, location: string, year: string, text: string }) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-gold-start/30 transition-colors">
      <div className="flex gap-1 text-gold-start mb-4">
        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-currentColor" />)}
      </div>
      <p className="text-gray-300 mb-6 italic">"{text}"</p>
      <div>
        <p className="font-bold text-white">{name}</p>
        <p className="text-xs text-gray-500 mt-1">{location} • {year}</p>
      </div>
    </div>
  );
}
