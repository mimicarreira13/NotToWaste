import React, { useState } from "react";
import type { AdicionarForm } from "../BotaoAdicionar";
import Modal from "../Modal";
import { addDesperdicioItem } from "../../api/desperdicio";
import { getIngredientes } from "../../api/desperdicio";

export default function ModalDesperdicio({ onClose, onAdded }: AdicionarForm) 
{
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [ingredientes, setIngredientes] = useState<{ id: number; nome: string }[]>([]);
  const [openAlteracoesModal, setOpenAlteracoesModal] = useState(false);
  const [form, setForm] = useState({
    id: 0,
    nome: "",
    motivo:"",
    quantidade: 0,
  });

  const motivos = [
    "Fora de validade",
    "Mau estado",
    "Mal confecionado",
    //"Outro",
  ];

   useEffect(() => {
    async function load() {
      try {
        const data = await getIngredientes();
        setIngredientes(data);
      } catch {
        setErrorModal("Falha ao carregar ingredientes.");
      }
    }
    load();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newItem = {
        id: 0,
        nome: form.nome,
        motivo: form.motivo,
        quantidade: Number(form.quantidade),
      };
    const saved = await addDesperdicioItem(newItem);
      onAdded?.(saved);

      setSuccessModal(true);

  } catch (err) {
      setErrorModal("Não foi possível guardar o desperdício.");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <select 
      name="nome" 
      value={form.nome} 
      onChange={handleChange} 
      className="w-full px-3 py-2 border rounded" 
      required
      >
        <option value="">Selecione o ingrediente</option>
        {ingredientes.map(i => (
          <option key={i.id} value={i.nome}>{i.nome}</option>
        ))}
      </select>

      <select 
      name="motivo" 
      value={form.motivo} 
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded" 
     // required // só se tivermos a opção outro
      >
        <option value="">Selecione o motivo</option>
        {motivos.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <input 
        name="quantidade" 
        type ="number"
        value={form.quantidade} 
        onChange={handleChange} 
        placeholder="Quantidade" 
        className="flex-1 px-3 py-2 border rounded" 
        min={1}
        required
      />

      <div className="flex justify-center gap-20 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded bg-[#4C6E43] text-white" onClick={() => setOpenAlteracoesModal(true)}>Adicionar</button> 
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