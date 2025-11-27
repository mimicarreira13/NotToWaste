import React, { useState } from "react";
import type { AdicionarForm } from "../BotaoAdicionar";

export default function ModalStock({ onClose, onAdded }: AdicionarForm) {
  const [form, setForm] = useState({
    nome: "",
    marca: "",
    quantidade: "",
    unidade: "",
    dataAbertura: "",
    dataValidade: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // valida, envia ao backend, etc.
    onAdded?.(form);
    onClose();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input 
        name="nome" 
        value={form.nome} 
        onChange={handleChange} 
        placeholder="Nome" 
        className="w-full px-3 py-2 border rounded" 
      />
      <input 
        name="marca" 
        value={form.marca} 
        onChange={handleChange} 
        placeholder="Marca" 
        className="w-full px-3 py-2 border rounded" 
      />
    <div className="flex gap-2">
      <input
        name="quantidade"
        value={form.quantidade}
        onChange={handleChange}
        placeholder="Quantidade"
        className="flex-1 px-3 py-2 border rounded"
      />
      <input
        name="unidade"
        value={form.unidade}
        onChange={handleChange}
        placeholder="Unidade"
        className="w-32 px-3 py-2 border rounded"
      />
      <input
        type="date"
        name="dataAbertura"
        value={form.dataAbertura}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="date"
        name="dataValidade"
        value={form.dataValidade}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded bg-[#4C6E43] text-white">Adicionar</button>
      </div>
    </form>
  );
}
