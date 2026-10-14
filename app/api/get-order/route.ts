import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("id");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID diperlukan" }, { status: 400 });
  }

  try {
    const wpUrl = "https://grey-woodcock-759599.hostingersite.com";
    const consumerKey = "ck_6df1389dc1ac8c2b05232fc4560a54544c7c6343";
    const consumerSecret = "cs_38622e517064278d8ce95897305004287ec231f8";

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    
    // Panggil WooCommerce REST API untuk order spesifik
    const response = await fetch(`${wpUrl}/wp-json/wc/v3/orders/${orderId}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        "User-Agent": "NextJS-Headless-Storefront",
      },
      cache: "no-store",
    });

    const responseText = await response.text();

    try {
      const order = JSON.parse(responseText);
      
      if (!response.ok) {
        return NextResponse.json({ error: order.message || "Pesanan tidak dijumpai" }, { status: response.status });
      }
      
      return NextResponse.json(order);
    } catch (parseError) {
      console.error("WordPress RAW HTML Response:", responseText);
      return NextResponse.json({ error: "WordPress memulangkan respons HTML bukan JSON." }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}