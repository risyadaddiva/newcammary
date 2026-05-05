import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const statusFilePath = path.join(process.cwd(), 'status.json');

// Buat file default jika belum ada
if (!fs.existsSync(statusFilePath)) {
  fs.writeFileSync(statusFilePath, JSON.stringify({ isActive: true }));
}

export async function GET() {
  try {
    const data = fs.readFileSync(statusFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ isActive: true });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    fs.writeFileSync(statusFilePath, JSON.stringify({ isActive: body.isActive }));
    return NextResponse.json({ success: true, isActive: body.isActive });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
