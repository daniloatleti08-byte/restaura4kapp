import { supabase } from "../lib/supabase";

const CREDITS_KEY = "restaura4k_creditos";

export const creditService = {
  getCredits: async (): Promise<number> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', session.user.id)
        .single();
      
      if (!error && data) {
        return data.credits;
      }
    }

    // Fallback to localStorage for guest users (or as a buffer)
    const localCredits = localStorage.getItem(CREDITS_KEY);
    const parsed = localCredits ? parseInt(localCredits, 10) : 0;
    
    // For testing/initial phase
    if (localCredits === null || parsed < 10) {
      localStorage.setItem(CREDITS_KEY, "10");
      return 10;
    }
    return parsed;
  },

  useCredit: async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', session.user.id)
        .single();
      
      if (!error && data && data.credits > 0) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ credits: data.credits - 1 })
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
        .from('profiles')
        .select('credits')
        .eq('id', session.user.id)
        .single();
      
      if (!error && data) {
        await supabase
          .from('profiles')
          .update({ credits: data.credits + amount })
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
      .channel('profile_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'profiles' 
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
