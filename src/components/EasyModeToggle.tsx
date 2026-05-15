import React from "react";
import { Settings, Sparkles } from "lucide-react";

interface EasyModeToggleProps {
  isEasyMode: boolean;
  onToggle: () => void;
}

export default function EasyModeToggle({ isEasyMode, onToggle }: EasyModeToggleProps) {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card border border-dark-border hover:border-gold-start/50 transition-all group"
      >
        {isEasyMode ? (
          <>
            <Settings className="w-4 h-4 text-gray-400 group-hover:text-white" />
            <span className="text-sm text-gray-400 group-hover:text-white">Mudar para versão completa</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-gold-start" />
            <span className="text-sm text-gold-start font-medium">Ativar Modo Fácil</span>
          </>
        )}
      </button>
    </div>
  );
}
