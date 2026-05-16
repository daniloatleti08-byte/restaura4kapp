import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Erro: Variaveis de ambiente nao encontradas.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checando usuario daniloatleti08@gmail.com...");
  
  const { data: usuario, error: err1 } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', 'daniloatleti08@gmail.com')
    .single();
    
  console.log("Tabela usuarios:", usuario || err1);

  const { data: pendentes, error: err2 } = await supabase
    .from('creditos_pendentes')
    .select('*');
    
  console.log("Tabela creditos_pendentes:", pendentes || err2);
}

check();
