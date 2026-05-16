import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, User, LogOut, Menu, X } from "lucide-react";
import PhotoBadge from "./PhotoBadge";
import { supabase } from "../lib/supabase";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border h-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-gold-start" fill="currentColor" />
          <span className="font-extrabold text-2xl tracking-tight text-gold-gradient uppercase">
            Restaura 4K
          </span>
        </Link>
        
        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
            Início
          </Link>
          {user && (
            <Link to="/galeria" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
              Minha Galeria
            </Link>
          )}
          <Link to="/planos" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
            Planos e Preços
          </Link>
          <a href="#" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
            Blog
          </a>
        </nav>

        <div className="flex items-center gap-5">
          <PhotoBadge />
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-dark-border bg-dark-card">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-300 font-medium truncate max-w-[120px]">
                  {user.email}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="hidden sm:flex p-2 rounded-xl border border-dark-border hover:bg-red-500/10 hover:border-red-500/30 transition-colors group"
                title="Sair"
              >
                <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link 
                to="/auth"
                className="py-2 px-4 rounded-xl border border-dark-border bg-transparent text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/editor"
                className="py-2 px-4 rounded-xl bg-gold-gradient text-sm font-bold shadow-lg"
              >
                Restaurar agora
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-dark-bg/95 backdrop-blur-xl border-b border-dark-border p-6 shadow-2xl flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-lg font-medium text-gray-300 hover:text-white">Início</Link>
            {user && (
              <Link to="/galeria" className="text-lg font-medium text-gray-300 hover:text-[#D4AF37]">Minha Galeria</Link>
            )}
            <Link to="/planos" className="text-lg font-medium text-gray-300 hover:text-white">Planos e Preços</Link>
          </nav>

          <hr className="border-dark-border" />

          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dark-border bg-dark-card">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300 font-medium truncate">{user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-dark-border text-red-400 hover:bg-red-500/10 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Sair da conta
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link 
                to="/auth"
                className="py-3 px-4 rounded-xl border border-dark-border text-center text-white font-medium hover:bg-white/5"
              >
                Entrar / Cadastrar
              </Link>
              <Link
                to="/editor"
                className="py-3 px-4 rounded-xl bg-gold-gradient text-center text-black font-bold shadow-lg"
              >
                Restaurar agora
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
