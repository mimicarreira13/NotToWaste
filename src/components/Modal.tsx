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
    widthClass?: string;
};

export default function Modal({ open, title, message, children, buttons, onClose, widthClass }: ModalProps) {
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
                className="absolute inset-0 bg-black/50 pointer-events-auto"
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
                className={`relative bg-white rounded-lg shadow-xl w-full mx-4 overflow-hidden z-[10000] ${
                    widthClass ?? 'max-w-md'}`}
            >
                {/* header band */}
                {title && (
                    <div className="modal-title" id="modal-title">
                        <h3 className="">{title}</h3>
                    </div>
                )}

                {/* body */}
                <div className="modal-body">
                    {message && <p className="mb-4">{message}</p>}
                    {children}
                </div>

                {/* buttons - centered */}
                <div className="px-6 pb-6 flex justify-center gap-3">
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
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded text-sm text-white bg-[#4C6E43] hover:opacity-90"
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}