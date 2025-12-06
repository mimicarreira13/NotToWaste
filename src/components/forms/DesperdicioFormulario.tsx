import React, { useState } from "react";
import type { AdicionarForm } from "../BotaoAdicionar";
import Modal from "../Modal";

export default function ModalDesperdicio({ onClose, onAdded }: AdicionarForm) {
  const [openAlteracoesModal, setOpenAlteracoesModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    marca: "",
    motivo: "",
    quantidade: "",
    unidade: "",
    custo: "",
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
      <input 
      name="motivo" 
      value={form.motivo} 
      onChange={handleChange} 
      placeholder="Motivo" 
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
      name="Custo" 
      value={form.custo} 
      onChange={handleChange} 
      placeholder="Custo" 
      className="w-full px-3 py-2 border rounded" 
      />


      <div className="flex justify-center gap-20 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
        <button type="button" className="px-4 py-2 rounded bg-[#4C6E43] text-white" onClick={() => setOpenAlteracoesModal(true)}>Adicionar</button> 
          <Modal
                  open={openAlteracoesModal}
                  onClose={() => {setOpenAlteracoesModal(false); onClose();}}
                  title={"Alterações"}
                
                  message={"Ingrediente(s) adicionado(s) ao Desperdício com sucesso!"}
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