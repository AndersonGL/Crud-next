import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const produto = await prisma.produto.findUnique({
    where: { id: Number(id) }
  });

  return NextResponse.json(produto);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const dados = await req.json();

  const produto = await prisma.produto.update({
    where: { id: Number(id) },
    data: dados
  });

  return NextResponse.json(produto);
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  await prisma.produto.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ message: "Produto removido" });
}
