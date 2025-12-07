
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const produtos = await prisma.produto.findMany();
  return NextResponse.json(produtos);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const novo = await prisma.produto.create({ data });
  return NextResponse.json(novo);
}
