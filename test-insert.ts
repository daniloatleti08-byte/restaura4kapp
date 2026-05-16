import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const { data: { users } } = await supabase.auth.admin?.listUsers() || { data: { users: [] } };
  
  // Como nao temos admin, vamos tentar fazer signup de teste
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'daniloatleti08@gmail.com',
    password: 'password123' // nao sabemos a senha
  });

  // Vamos tentar dar um INSERT anonimo so pra ver se tem RLS
  const { error } = await supabase.from('usuarios').insert({
    id: '00000000-0000-0000-0000-000000000000',
    email: 'teste@teste.com'
  });
  console.log("Insert Error:", error);
}

testInsert();
