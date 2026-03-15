import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Log the callback for debugging - in production you'd verify the signature and update your database
    console.log("ClickPay callback received:", JSON.stringify(body, null, 2));
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
  }
}
