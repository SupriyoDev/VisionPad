import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, WebhookEventType } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle";
import { usersTable } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("PLease add clerk webhook secret");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_sign = headerPayload.get("svix-signature");

  if (!svix_id || !svix_sign || !svix_timestamp) {
    return new Response("error occurred", {
      status: 400,
    });
  }
  //get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  //create a new svix instance
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  //verify the payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_sign,
      "svix-timestamp": svix_timestamp,
    }) as WebhookEvent;
  } catch (error) {
    console.error("error verifying webhook", error);
    return new Response("error when verify webhook", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const {
      first_name,
      last_name,
      image_url,
      email_addresses,
      id,
      external_accounts,
    } = evt.data;
    if (!id || !email_addresses[0].email_address) {
      return new Response("Error occurred -- missing data", { status: 400 });
    }

    //user add to my own database

    const new_user = await db.insert(usersTable).values({
      email: email_addresses[0].email_address,
      image: external_accounts[0].image_url || image_url,
      name: `${first_name} ${last_name}`,
      id,
    });
  }

  return new Response("User created Successfully!", { status: 200 });
}
