export const config = {
  apiKey: import.meta.env.VITE_REMOVE_BG_API_KEY || '',
  apiUrl: 'https://api.remove.bg/v1.0/removebg'
} as const;