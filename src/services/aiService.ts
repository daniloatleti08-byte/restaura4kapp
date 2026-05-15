import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const editImageWithGemini = async (file: File, prompt: string): Promise<string> => {
  try {
    const base64Data = await fileToBase64(file);
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: file.type || 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }
    
    // Fallback if no image returned
    throw new Error("A IA não retornou uma imagem editada.");
  } catch (err) {
    console.error("Erro ao processar imagem na IA:", err);
    throw err;
  }
};

export const aiService = {
  restoreImage: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      "High-end professional 4K restoration. Reconstruct and sharpen the subject's face to be crystal clear and realistic. Remove all blur, pixelation, noise, and compression artifacts. CRITICAL RULE: Preserve the exact facial structure, eye position, nose shape, and mouth 100%. Do NOT modify the person's identity. The result must be photorealistic, as if taken with a modern high-end camera. No plastic, painted, or smoothed-out illustration look."
    );
  },

  restoreImageAuto: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      "Analyze this image for: film grain, fading (sepia/yellowed), low resolution, stains, moisture damage, tears, and analog noise. Based on your analysis, apply the optimal set of corrections: 4K upscaling, professional colorization (if B&W), reconstruction of damaged areas, and color/contrast correction. CRITICAL RULE: Maintain 100% of the facial identity and structure. Do NOT invent or change facial features. Preserve the original likeness perfectly. The output must be photorealistic, sharp, and look like a professional modern photograph. No artificial smoothing or illustration-like effects."
    );
  },

  restoreImageHD: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      "Clean and enhance this photograph to clear HD quality. Sharpen all features and remove noise. CRITICAL: Maintain perfect identity and likeness 100%. No changes to facial structure. The result should be clean, sharp, and high-quality, looking like it was taken with a modern digital camera."
    );
  },

  colorizeImage: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      "Professionally colorize this black and white photo with vivid, realistic, and era-appropriate colors. Ensure skin tones are natural and lifelike. CRITICAL: Maintain the original facial identity and structure perfectly. Improve sharpness while keeping the photorealistic look. No plastic or painted appearance."
    );
  },

  cartoonizeImage: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      "Turn this photo into a beautiful Pixar style 3D cartoon artwork. Maintain the same composition, lighting, and general recognizability of the subject."
    );
  }
};
