import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "./Modal";

export type AdicionarForm = {
  onClose: () => void;
  onAdded?: (item: any) => void;
};

type BotaoAdicionarProps = {
  title?: string;
  modalComponent?: React.ComponentType<AdicionarForm>;
  buttonLabel?: string;
};

export default function BotaoAdicionar({ title, modalComponent: ModalComponent, buttonLabel = "Adicionar" }: BotaoAdicionarProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <button
        className="bg-[#4c6e43] rounded-[5px] shadow flex items-center gap-2 px-4 py-3 text-lg text-[#D9D9D9] hover:opacity-95 font-bold"
        onClick={() => setShowPopup(true)}
        aria-label={buttonLabel}
      >
        <FiPlus className="text-[#D9D9D9]" />
        <span>{buttonLabel}</span>
      </button>

      {showPopup && ModalComponent && (
        <Modal open={true} title={title} onClose={() => setShowPopup(false)}>
          <ModalComponent
            onClose={() => setShowPopup(false)}
            onAdded={(item) => {
              // podes emitir um evento, fazer refresh ou passar callback via props se necessário
              setShowPopup(false);
              //console.log("adicionado:", item);
            }}
          />
        </Modal>
      )}
    </div>
  );
}