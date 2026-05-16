import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Se a Cakto mandar um GET apenas para validar a URL (ping)
  if (req.method === 'GET') {
    return new Response('Webhook Restaura 4K Ativo e Operante!', { 
      headers: corsHeaders,
      status: 200 
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Lê o corpo da requisição como texto primeiro para evitar quebra se não for JSON
    const bodyText = await req.text();
    console.log("Corpo recebido da Cakto (Raw):", bodyText);

    let body = {};
    if (bodyText) {
      try {
        body = JSON.parse(bodyText);
      } catch (e) {
        console.log("Aviso: O payload recebido não é um JSON válido. Body:", bodyText);
      }
    }

    console.log("Webhook em formato JSON:", JSON.stringify(body, null, 2));

    // A Cakto envia os dados dentro de um array "data": [ { ... } ]
    const payload = Array.isArray(body?.data) ? body.data[0] : (body?.data || body);

    const email = payload?.customer?.email || payload?.cliente?.email || payload?.email;
    const valor = payload?.baseAmount || payload?.amount || payload?.offer?.price || payload?.valor || 0;
    const produto = payload?.offer?.name || payload?.product?.name || payload?.produto?.nome || payload?.produto || '';

    if (!email) {
      // Retorna 200 no teste vazio para a Cakto não achar que nossa API caiu
      return new Response(JSON.stringify({ message: 'Teste recebido, mas sem email na carga. Ignorando ação.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const valStr = String(valor).replace(',', '.');
    const prodStr = String(produto).toLowerCase();

    let fotosToAdd = 0;
    let planoName = '';

    // "Avulso 9,90" ou "9.9"
    if (valStr.includes('9.9') || prodStr.includes('avulso')) {
      fotosToAdd = 3;
      planoName = 'avulso';
    } else if (valStr.includes('19.9') || prodStr.includes('básico') || prodStr.includes('basico')) {
      fotosToAdd = 10;
      planoName = 'basico';
    } else if (valStr.includes('49.9') || prodStr.includes('premium')) {
      fotosToAdd = 30;
      planoName = 'premium';
    } else {
      return new Response(JSON.stringify({ message: 'Plano não reconhecido pelo valor ou nome, ignorando adição de créditos.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Chama a function do Supabase
    const { error } = await supabase.rpc('adicionar_fotos', {
      p_email: email,
      p_qtd: fotosToAdd,
      p_plano: planoName
    });

    if (error) {
      console.error("Erro banco de dados:", error);
      return new Response(JSON.stringify({ error: 'Erro db', details: error }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `${fotosToAdd} fotos adicionadas para ${email}.` 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Erro Critico Webhook:", error);
    return new Response(JSON.stringify({ error: 'Erro interno' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
