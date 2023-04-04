import { NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { prisma } from "../../../../../../packages/db/index";
import { env } from "../../../env/server.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: NextApiResponse) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers as WebhookRequiredHeaders;

  const wh = new Webhook(env.CLERK_SIGNING_KEY as string);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let msg: any;
  try {
    console.log("Hitting webhook");
    msg = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({});
  }
  console.log(msg);

  if (msg.type === "user.deleted") {
    const { id } = msg.data;

    await prisma.user.delete({ where: { clerkId: id } });
  }

  if (msg.type === "user.updated") {
    const {
      email_addresses,
      birthday,
      first_name,
      last_name,
      last_sign_in_at,
      id,
      profile_image_url,
    } = msg.data;
    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses[0].email_address,
          emailVerified: email_addresses[0].verification.status,
          firstName: first_name,
          lastName: last_name,
          lastSignInAt: last_sign_in_at || "",
          profileImageURL: profile_image_url,
          birthday,
        },
      });
    } catch {
      await prisma?.user.create({
        data: {
          email: email_addresses[0].email_address,
          emailVerified: email_addresses[0].verification.status,
          firstName: first_name,
          lastName: last_name,
          clerkId: id,
          lastSignInAt: "",
          profileImageURL: profile_image_url,
          birthday,
        },
      });
    }
  }
  if (msg.type === "user.created") {
    const { email_addresses, first_name, last_name, id, profile_image_url } =
      msg.data;

    await prisma?.user.create({
      data: {
        email: email_addresses[0].email_address,
        emailVerified: email_addresses[0].verification.status,
        firstName: first_name,
        lastName: last_name,
        clerkId: id,
        profileImageURL: profile_image_url,
      },
    });
  }

  res.status(200).json({ status: "success" });
}
