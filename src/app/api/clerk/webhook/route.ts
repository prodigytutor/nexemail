/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from "~/server/db"

export async function POST(req: Request) {
  const { data } = await req.json();
  const emailAddress = data.email_addresses[0].email_address;
  const firstName = data.first_name;
  const lastName = data.last_name;
  const imageUrl = data.image_url;
  const id = data.id;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await db.user.upsert({
      where: { id },
      update: { emailAddress, firstName, lastName, imageUrl },
      create: { id, emailAddress, firstName, lastName, imageUrl },
  });

  return new Response('Webhook received', { status: 200 });
}