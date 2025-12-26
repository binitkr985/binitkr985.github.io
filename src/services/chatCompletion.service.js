import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0,
    topP: 0.1,
    maxOutputTokens: 300,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HALLUCINATION",
      threshold: "BLOCK_ONLY_HIGH",
    },
  ],
});

export const generateChatResponse = async ({
  systemPrompt,
  userPrompt,
}) => {
  if (!systemPrompt || !userPrompt) {
    throw new Error("Prompts are required");
  }

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
${systemPrompt}

----------------
${userPrompt}
`,
            },
          ],
        },
      ],
    });

    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini chat generation error:", error);
    throw new Error("Failed to generate chat response");
  }
};
