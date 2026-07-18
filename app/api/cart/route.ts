import { NextResponse } from "next/server";

// Even if it's just a placeholder, it must explicitly export a standard HTTP method
export async function GET() {
  return NextResponse.json({ message: "Cart API active" });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, data: body });
}