import { supabase } from '../lib/supabase';

export const galleryService = {
  // Faz o upload da foto em base64 para o Supabase Storage e salva o registro na tabela
  saveToGallery: async (userId: string, base64Image: string, tool: string): Promise<string | null> => {
    try {
      // 1. Converter Base64 para Blob/Buffer
      const res = await fetch(base64Image);
      const blob = await res.blob();

      // 2. Criar um nome de arquivo único
      const fileName = `${userId}/${Date.now()}_${tool}.jpg`;

      // 3. Fazer o upload para o bucket 'galeria'
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('galeria')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 4. Pegar a URL pública da imagem recém enviada
      const { data: { publicUrl } } = supabase.storage
        .from('galeria')
        .getPublicUrl(fileName);

      // 5. Salvar na tabela galeria do banco de dados
      const { error: dbError } = await supabase
        .from('galeria')
        .insert({
          user_id: userId,
          url_foto: publicUrl,
          ferramenta: tool
        });

      if (dbError) throw dbError;

      return publicUrl;
    } catch (error) {
      console.error("Erro ao salvar na galeria:", error);
      return null;
    }
  },

  // Puxa o histórico de fotos do usuário
  getUserGallery: async (userId: string) => {
    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Erro ao carregar galeria:", error);
      return [];
    }

    return data;
  }
};
