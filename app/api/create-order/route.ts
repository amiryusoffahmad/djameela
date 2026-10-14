import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, items } = body;
console.log("DATA ITEM DITERIMA DARI FRONTEND:", items);
    const wpUrl = "https://grey-woodcock-759599.hostingersite.com";
    const consumerKey = "ck_6df1389dc1ac8c2b05232fc4560a54544c7c6343";
    const consumerSecret = "cs_38622e517064278d8ce95897305004287ec231f8";

    // Format data tempahan untuk WooCommerce
    const orderData = {
      payment_method: "bacs",
      payment_method_title: "Pindahan Bank Manual (Direct Bank Transfer)",
      set_paid: false,
      billing: {
        first_name: formData.firstName || "Pelanggan",
        last_name: formData.lastName || "Syarikat",
        address_1: formData.address || "Alamat",
        city: formData.city || "Shah Alam",
        state: formData.state || "Selangor",
        postcode: formData.postcode || "40150",
        country: "MY",
        email: formData.email || "test@example.com",
        phone: formData.phone || "0123456789",
      },
      shipping: {
        first_name: formData.firstName || "Pelanggan",
        last_name: formData.lastName || "Syarikat",
        address_1: formData.address || "Alamat",
        city: formData.city || "Shah Alam",
        state: formData.state || "Selangor",
        postcode: formData.postcode || "40150",
        country: "MY",
      },
line_items: items.map((item: any) => {
  // Jika item menghantar databaseId atau id bernombor, guna terus
  const productId = parseInt(item.databaseId || item.id);
  
  return {
    product_id: isNaN(productId) ? 15 : productId, 
    quantity: parseInt(item.quantity) || 1,
  };
}),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Penghantaran Semenanjung",
          total: "8.00",
        },
      ],
    };

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    
    const response = await fetch(`${wpUrl}/wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
        "User-Agent": "NextJS-Headless-Storefront",
      },
      body: JSON.stringify(orderData),
    });

    const responseText = await response.text();

    // Semak jika respons adalah JSON sah
    try {
      const order = JSON.parse(responseText);
      
      if (!response.ok) {
        throw new Error(order.message || "Gagal mencipta pesanan di WooCommerce");
      }
      
      return NextResponse.json({ success: true, orderId: order.id });
    } catch (e) {
      console.error("WordPress RAW Response:", responseText);
      throw new Error(`WordPress memulangkan respons HTML (Status ${response.status}). Sila pastikan Product ID adalah sah di WooCommerce.`);
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}