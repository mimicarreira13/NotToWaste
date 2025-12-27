import React, { useEffect,useState } from "react";
import type { AdicionarForm } from "../BotaoAdicionar";
import Modal from "../Modal";
import { addStockItem } from "../../api/stock";

export default function ModalStock({ onClose, onAdded }: AdicionarForm) 
{
  const [successModal, setSuccessModal] = useState(false);
  const [openAlteracoesModal, setOpenAlteracoesModal] = useState(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [openList, setOpenList] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    marca: "",
    quantidade: "",
    unidade: "",
    custo: "",
    dataValidade: "",
    imagem: null as File | null,
    previewSrc: "",
  });

  useEffect(() => {
    async function load() {
      setOpenList(false);
    }
    load();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
       const { name, value } = e.target;
  
        if (name === "quantidade") {
          // permite string vazia (para apagar)
          if (value === "") {
            setForm(prev => ({ ...prev, quantidade: "" }));
            return;
          }
        
          if (!/^[1-9][0-9]*$/.test(value)) return;

          setForm(prev => ({ ...prev, quantidade: value }));
          return;
        
        }
  
        if (name === "unidade") {
          setForm(prev => ({ ...prev, unidade: value })); /////----------------------diferença 
          return;
        }
        if (name === "custo") {
          
          if (value === "") { 
            setForm(prev => ({ ...prev, custo: "" }));
            return;
          }
          if (!/^[0-9]+([.,][0-9]{0,2})?$/.test(value)) {
            return;
        }

        const normalizado = value.replace(",", ".");
  
      setForm(prev => ({
          ...prev,
          custo: normalizado,
        }));
        return;
      }
      setForm(prev => ({ ...prev, [name]: value }));
    }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("SUBMIT STOCK TESTE");

    const quantidadeNum = Number(form.quantidade);
    const unidadeNum = Number(form.unidade);
    const custoNum =
    typeof form.custo === "string"
      ? Number(form.custo.replace(",", "."))
      : Number(form.custo);


    if (!form.nome || !form.marca || quantidadeNum < 1 || unidadeNum < 1 || custoNum <= 0 || !form.dataValidade) {
      setErrorModal("Por favor, preencha todos os campos.");
      return;
    }
    if (!Number.isInteger(quantidadeNum) || quantidadeNum <= 0) {
    setErrorModal("Quantidade inválida.");
    return;
    }

    try {
      const newStockItem = {
        nome: form.nome,
        marca: form.marca,
        quantidade: quantidadeNum,
        unidade: unidadeNum,
        custo: custoNum,
        dataValidade: form.dataValidade + "T00:00:00",
        imagem: form.imagem,
      };
     
      const res = await addStockItem(newStockItem); 
      console.log("Resposta API Stock:", res);

       if (res?.exito && res?.objeto) {
      onAdded?.(res.objeto); 
      setSuccessModal(true);
      setOpenAlteracoesModal(true); 
       } else {
        setErrorModal(res?.mensagem || "Não foi possível guardar o desperdício.");
       }

    } catch (err) {
      console.error("Erro no submit página stock:", err);
      setErrorModal("Não foi possível adicionar o stock. Por favor preencha todos os campos corretamente.");
    }
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-3">
        {errorModal && <p className="text-red-500">{errorModal}</p>}

      <input 
        name="nome" 
        value={form.nome} 
        onChange={handleChange} 
        placeholder="Nome" 
        className="w-full px-3 py-2 border rounded" 
        required
      />

      <input 
        name="marca" 
        value={form.marca} 
        onChange={handleChange} 
        placeholder="Marca" 
        className="w-full px-3 py-2 border rounded" 
        required
      />

      <div className="flex gap-2">
         <div className="relative pt-8">
            <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-600 pt-5">
                Quantidade
            </label>
            <input
              name="quantidade"
              min={1} 
              max={99999}
              type ="number"
              inputMode="numeric"
              pattern="[1-9]*"
              value={form.quantidade}
              onChange={handleChange}
              placeholder="Quantidade"
              required
              className="flex-1 px-3 py-2 border rounded"
            />
          </div>

          <div className="relative pt-8 flex-1">
            <select
              name="unidade"
              value={form.unidade}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Selecione a unidade</option>
              <option value="1">Unidade</option>
              <option value="2">Quilo</option>
              <option value="3">Litro</option>
            
            </select>
        </div>

      </div>
    <div className="relative pt-8" >
      <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-600 pt-5">
                Custo
      </label>
      <input
        name="custo"
        type ="text"
        inputMode="decimal"
        value={form.custo}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        required
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
        required
      />
    </div>

    <div className="flex justify-center gap-20 mt-6 pt-6">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;

          setForm(prev => ({
            ...prev,
            imagem: file,
            previewSrc: file ? URL.createObjectURL(file) : "",
          }));
        }}
        className="w-full"
      />

      {form.previewSrc && (
        <img
          src={form.previewSrc}
          alt="Preview"
          className="mt-2 h-32 object-contain rounded border"
        />
      )}
    </div>
    
    
    <div className="flex justify-center gap-20 mt-6 pt-8">
      <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
      <button type="submit" className="px-4 py-2 rounded bg-[#4C6E43] text-white">Adicionar</button> 
    </div>
  </form>

         <Modal
                open={successModal}
                onClose={() => {setSuccessModal(false); onClose();}}
                title={"Alterações"}
               
                message={"Ingrediente(s) adicionado(s) ao Stock com sucesso!"}
                buttons={[
                    {
                        label: "Fechar",
                        className:
                            "px-6 py-2 rounded text-sm text-white bg-[#4C6E43] hover:opacity-90",
                        onClick: () => {setSuccessModal(false);  onClose();},
                    },
                ]}
            />
          </>
    
  );
}
