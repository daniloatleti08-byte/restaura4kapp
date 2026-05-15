import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold-start" fill="currentColor" />
              <span className="font-bold text-lg tracking-tight text-white">
                Restaura 4K
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Restaurando memórias desde 2024. Restaure · Reviva · Reimagine
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/planos" className="hover:text-gold-start transition-colors">Planos e preços</Link></li>
              <li><Link to="/editor" className="hover:text-gold-start transition-colors">Restauração</Link></li>
              <li><Link to="/editor" className="hover:text-gold-start transition-colors">Colorização</Link></li>
              <li><Link to="/editor" className="hover:text-gold-start transition-colors">Começar agora</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Serviços</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/editor" className="hover:text-gold-start transition-colors">Restaurar fotos antigas</Link></li>
              <li><Link to="/editor" className="hover:text-gold-start transition-colors">Colorir fotos antigas</Link></li>
              <li><Link to="/editor" className="hover:text-gold-start transition-colors">Melhorar qualidade</Link></li>
              <li><Link to="/editor" className="hover:text-gold-start transition-colors">Colorir preto e branco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-gold-start transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gold-start transition-colors">Guias</a></li>
              <li><a href="#" className="hover:text-gold-start transition-colors">Perguntas frequentes</a></li>
              <li><a href="#" className="hover:text-gold-start transition-colors">Comparativos</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>© 2024 Restaura 4K.</span>
            <span>CNPJ: 00.000.000/0001-00</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> SSL 256-bit
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
