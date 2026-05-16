import React, { useEffect, useState } from 'react';
import { Download, ImageIcon, Loader2, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { galleryService } from '../services/galleryService';
import { useNavigate } from 'react-router-dom';

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      const userPhotos = await galleryService.getUserGallery(session.user.id);
      setPhotos(userPhotos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url: string, tool: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `restaura4k_${tool}_${Date.now()}.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Minha <span className="text-transparent bg-clip-text bg-gold-gradient">Galeria</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Todas as fotos que você salvou em alta resolução ficam seguras aqui para baixar novamente de graça.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mb-4" />
            <p className="text-gray-400">Carregando suas memórias...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-800 rounded-3xl bg-[#111] p-10 text-center">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Nenhuma foto salva ainda</h3>
            <p className="text-gray-400 mb-8 max-w-md">
              Suas fotos processadas aparecerão aqui automaticamente após você gastar um crédito para salvá-las.
            </p>
            <button 
              onClick={() => navigate('/editor')}
              className="px-8 py-4 bg-gold-gradient text-black font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Restaurar minha primeira foto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative rounded-2xl overflow-hidden bg-[#111] border border-gray-800 hover:border-[#D4AF37] transition-all duration-300">
                <div className="aspect-[4/5] overflow-hidden bg-black flex items-center justify-center">
                  <img 
                    src={photo.url_foto} 
                    alt="Foto restaurada" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay with download button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <button 
                    onClick={() => handleDownload(photo.url_foto, photo.ferramenta)}
                    className="p-4 bg-gold-gradient text-black rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform"
                    title="Baixar Novamente (Grátis)"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-1 bg-[#D4AF37] text-black rounded-md uppercase tracking-wider">
                      {photo.ferramenta}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(photo.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
