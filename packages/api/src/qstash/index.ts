import { Client } from "@upstash/qstash";

const c = new Client({
  token: process.env.QSTASH_TOKEN as string,
});

const handler = async (body: any) => {
  const res = await c.publishJSON({
    url: process.env.QSTASH_URL,
    body,
  });
  return res;
};

export default handler;
