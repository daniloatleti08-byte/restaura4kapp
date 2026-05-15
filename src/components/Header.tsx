import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, User, LogOut } from "lucide-react";
import PhotoBadge from "./PhotoBadge";
import { supabase } from "../lib/supabase";

export default function Header() {
  const [user, setUser] = useState<any>(null);

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
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
            Início
          </Link>
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
                className="p-2 rounded-xl border border-dark-border hover:bg-red-500/10 hover:border-red-500/30 transition-colors group"
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
        </div>
      </div>
    </header>
  );
}
