import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_API_KEY;


export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': '<YOUR_SITE_URL>',
    'X-Title': '<YOUR_SITE_NAME>',
  },
});
