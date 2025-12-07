"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({ nome: "", preco: "" });

  // 🔥 Estado para erros
  const [errosModal, setErrosModal] = useState({
    nome: "",
    preco: "",
  });

  // ================== CARREGAR PRODUTOS ==================
  async function carregar() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  // ================== EDITAR ==================
  const editar = (p: any) => {
    setEditando(p.id);
    setForm({ nome: p.nome, preco: p.preco });
    setErrosModal({ nome: "", preco: "" });
    setModalOpen(true);
  };

  // ================== SALVAR EDIÇÃO ==================
  async function salvarEdicao() {
    let temp: any = {};

    if (!form.nome.trim()) temp.nome = "O nome é obrigatório.";
    if (!form.preco) temp.preco = "O preço é obrigatório.";

    if (Object.keys(temp).length > 0) {
      setErrosModal(temp);
      return;
    }

    setErrosModal({ nome: "", preco: "" });

    await fetch(`/api/produtos/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        preco: Number(form.preco),
      }),
    });

    setModalOpen(false);
    setEditando(null);
    carregar();
  }

  // ================== DELETAR ==================
  async function deletar(id: number) {
    if (!confirm("Deseja realmente excluir?")) return;

    await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    carregar();
  }

  // ================== CRIAR PRODUTO ==================
  async function criar() {
    let temp: any = {};

    if (!form.nome.trim()) temp.nome = "O nome é obrigatório.";
    if (!form.preco) temp.preco = "O preço é obrigatório.";

    if (Object.keys(temp).length > 0) {
      setErrosModal(temp);
      return;
    }

    setErrosModal({ nome: "", preco: "" });

    await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        preco: Number(form.preco),
      }),
    });

    setForm({ nome: "", preco: "" });
    carregar();
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛍️ Sistema de Produtos
      </h1>

      {/* FORM CADASTRO */}
      <div className="bg-white shadow-md p-5 rounded-lg mb-8">
        <h2 className="text-xl mb-4 font-semibold">Adicionar Produto</h2>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={form.nome}
            onChange={(e) => {
              setForm({ ...form, nome: e.target.value });
              setErrosModal({ ...errosModal, nome: "" });
            }}
            className="border p-2 w-full rounded mb-1"
            placeholder="Nome"
          />
          {errosModal.nome && (
            <p className="text-red-600 text-sm mb-3">{errosModal.nome}</p>
          )}

          <input
            type="number"
            value={form.preco}
            onChange={(e) => {
              setForm({ ...form, preco: e.target.value });
              setErrosModal({ ...errosModal, preco: "" });
            }}
            className="border p-2 w-full rounded mb-1"
            placeholder="Preço"
          />
          {errosModal.preco && (
            <p className="text-red-600 text-sm mb-3">{errosModal.preco}</p>
          )}

          <button
            onClick={criar}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* ================== TABELA ================== */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded min-w-[500px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Preço</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((p: any) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{p.nome}</td>
                <td className="p-3">R$ {Number(p.preco).toFixed(2)}</td>

                <td className="p-3">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => editar(p)}
                      className="bg-blue-600 text-white px-3 py-1 w-24 rounded hover:bg-blue-700 transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deletar(p.id)}
                      className="btn-delete bg-red-600 text-white px-3 py-1 w-24 rounded hover:bg-red-700 transition"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================== MODAL ================== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-xl w-96 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

            <input
              type="text"
              value={form.nome}
              onChange={(e) => {
                setForm({ ...form, nome: e.target.value });
                setErrosModal({ ...errosModal, nome: "" });
              }}
              className="border p-2 w-full rounded mb-1"
              placeholder="Nome"
            />
            {errosModal.nome && (
              <p className="text-red-600 text-sm mb-2">{errosModal.nome}</p>
            )}

            <input
              type="number"
              value={form.preco}
              onChange={(e) => {
                setForm({ ...form, preco: e.target.value });
                setErrosModal({ ...errosModal, preco: "" });
              }}
              className="border p-2 w-full rounded mb-1"
              placeholder="Preço"
            />
            {errosModal.preco && (
              <p className="text-red-600 text-sm mb-2">{errosModal.preco}</p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={salvarEdicao}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
