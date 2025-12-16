import React, { useEffect,useState } from "react";
import type { AdicionarForm } from "../BotaoAdicionar";
import Modal from "../Modal";
import { addStockItem } from "../../api/stock";

export default function ModalStock({ onClose, onAdded }: AdicionarForm) {
  const [openAlteracoesModal, setOpenAlteracoesModal] = useState(false);
  const [errorModal,/* setErrorModal*/] = useState<string | null>(null);
  const [/*openList*/, setOpenList] = useState(false);
  const [/*selectKey*/, setSelectKey] = useState(0);


  const [form, setForm] = useState({
    id: "",
    nome: "",
    quantidade: 0,
    unidade: 0,
    custo: 0,
    dataValidade: "",
    imagem: "",
  });

  useEffect(() => {
    async function load() {
      setOpenList(false);
      setSelectKey(prev => prev + 1);
      
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
  
        if (name === "unidade") {
          setForm(prev => ({ ...prev, unidade: Number(value) }));
          return;
        }
        if (name === "custo") {
          // permite string vazia (para apagar)
          if (value === "") { 
            setForm(prev => ({ ...prev, custo: 0 }));
            return;
          }
        }
  
      setForm(prev => ({...prev,[name]: value}));
    }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
     if (!form.nome || form.quantidade < 1 || form.unidade < 1 || form.custo < 1) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    const newItem = {
      nome: form.nome,
      quantidade: Number(form.quantidade),
      unidade: Number(form.unidade),
      custo: Number(form.custo),
      dataValidade: form.dataValidade,
      imagem: form.imagem,
    };
     try {
      const res = await addStockItem(newItem); // chama API
      console.log("Resposta API Stock:", res);

      onAdded?.(res); // envia para o componente pai (StockPage)
      setOpenAlteracoesModal(true); // abre modal de sucesso
    } catch (err) {
      console.error("Erro ao adicionar stock:", err);
      alert("Não foi possível adicionar o stock.");
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
        placeholder="Nome Marca" 
        className="w-full px-3 py-2 border rounded" 
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
            
            <option value={1}>Unidade</option>
            <option value={2}>Quilo</option>
            <option value={3}>Litro</option>
          
          </select>
        </div>

      </div>
    <div className="relative pt-8" >
      <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-600 pt-5">
                Custo
      </label>
      <input
        name="custo"
        min={1} 
        max={99999}
        type ="number"
        inputMode="numeric"
        pattern="[1-9]*"
        value={form.custo}
        onChange={handleChange}
        placeholder="Custo"
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
          setForm(prev => ({ ...prev, imagem: String(reader.result) }));
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
      setForm(prev => ({...prev, imagem: ""}));
        const img = document.getElementById("preview") as HTMLImageElement | null;
        if (img) img.src = "";
        const fileInput = document.getElementById("imageInput") as HTMLInputElement | null;
        if (fileInput) fileInput.value = "";
      }}
      >
      Remover
      </button>

      <div className="mt-2 justify-center flex">
      {form.imagem && (
        <img id="preview" src={form.imagem} className="w-full h-40 object-contain mt-2"
        />
      )}
      </div>
    </div>
    
      <div className="flex justify-center gap-20 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded bg-[#4C6E43] text-white">Adicionar</button> 
      </div>
  </form>
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
            />
          </>
    
  );
}
