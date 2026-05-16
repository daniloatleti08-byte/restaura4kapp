import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Coins, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlansModal({ isOpen, onClose }: PlansModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-dark-card border border-gold-start/50 rounded-2xl p-6 max-w-sm w-full relative shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold glow in top */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-start to-transparent opacity-50" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mt-4">
            <div className="w-16 h-16 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center mb-4">
              <Coins className="w-8 h-8 text-gold-start" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Você usou todas as suas fotos disponíveis.</h3>
            <p className="text-gray-400 text-sm mb-6">
              Escolha um plano para continuar restaurando suas memórias.
            </p>

            <div className="w-full flex flex-col gap-3">
              <Link
                to="/planos"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-gold-gradient font-medium text-center flex justify-center items-center gap-2 text-black hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-4 h-4" />
                Ver Planos
              </Link>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl border border-dark-border text-white font-medium hover:bg-white/5 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
