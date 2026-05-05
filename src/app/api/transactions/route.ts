import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import MenuItem from "@/models/MenuItem";

export async function GET() {
  await dbConnect();
  const txns = await Transaction.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(txns);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  for (const item of body.items) {
    await MenuItem.findByIdAndUpdate(item.menuItem, {
      $inc: { stock: -item.qty },
    });
  }

  const txn = await Transaction.create(body);
  return NextResponse.json(txn, { status: 201 });
}
