import { Client } from "podcast-api";

let apiKey = null;
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  apiKey = process.env.LISTEN_NOTES_API_KEY;
}

const client = Client({
  apiKey,
});

export default client;
