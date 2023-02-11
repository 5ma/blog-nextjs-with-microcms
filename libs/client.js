import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "kmkn-dev",
  apiKey: process.env.API_KEY,
});
