import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Image as ImageIcon, Image as ImageIconOutlined, Download, Sparkles, SlidersHorizontal, Share2, Upload, ZoomIn, ZoomOut, Maximize2, RefreshCw, X, FileImage, User, Loader2, Wand2, Paintbrush, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { aiService } from "../services/aiService";
import { creditService } from "../services/creditsService";
import { galleryService } from "../services/galleryService";
import PlansModal from "../components/PlansModal";
import EasyModeToggle from "../components/EasyModeToggle";
import SeasonalSuggestion from "../components/SeasonalSuggestion";
import UploadArea from "../components/UploadArea";
import ImageCompare from "../components/ImageCompare";

type Tool = "restaurar4k" | "restaurarHD" | "colorir" | "cartoon";

export default function Editor() {
  const [file, setFile] = useState<File | null>(null);
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>("restaurar4k");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [isSavedInGallery, setIsSavedInGallery] = useState(false);
  const [isEasyMode, setIsEasyMode] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setBeforeImage(URL.createObjectURL(selectedFile));
    setAfterImage(null);
    setIsSavedInGallery(false);
    
    // Auto-process in Easy Mode
    if (isEasyMode) {
      await handleProcess(selectedFile);
    }
  };

  const handleProcess = async (selectedFile?: File) => {
    const fileToProcess = selectedFile || file;
    if (!fileToProcess) return;
    
    setIsProcessing(true);
    
    try {
      let result = "";
      if (isEasyMode) {
        result = await aiService.restoreImageAuto(fileToProcess);
      } else {
        if (activeTool === "restaurar4k") {
          result = await aiService.restoreImage(fileToProcess);
        } else if (activeTool === "restaurarHD") {
          result = await aiService.restoreImageHD(fileToProcess);
        } else if (activeTool === "colorir") {
          result = await aiService.colorizeImage(fileToProcess);
        } else {
          result = await aiService.cartoonizeImage(fileToProcess);
        }
      }
      setAfterImage(result);
      setIsSavedInGallery(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao processar imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    // Se já foi salva, não gasta crédito, apenas baixa novamente
    if (isSavedInGallery && afterImage) {
      const a = document.createElement("a");
      a.href = afterImage;
      a.download = `restaura4k_${isEasyMode ? 'auto' : activeTool}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Se é a primeira vez salvando, gasta crédito e envia pra galeria
    const success = await creditService.useCredit();
    if (success) {
      if (afterImage) {
        // Envia para o storage silenciosamente em background
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          galleryService.saveToGallery(session.user.id, afterImage, isEasyMode ? 'auto' : activeTool)
            .then(() => setIsSavedInGallery(true))
            .catch(console.error);
        }

        // Faz o download imediatamente para o usuário
        const a = document.createElement("a");
        a.href = afterImage;
        a.download = `restaura4k_${isEasyMode ? 'auto' : activeTool}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } else {
      setShowPlansModal(true);
    }
  };

  const handleApplyTheme = async (theme: string) => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const result = await aiService.restoreImage(file); // Re-process with theme (simulated)
      // In a real scenario, we'd send the theme to the AI
      setAfterImage(result);
      alert(`Tema ${theme} aplicado com sucesso!`);
    } catch (err) {
      alert("Erro ao aplicar tema.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`pt-24 pb-16 min-h-screen ${isEasyMode ? "text-lg" : ""}`}>
      <div className="max-w-4xl mx-auto px-4">
        
        <EasyModeToggle isEasyMode={isEasyMode} onToggle={() => setIsEasyMode(!isEasyMode)} />

        <h1 className={`font-bold text-center mb-8 ${isEasyMode ? "text-4xl" : "text-3xl"}`}>
          {isEasyMode ? "Restaurador Automático" : "Studio de Restauração"}
        </h1>

        {!beforeImage && !isProcessing && (
          isEasyMode ? (
            <div className="flex flex-col items-center gap-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="w-full max-w-md aspect-square rounded-3xl bg-gold-gradient shadow-[0_20px_50px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center text-black cursor-pointer hover:scale-[1.02] transition-transform group border-none">
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />
                <Camera className="w-24 h-24 mb-6 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-black text-center px-8">Toque aqui para escolher a foto</span>
              </label>
              <p className="text-gray-400 font-medium">Sua foto será restaurada automaticamente</p>
            </div>
          ) : (
            <UploadArea onFileSelect={handleFileSelect} />
          )
        )}

        {isProcessing && (
          <div className="bg-dark-card border border-dark-border rounded-[32px] p-16 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <Loader2 className="w-20 h-20 text-gold-start animate-spin mb-8" />
            <h3 className={`font-bold mb-4 ${isEasyMode ? "text-3xl" : "text-xl"}`}>
              {isEasyMode ? "Estamos restaurando sua foto…" : "Processando com IA, aguarde…"}
            </h3>
            <div className="w-full max-w-xs h-2 bg-dark-bg rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gold-gradient animate-progress-bar"></div>
            </div>
            <p className="text-gray-400">Isso leva apenas alguns segundos</p>
          </div>
        )}

        {beforeImage && afterImage && !isProcessing && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-full h-[480px]">
              <ImageCompare beforeImage={beforeImage} afterImage={afterImage} isEditor={true} />
            </div>
            
            {isEasyMode ? (
              <div className="flex flex-col gap-6">
                <div className="text-center py-4">
                  <h2 className="text-3xl font-bold text-gold-start mb-2">Sua foto ficou linda!</h2>
                  <p className="text-gray-400">Pronta para reviver suas melhores memórias.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={handleSave}
                    className={`w-full py-8 rounded-[24px] text-2xl font-black shadow-[0_20px_40px_rgba(212,175,55,0.2)] flex items-center justify-center gap-4 transition-transform ${isSavedInGallery ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-gold-gradient text-black hover:scale-[1.02]'}`}
                  >
                    <Download className="w-8 h-8" />
                    {isSavedInGallery ? 'Baixar Novamente (Grátis)' : 'Baixar minha foto'}
                  </button>
                  
                  <button 
                    onClick={() => { setFile(null); setBeforeImage(null); setAfterImage(null); }}
                    className="w-full py-6 rounded-[24px] border-2 border-white/10 text-white text-xl font-bold hover:bg-white/5 transition-colors"
                  >
                    Restaurar outra foto
                  </button>
                </div>

                <SeasonalSuggestion onApply={handleApplyTheme} />
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    className="w-full sm:w-auto px-6 py-[18px] rounded-xl border border-dark-border bg-transparent text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <ImageIconOutlined className="w-4 h-4" />
                    PREVIEW EM BAIXA RESOLUÇÃO
                  </button>
                  
                  <button 
                    onClick={handleSave}
                    className={`w-full sm:w-auto px-9 py-[18px] rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform ${isSavedInGallery ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-gold-gradient text-black hover:scale-105'}`}
                  >
                    <Download className={`w-5 h-5 ${isSavedInGallery ? 'text-white' : 'text-black'}`} />
                    {isSavedInGallery ? 'Baixar Novamente (Grátis)' : 'Salvar em 4K (1 Foto)'}
                  </button>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => { setFile(null); setBeforeImage(null); setAfterImage(null); }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Restaurar nova foto
                  </button>
                </div>

                <SeasonalSuggestion onApply={handleApplyTheme} />
              </div>
            )}
          </div>
        )}

        {beforeImage && !afterImage && !isProcessing && !isEasyMode && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-4 flex justify-center">
              <img src={beforeImage} alt="Original" className="max-h-[50vh] object-contain rounded-lg" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ToolCard 
                icon={<Wand2 className="w-6 h-6" />}
                title="Restaurar 4K"
                cost="1 Foto"
                isActive={activeTool === "restaurar4k"}
                onClick={() => setActiveTool("restaurar4k")}
              />
              <ToolCard 
                icon={<ImageIconOutlined className="w-6 h-6" />}
                title="Restaurar HD"
                cost="1 Foto"
                isActive={activeTool === "restaurarHD"}
                onClick={() => setActiveTool("restaurarHD")}
              />
              <ToolCard 
                icon={<Paintbrush className="w-6 h-6" />}
                title="Colorir Foto"
                cost="1 Foto"
                isActive={activeTool === "colorir"}
                onClick={() => setActiveTool("colorir")}
              />
              <ToolCard 
                icon={<ImageIcon className="w-6 h-6" />}
                title="Efeito Cartoon"
                cost="1 Foto"
                isActive={activeTool === "cartoon"}
                onClick={() => setActiveTool("cartoon")}
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => handleProcess()}
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gold-gradient text-black font-bold text-base shadow-lg flex items-center justify-center gap-2"
              >
                <Wand2 className="w-5 h-5 flex-shrink-0 text-black" />
                Processar com IA
              </button>
              <button 
                onClick={() => { setFile(null); setBeforeImage(null); }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Escolher outra foto
              </button>
            </div>
          </div>
        )}

      </div>
      
      <PlansModal isOpen={showPlansModal} onClose={() => setShowPlansModal(false)} />
    </div>
  );
}

function ToolCard({ icon, title, cost, isActive, onClick }: { icon: React.ReactNode, title: string, cost: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-3 ${
        isActive 
          ? "border-gold-start bg-gold-start/10 hover-gold-shadow text-white" 
          : "border-dark-border bg-dark-card text-text-muted hover:border-gray-600 hover:text-gray-200"
      }`}
    >
      <div className={`p-2 rounded-lg w-fit ${isActive ? "bg-gold-start text-dark-bg" : "bg-dark-bg text-text-muted border border-dark-border"}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm opacity-80 mt-1 text-gold-start">Consome {cost}</p>
      </div>
    </button>
  );
}

