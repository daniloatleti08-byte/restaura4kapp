import React from "react";
import { Gift, Heart, Sparkles, Moon, Sun } from "lucide-react";

interface SeasonalSuggestionProps {
  onApply: (theme: string) => void;
}

export default function SeasonalSuggestion({ onApply }: SeasonalSuggestionProps) {
  const currentMonth = new Date().getMonth(); // 0-indexed
  
  let suggestion = {
    title: "",
    description: "",
    icon: <Sparkles className="w-5 h-5" />,
    theme: ""
  };

  if (currentMonth === 11) { // December
    suggestion = {
      title: "Clima de Natal",
      description: "Deseja adicionar uma moldura dourada e efeito de neve?",
      icon: <Sparkles className="w-5 h-5 text-gold-start" />,
      theme: "natal"
    };
  } else if (currentMonth === 4) { // May
    suggestion = {
      title: "Dia das Mães",
      description: "Que tal uma moldura floral especial para presentear?",
      icon: <Heart className="w-5 h-5 text-red-400" />,
      theme: "maes"
    };
  } else if (currentMonth === 9) { // October
    suggestion = {
      title: "Dia das Crianças",
      description: "Adicione um toque lúdico e colorido à foto!",
      icon: <Sun className="w-5 h-5 text-yellow-400" />,
      theme: "criancas"
    };
  } else {
    // Default suggestion or Catholic theme
    suggestion = {
      title: "Toque Celestial",
      description: "Deseja adicionar uma iluminação suave e elementos religiosos?",
      icon: <Moon className="w-5 h-5 text-blue-300" />,
      theme: "catolico"
    };
  }

  return (
    <div className="mt-8 p-6 rounded-2xl bg-gold-start/10 border border-gold-start/30 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-gold-start/20">
          {suggestion.icon}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-1">{suggestion.title}</h4>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {suggestion.description}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onApply(suggestion.theme)}
              className="px-4 py-2 rounded-lg bg-gold-gradient text-black text-sm font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Sim, aplicar!
            </button>
            <button
              className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 text-sm hover:text-white transition-colors"
              onClick={(e) => {
                const target = e.currentTarget.closest('.animate-in') as HTMLElement;
                if (target) target.style.display = 'none';
              }}
            >
              Agora não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
