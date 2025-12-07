import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET /api/produtos/[id]
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const produto = await prisma.produto.findUnique({
    where: { id: Number(id) }
  });

  return NextResponse.json(produto);
}

// PUT /api/produtos/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const dados = await req.json();

  const produto = await prisma.produto.update({
    where: { id: Number(id) },
    data: dados
  });

  return NextResponse.json(produto);
}

// DELETE /api/produtos/[id]
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await prisma.produto.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ message: "Produto removido" });
}


