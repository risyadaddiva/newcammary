import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MenuItem from "@/lib/models/MenuItem";

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const item = await MenuItem.findByIdAndUpdate(id, body, { new: true }).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(_req, { params }) {
  await dbConnect();
  const { id } = await params;
  const item = await MenuItem.findByIdAndDelete(id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
