import React from "react";

type Option = { id: string; label: React.ReactNode };

type ToggleTabsProps = {
    options: Option[];
    value: string;
    onChange: (id: string) => void;
    className?: string;
    selectedBackgroundColor?: string;
    selectedTextColor?: string;
    baseTextColor?: string;
};

export default function ToggleTabs({
                                       options,
                                       value,
                                       onChange,
                                       className = "",
                                       selectedBackgroundColor = "#4C6E43",
                                       selectedTextColor = "#FFFFFF",
                                       baseTextColor = "#767676",
                                   }: ToggleTabsProps) {
    return (
        <div
            className={`inline-flex items-center gap-3 ${className}`}
            style={{
                backgroundColor: "transparent",
                padding: "8px", // maior padding na box
                borderRadius: 10,
            }}
            role="tablist"
        >
            {options.map((opt) => {
                const selected = opt.id === value;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => onChange(opt.id)}
                        aria-pressed={selected}
                        role="tab"
                        aria-selected={selected}
                        className="relative z-10 focus:outline-none transition-colors"
                        style={
                            selected
                                ? {
                                    backgroundColor: selectedBackgroundColor,
                                    color: selectedTextColor,
                                    padding: "0.5rem 1rem", // maior padding do botão
                                    borderRadius: 8,
                                    fontSize: "1rem", // tamanho de letra maior
                                    fontWeight: 600,
                                    minWidth: 88, // largura mínima
                                }
                                : {
                                    backgroundColor: "transparent",
                                    color: baseTextColor,
                                    padding: "0.5rem 1rem",
                                    borderRadius: 8,
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    minWidth: 88,
                                }
                        }
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}