import React, { useState } from "react";
import type { AdicionarForm } from "../BotaoAdicionar";
import Modal from "../Modal";

export default function ModalStock({ onClose, onAdded }: AdicionarForm) {
  const [openAlteracoesModal, setOpenAlteracoesModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    marca: "",
    quantidade: "",
    unidade: "",
    custo: "",
    dataAbertura: "",
    dataValidade: "",
    imagem: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdded?.({
      id: 0, 
      nome: form.nome,
      marca: form.marca,
      quantidade: Number(form.quantidade),
      unidade: form.unidade,
      dataAbertura: form.dataAbertura,
      dataValidade: form.dataValidade,
    });
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
    </div>
    <input
      name="custo"
      value={form.custo}
      onChange={handleChange}
      placeholder="Custo"
      className="w-full px-3 py-2 border rounded"
      />
    

    <div className="relative pt-8">
      <label className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 pt-5">
        Data de abertura
      </label>
      <input
        type="date"
        name="dataAbertura"
        value={form.dataAbertura}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
    </div>

  <div className="relative pt-8">
    <label className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 pt-5">
        Data de validade
    </label>
    <input
      type="date"
      name="dataValidade"
      value={form.dataValidade}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded"
    />
    </div>

    {/*Para selecionar uma imagem, fazer preview e armazenar dataURL em form.imagem */}
    <input
      id="imageInput"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        (setForm as any)((prev: any) => ({ ...prev, imagem: reader.result as string }));
        const img = document.getElementById("preview") as HTMLImageElement | null;
        if (img) img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      }}
    />

    <div className="mt-2  text-center ">
      <label
      htmlFor="imageInput"
      className="inline-block px-4 py-2 rounded bg-[#4C6E43] text-white"
      >
      Selecionar imagem
      </label>

      <button
      type="button"
      className="ml-2 px-3 py-2 rounded border"
      onClick={() => {
        (setForm as any)((prev: any) => {
        const copy = { ...prev };
        delete copy.imagem;
        return copy;
        });
        const img = document.getElementById("preview") as HTMLImageElement | null;
        if (img) img.src = "";
        const fileInput = document.getElementById("imageInput") as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
      }}
      >
      Remover
      </button>

      <div className="mt-2 justify-center flex">
      <img
        id="preview"
        src={(form as any).imagem || ""}
        
        className="w-full h-40 object-contain mt-2"
      />
      </div>
    </div>
    
      <div className="flex justify-center gap-20 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
        <button type="button" className="px-4 py-2 rounded bg-[#4C6E43] text-white" onClick={() => setOpenAlteracoesModal(true)}>Adicionar</button> 
         <Modal
                open={openAlteracoesModal}
                onClose={() => {setOpenAlteracoesModal(false); onClose();}}
                title={"Alterações"}
               
                message={"Ingrediente(s) adicionado(s) ao Stock com sucesso!"}
                buttons={[
                    {
                        label: "Fechar",
                        className:
                            "px-6 py-2 rounded text-sm text-white bg-[#4C6E43] hover:opacity-90",
                        onClick: () => {setOpenAlteracoesModal(false);  onClose();},
                    },
                ]}
            >
          </Modal>
      </div>
      
      <style>{`
      form > div > button, form > input {
        margin-top: 2rem; 
        /* Para ter mais padding entre os botões e os inputs */
      }
      `}</style>

    </form>
  );
}
