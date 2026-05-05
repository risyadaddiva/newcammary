import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";

export async function GET() {
  await dbConnect();
  const items = await MenuItem.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const item = await MenuItem.create(body);
  return NextResponse.json(item, { status: 201 });
}
