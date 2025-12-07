


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const item = await prisma.produto.findUnique({
    where: { id: Number(params.id) }
  });

  return Response.json(item);
}

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const data = await req.json();

//   const att = await prisma.produto.update({
//     where: { id: Number(params.id) },
//     data
//   });

//   return Response.json(att);
// }


export async function PUT(req, context) {
  try {
    // Descompacta params (obrigatório no Next)
    const { id } = await context.params;
    const idNumber = Number(id);

    // Lê dados enviados pelo frontend
    const body = await req.json();
    const { nome, preco } = body;

    console.log("Atualizando:", { idNumber, nome, preco });

    if (!nome || !preco) {
      return Response.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id: idNumber },
      data: {
        nome,
        preco: Number(preco),
      },
    });

    return Response.json(produtoAtualizado);

  } catch (e) {
    console.error("ERRO UPDATE:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}



export async function DELETE(req, context) {
  try {
    // 👇 Descompacta params com await
    const { id } = await context.params;

    console.log("ID recebido no servidor:", id);

    if (!id) {
      return Response.json(
        { error: "ID não informado" },
        { status: 400 }
      );
    }

    // Garantir número
    const idNumber = Number(id);

    const produto = await prisma.produto.findUnique({
      where: { id: idNumber },
    });

    if (!produto) {
      return Response.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    await prisma.produto.delete({
      where: { id: idNumber },
    });

    return Response.json({ message: "Produto deletado" });
  } catch (e) {
    console.error("ERRO REAL DELETE:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
