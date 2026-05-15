import { UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export default function UploadArea({ onFileSelect }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Basic validation for images
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/") && file.size <= 50 * 1024 * 1024) {
        onFileSelect(file);
      } else {
        alert("Por favor, envie uma imagem válida de até 50MB.");
      }
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-200 p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-dark-card/50 ${
        isDragging ? "border-gold-start bg-gold-start/5" : "border-dark-border hover:border-gold-start/50"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept="image/jpeg, image/png, image/webp, image/heic"
        onChange={handleChange}
      />
      
      <div className="w-16 h-16 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center mb-6 shadow-sm">
        <UploadCloud className="w-8 h-8 text-gold-start" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        Arraste sua foto aqui ou clique para selecionar.
      </h3>
      <p className="text-gray-400 mb-6">
        JPG, PNG, WEBP, HEIC até 50MB
      </p>
      
      <div className="py-1 px-3 border border-dark-border rounded-full bg-dark-bg text-xs font-medium text-gray-400">
        Sem cadastro para testar
      </div>
    </div>
  );
}
