const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

type AITool = 'README Generator' | 'CV Assistant' | 'LinkedIn Post Generator' | 'Text Summarizer';

const promptTemplates: Record<AITool, (input: string) => string> = {
  'README Generator': (input) =>
    `Eres un generador de README profesional. Crea un README completo en español para un repositorio de GitHub usando esta información: ${input}. Incluye título, descripción, características, instalación, uso, licencia y contacto.`,`
  'CV Assistant': (input) =>
    `Eres un asistente de currículum profesional. Toma esta información de experiencia y habilidades: ${input}. Redacta un CV claro con secciones de resumen, experiencia, habilidades y logros, orientado a un perfil profesional moderno.`,`
  'LinkedIn Post Generator': (input) =>
    `Eres un generador de publicaciones para LinkedIn. Usa esta información: ${input}. Crea una publicación breve, atractiva y profesional en español, con un tono amistoso y llamado a la acción.`,`
  'Text Summarizer': (input) =>
    `Eres un resumidor de textos. Resume el siguiente contenido en español en 4-6 oraciones claras y concisas: ${input}.`,`
};

const allowedTools: AITool[] = [
  'README Generator',
  'CV Assistant',
  'LinkedIn Post Generator',
  'Text Summarizer',
];

export async function generateAIResponse(tool: string, input: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY no está configurada.');
  }

  if (!allowedTools.includes(tool as AITool)) {
    throw new Error(`Herramienta no válida: ${tool}`);
  }

  const prompt = promptTemplates[tool as AITool](input);

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente útil que responde con texto en español cuando se solicita.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 700,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}
