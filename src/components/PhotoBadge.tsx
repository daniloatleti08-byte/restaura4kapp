import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { creditService } from "../services/creditsService";

export default function PhotoBadge() {
  const [photos, setPhotos] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const balance = await creditService.getCredits();
      setPhotos(balance);
    };

    fetchCredits();

    const unsubscribe = creditService.subscribeToCredits(() => {
      fetchCredits();
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-start/10 border border-gold-start/30 text-gold-start shadow-sm">
      <Camera className="w-4 h-4" />
      <span className="text-xs font-bold">{photos} {photos === 1 ? 'Foto' : 'Fotos'}</span>
    </div>
  );
}
