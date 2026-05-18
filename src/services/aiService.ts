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
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
        temperature: 0.1,
      },
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
      `You are a professional photo restoration tool. Your ONLY task is image technical enhancement — NOT creative reimagination.

STRICT RULES (NEVER VIOLATE):
- DO NOT change any person's face, facial features, identity, or likeness in any way.
- DO NOT alter eye shape, nose, mouth, skin tone, hair, or any facial structure.
- DO NOT add, remove, or move any element in the image.
- DO NOT change colors, clothing, or background elements.
- DO NOT apply any artistic, painted, or illustrative effect.

ALLOWED corrections ONLY:
- Increase sharpness and clarity (deblur)
- Remove digital noise, grain, and compression artifacts (JPEG blocks)
- Enhance fine detail (pores, texture, fabric threads) that was blurred
- Improve overall brightness/contrast only if the image is clearly underexposed or overexposed
- Upscale resolution to 4K quality

Output: return the exact same photo with only the above technical corrections applied. The output must be photorealistic and indistinguishable from the original scene in terms of identity and content.`
    );
  },

  restoreImageAuto: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      `You are a professional photo restoration tool. Your ONLY task is image technical enhancement — NOT creative reimagination.

STRICT RULES (NEVER VIOLATE):
- DO NOT change any person's face, facial features, identity, or likeness in any way.
- DO NOT alter eye shape, nose, mouth, skin tone, hair, or any facial structure.
- DO NOT add, remove, or move any element in the image.
- DO NOT apply any artistic, painted, or illustrative effect.

ALLOWED corrections ONLY (auto-detect what's needed):
- If blurry or low-resolution: increase sharpness and upscale to 4K
- If black & white: add natural, realistic colors with authentic skin tones
- If faded or yellowed: restore natural color balance
- Remove digital noise, grain, film grain, stains, tears, and compression artifacts
- Improve brightness/contrast only if clearly needed

Output: return the exact same photo with only the necessary technical corrections applied. The people, faces, and composition must be 100% identical to the original.`
    );
  },

  restoreImageHD: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      `You are a professional photo enhancement tool. Your ONLY task is image technical enhancement — NOT creative reimagination.

STRICT RULES (NEVER VIOLATE):
- DO NOT change any person's face, facial features, identity, or likeness in any way.
- DO NOT alter eye shape, nose, mouth, skin tone, hair, or any facial structure.
- DO NOT add, remove, or move any element in the image.
- DO NOT apply any artistic or illustrative effect.

ALLOWED corrections ONLY:
- Increase sharpness and clarity
- Remove digital noise and compression artifacts
- Enhance fine detail
- Upscale to HD quality

Output: return the exact same photo with only sharpness and clarity improvements. Every person must look exactly the same as in the original.`
    );
  },

  colorizeImage: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      `You are a professional photo colorization tool. Your ONLY task is adding realistic color to a black and white photograph.

STRICT RULES (NEVER VIOLATE):
- DO NOT change any person's face, facial features, identity, or likeness in any way.
- DO NOT alter facial structure, expressions, hair style, or body proportions.
- DO NOT change the composition, framing, or any object in the scene.
- DO NOT apply any artistic or illustrative effect.

ALLOWED corrections ONLY:
- Add natural, era-appropriate, realistic colors to the entire image
- Use authentic skin tones that match the subject's apparent ethnicity
- Color clothing, backgrounds, and objects with historically accurate or contextually appropriate colors
- Maintain correct light and shadow logic when adding colors

Output: return the same photo with beautiful, realistic colors added. The faces and identities must be 100% preserved exactly as in the original.`
    );
  },

  cartoonizeImage: async (imageFile: File): Promise<string> => {
    return editImageWithGemini(
      imageFile,
      "Transform this photo into a beautiful Pixar-style 3D animated movie artwork. Use vibrant colors, soft cell-shading, and exaggerated but recognizable facial features in the style of modern Pixar animations. Maintain the same composition and the general likeness of the subjects."
    );
  },
};
