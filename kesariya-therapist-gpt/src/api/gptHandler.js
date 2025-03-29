import { Configuration, OpenAIApi } from 'openai';
import hinduPrompt from '../../prompts/hinduPrompt';
import sikhPrompt from '../../prompts/sikhPrompt';
import christianPrompt from '../../prompts/christianPrompt';
import islamPrompt from '../../prompts/islamPrompt';

const promptMap = {
  hindu: hinduPrompt,
  sikh: sikhPrompt,
  christian: christianPrompt,
  islam: islamPrompt,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, faith = 'hindu' } = req.body;

  console.log("✅ GPT handler triggered");
  console.log("📨 Prompt received:", prompt);
  console.log("🛐 Faith:", faith);
  console.log("🔐 API Key exists:", !!process.env.OPENAI_API_KEY);

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const basePrompt = promptMap[faith.toLowerCase()] || hinduPrompt;
  const fullPrompt = `${basePrompt}\nUser: ${prompt}`;

  try {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: fullPrompt }],
      temperature: 0.7,
    });

    const message = response.data.choices[0].message.content.trim();
    console.log("🤖 GPT replied:", message);

    res.status(200).json({ reply: message });
  } catch (err) {
    console.error("❌ GPT error:", err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch GPT response' });
  }
}

