import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "API mode scaffold. Switch API_MODE to true and connect Prisma/SQLite.",
  });
}

export async function POST() {
  return NextResponse.json({ message: "POST endpoint scaffold." }, { status: 201 });
}
