/* eslint-disable @typescript-eslint/no-explicit-any */
import { stripe } from "@/lib/stripe";
import config from "@payload-config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import type Stripe from "stripe";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET! as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      {
        message: "Webhook Error",
        error: errorMessage,
      },
      {
        status: 400,
      }
    );
  }

  const permittedEvents: string[] = ["checkout.session.completed"];

  const payload = await getPayload({ config });

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;

          if (!data.metadata?.userId) {
            throw new Error("User ID is required in metadata");
          }

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            {
              expand: ["line_items.data.price.product"],
            }
          );

          if (
            !expandedSession.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            throw new Error("No line items found in session");
          }

          const lineItems = expandedSession.line_items.data as any;

          for (const item of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: item.price.product.metadata.id,
                name: item.price.product.name,
              },
            });
          }

          break;
        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: `Error processing webhook ${error}`,
        },
        {
          status: 500,
        }
      );
    }
  }

  return NextResponse.json(
    {
      message: "Webhook received and processed successfully",
    },
    {
      status: 200,
    }
  );
}
