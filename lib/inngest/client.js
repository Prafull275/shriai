import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "shriai", // Unique app ID
  name: "SHRIAI",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});