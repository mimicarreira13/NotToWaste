import React, { useEffect, useRef } from "react";

type ModalButton = {
    label: string;
    onClick?: () => void;
    className?: string;
};

type ModalProps = {
    open: boolean;
    title?: string;
    message?: string;
    children?: React.ReactNode;
    buttons?: ModalButton[];
    onClose: () => void;
};

export default function ModalSemOk({ open, title, message, children, buttons, onClose }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) {
            document.addEventListener("keydown", handleKey);
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            setTimeout(() => dialogRef.current?.focus(), 0);
            return () => {
                document.removeEventListener("keydown", handleKey);
                document.body.style.overflow = prev;
            };
        }
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div
                className="absolute  inset-0 bg-black/50 pointer-events-auto"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-xl shadow-xl
                            w-full mx-4
                            max-w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl
                            flex flex-col
                            max-h-[90vh]"
            >
{title && (
    <div
        id="modal-title"
        className="modal-title border-b rounded-t-xl"
        style={{ padding: "1.70rem 2rem" }} // 20px vertical, 32px horizontal
    >
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
    </div>
)}
<style>{`
/* Aumenta o tamanho da fonte do título e do corpo do modal */
.modal-title h3 { font-size: 1.25rem; } /* ~20px */
@media (min-width: 768px) {
    .modal-title h3 { font-size: 1.5rem; } /* ~24px em telas maiores */
}
.modal-body { font-size: 1.125rem; } /* ~18px */
`}</style>
                {/* body */}
                <div className="flex-1 px-4 sm:px-7 py-4 sm:py-5 overflow-y-auto">
                    {message && <p className="mb-4">{message}</p>}
                    {children}
                </div>

                {/* buttons - centered */}
                <div className="px-6 pb-6 flex justify-between gap-4">
                    {(buttons && buttons.length > 0) ? (
                        buttons.map((b, i) => (
                            <button
                                key={i}
                                onClick={() => { b.onClick?.(); }}
                                className={
                                    b.className ??
                                    "px-4 py-2 rounded text-sm text-white bg-[#4C6E43] hover:opacity-90"
                                }
                            >
                                {b.label}
                            </button>
                        ))
                    ) : null}
                </div>
            </div>
        </div>
    );
}