import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export async function POST(req: NextRequest) {

    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(
        payload, 
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET! 
      );
  
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':

        const paymentIntentSucceeded = event.data.object;
        console.log({paymentIntentSucceeded});
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
}

    catch (err) {
        return NextResponse.json({ status: "Failed", err});
      
    }
  


    return NextResponse.json({
        status: "success",
    });
}

