import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cart_amount, cart_description, cart_id, customer_name, customer_email, customer_phone, language } = body;

    if (!cart_amount || !cart_description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const payload: Record<string, unknown> = {
      profile_id: Number(process.env.CLICKPAY_PROFILE_ID),
      tran_type: "sale",
      tran_class: "ecom",
      cart_id: cart_id || `cart_${Date.now()}`,
      cart_description,
      cart_currency: "SAR",
      cart_amount: Number(cart_amount),
      return: `${baseUrl}/order/payment/result`,
      callback: `${baseUrl}/api/payment/callback`,
      hide_shipping: true,
      paypage_lang: language === "ar" ? "ar" : "en",
    };

    if (customer_name && customer_email && customer_phone) {
      payload.customer_details = {
        name: customer_name,
        email: customer_email,
        phone: customer_phone,
        street1: "N/A",
        city: "Riyadh",
        state: "Riyadh",
        country: "SA",
        zip: "12345",
        ip: "127.0.0.1",
      };
    }

    const response = await fetch(`${process.env.CLICKPAY_BASE_URL}/payment/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.CLICKPAY_SERVER_KEY || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.redirect_url) {
      return NextResponse.json({ redirect_url: data.redirect_url, tran_ref: data.tran_ref });
    }

    return NextResponse.json({ error: data.message || "Failed to create payment" }, { status: 400 });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
