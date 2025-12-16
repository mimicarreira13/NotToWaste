import React, { useEffect, useState } from "react";
import type { AdicionarForm } from "../BotaoAdicionar";
import Modal from "../Modal";
import { addDesperdicioItem } from "../../api/desperdicio";
import { getIngredientes } from "../../api/desperdicio";

export default function ModalDesperdicio({ onClose, onAdded }: AdicionarForm) 
{
  const [, setSuccessModal] = useState(false);
  const [, setErrorModal] = useState<string | null>(null);
  const [ingredientes, setIngredientes] = useState<{ id: number; nome: string }[]>([]);
  const [openAlteracoesModal, setOpenAlteracoesModal] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [selectKey, setSelectKey] = useState(0);
  const [form, setForm] = useState({
    ingredienteId: "",
    descricao:"",
    quantidade: 0,
    unidadeIngrediente: "",
  });

  const motivos = [
    "Fora de validade",
    "Mau estado",
    "Mal confecionado",
    //"Outro",
  ];

   useEffect(() => {
    async function load() {
      setOpenList(false);
      setSelectKey(prev => prev + 1);
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
     const { name, value } = e.target;

   
      if (name === "quantidade") {
        // permite string vazia (para apagar)
        if (value === "") {
          setForm(prev => ({ ...prev, quantidade: 0 }));
          return;
        }

        // só números positivos
        const num = Number(value);

       if (!Number.isInteger(num) || num < 1) {
        return;
      }

        setForm(prev => ({ ...prev, quantidade: num }));
        return;
      }

      
      if (name === "unidadeIngrediente") {
        setForm(prev => ({ ...prev, unidadeIngrediente:value }));
        return;
      }

    setForm(prev => ({...prev,[name]: value}));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.descricao || !form.ingredienteId || form.quantidade < 1 || !form.unidadeIngrediente) {
      setErrorModal("Por favor, preencha todos os campos.");
      return;
    }
    else if (
      !form.ingredienteId ||
      !Number.isInteger(form.quantidade) ||
      form.quantidade <= 0
    ) {
      setErrorModal("Quantidade inválida.");
      return;
    }

    try {
      const newItem = { 
        ingredienteId: form.ingredienteId,
        descricao: form.descricao,
        quantidade: Number(form.quantidade),
        unidadeIngrediente: Number(form.unidadeIngrediente),
        utilizadorId:"7bafc80f-0c10-457e-a4bd-cc303afa6332", //fincionario de stock id
        tipoSaida: 2, //desperdicio
      };
      
      const res = await addDesperdicioItem(newItem);
      console.log("Resposta da API:", res);

      if (res?.exito) {
        onAdded?.(res.objeto);
        setSuccessModal(true);
        setOpenAlteracoesModal(true);
      } else {
        setErrorModal(res?.mensagem || "Não foi possível guardar o desperdício.");
      }

  } catch {
      setErrorModal("Não foi possível guardar o desperdício.");
    }
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-3">
        {errorModal && <p className="text-red-500">{errorModal}</p>}

        <select
          key={selectKey}
          name="ingredienteId"
          value={form.ingredienteId}
          onChange={handleChange}
          onFocus={() => setOpenList(true)}
          onBlur={() => setOpenList(false)}
          size={openList ? Math.min(ingredientes.length, 8) : 1}
          className="w-full px-3 py-2 border rounded max-h-60 overflow-y-auto"
          required
        >
          <option value="">Selecione o ingrediente</option>
          {ingredientes.map(i => (
            <option key={i.id} value={i.id}>{i.nome}</option>
          ))}
        </select>

        <select
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Selecione o motivo</option>
          {motivos.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <div className="relative pt-8">
          <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-600 pt-5">
            Quantidade
          </label>
          <input
            name="quantidade"
            min={1}
            max={99999}
            type="number"
            inputMode="numeric"
            pattern="[1-9]*"
            value={form.quantidade}
            onChange={handleChange}
            placeholder="Quantidade"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <select
          name="unidadeIngrediente"
          value={form.unidadeIngrediente}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Selecione a unidade</option>
          <option value="1">Unidade</option>
          <option value="2">Quilo</option>
          <option value="3">Litro</option>
        </select>

        <div className="flex justify-center gap-20 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded bg-[#4C6E43] text-white">Adicionar</button>
        </div>
      </form>

      
      <Modal
        open={successModal}
        onClose={() => { setSuccessModal(false); onClose(); }}
        title={"Alterações"}
        message={"Ingrediente(s) adicionado(s) ao Desperdício com sucesso!"}
        buttons={[
          {
            label: "Fechar",
            className: "px-6 py-2 rounded text-sm text-white bg-[#4C6E43] hover:opacity-90",
            onClick: () => { setSuccessModal(false); onClose(); },
          },
        ]}
      />
    </>
  );
}