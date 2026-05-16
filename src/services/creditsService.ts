import { supabase } from "../lib/supabase";

const CREDITS_KEY = "restaura4k_creditos_v2";

export const creditService = {
  getCredits: async (): Promise<number> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data, error } = await supabase
        .from('usuarios')
        .select('fotos_disponiveis')
        .eq('id', session.user.id)
        .single();
      
      // Se deu erro de "Não encontrado" (PGRST116), significa que é uma conta antiga 
      // que foi criada ANTES da gente configurar o banco de dados.
      if (error && error.code === 'PGRST116') {
        // Verifica se a Cakto deixou créditos pendentes para este e-mail
        const { data: pendente } = await supabase
          .from('creditos_pendentes')
          .select('fotos_disponiveis, plano')
          .eq('email', session.user.email)
          .single();

        const startFotos = pendente ? pendente.fotos_disponiveis : 0;
        const startPlano = pendente ? pendente.plano : 'gratuito';

        // Cria a conta do usuário na tabela nova e já aplica os créditos
        await supabase
          .from('usuarios')
          .insert({ 
             id: session.user.id, 
             email: session.user.email,
             fotos_disponiveis: startFotos,
             fotos_usadas: 0,
             plano: startPlano
          });
          
        if (pendente) {
          await supabase.from('creditos_pendentes').delete().eq('email', session.user.email);
        }
        return startFotos;
      } 
      
      if (!error && data) {
        // Se a conta existe, ainda vamos checar se tem algum crédito pendente
        // que chegou por webhook enquanto ele estava com a página fechada.
        const { data: pendente } = await supabase
          .from('creditos_pendentes')
          .select('fotos_disponiveis, plano')
          .eq('email', session.user.email)
          .single();
          
        if (pendente) {
          const novoSaldo = data.fotos_disponiveis + pendente.fotos_disponiveis;
          await supabase
            .from('usuarios')
            .update({ fotos_disponiveis: novoSaldo, plano: pendente.plano })
            .eq('id', session.user.id);
            
          await supabase.from('creditos_pendentes').delete().eq('email', session.user.email);
          return novoSaldo;
        }

        return data.fotos_disponiveis;
      }
    }

    // Fallback to localStorage for guest users
    const localCredits = localStorage.getItem(CREDITS_KEY);
    if (localCredits === null) {
      localStorage.setItem(CREDITS_KEY, "0");
      return 0;
    }
    return parseInt(localCredits, 10);
  },

  useCredit: async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data, error } = await supabase
        .from('usuarios')
        .select('fotos_disponiveis, fotos_usadas')
        .eq('id', session.user.id)
        .single();
      
      if (!error && data && data.fotos_disponiveis > 0) {
        const { error: updateError } = await supabase
          .from('usuarios')
          .update({ 
            fotos_disponiveis: data.fotos_disponiveis - 1,
            fotos_usadas: (data.fotos_usadas || 0) + 1
          })
          .eq('id', session.user.id);
        
        if (!updateError) {
          window.dispatchEvent(new Event('creditsUpdated'));
          return true;
        }
      }
      return false;
    }

    // Local fallback
    const current = await creditService.getCredits();
    if (current > 0) {
      localStorage.setItem(CREDITS_KEY, (current - 1).toString());
      window.dispatchEvent(new Event('creditsUpdated'));
      return true;
    }
    return false;
  },

  addCredits: async (amount: number): Promise<void> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data, error } = await supabase
        .from('usuarios')
        .select('fotos_disponiveis')
        .eq('id', session.user.id)
        .single();
      
      if (!error && data) {
        await supabase
          .from('usuarios')
          .update({ fotos_disponiveis: data.fotos_disponiveis + amount })
          .eq('id', session.user.id);
      }
    } else {
      const current = await creditService.getCredits();
      localStorage.setItem(CREDITS_KEY, (current + amount).toString());
    }
    window.dispatchEvent(new Event('creditsUpdated'));
  },

  subscribeToCredits: (callback: () => void): () => void => {
    window.addEventListener('creditsUpdated', callback);
    
    // Subscribe to realtime changes in Supabase
    const channel = supabase
      .channel('usuarios_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'usuarios' 
      }, () => {
        callback();
      })
      .subscribe();

    return () => {
      window.removeEventListener('creditsUpdated', callback);
      supabase.removeChannel(channel);
    };
  }
};
