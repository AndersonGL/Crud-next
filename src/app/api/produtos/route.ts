
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const produtos = await prisma.produto.findMany();
  return Response.json(produtos);
}

export async function POST(req: Request) {
  const data = await req.json();
  const novo = await prisma.produto.create({ data });
  return Response.json(novo);
}
