import { useEffect, useState } from "react";
import { Camera, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { creditService } from "../services/creditsService";
import { supabase } from "../lib/supabase";

export default function PhotoBadge() {
  const [photos, setPhotos] = useState(0);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLogged(!!session?.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(!!session?.user);
    });

    const fetchCredits = async () => {
      const balance = await creditService.getCredits();
      setPhotos(balance);
    };

    fetchCredits();

    const unsubscribe = creditService.subscribeToCredits(() => {
      fetchCredits();
    });
    
    return () => {
      unsubscribe();
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col items-end gap-1">
      {photos === 0 ? (
        <Link to="/planos" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 shadow-sm hover:bg-red-500/20 transition-colors cursor-pointer">
          <Camera className="w-4 h-4" />
          <span className="text-xs font-bold">0 fotos</span>
        </Link>
      ) : (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-start/10 border border-gold-start/30 text-gold-start shadow-sm">
          <Camera className="w-4 h-4" />
          <span className="text-xs font-bold">{photos} {photos === 1 ? 'Foto' : 'Fotos'}</span>
        </div>
      )}
      
      {!isLogged && photos > 0 && (
        <span className="text-[10px] text-gray-400 flex items-center gap-1 absolute -bottom-4 right-0 md:static md:bottom-auto">
          <AlertCircle className="w-3 h-3 text-gold-start" />
          Crie conta para não perder
        </span>
      )}
    </div>
  );
}
