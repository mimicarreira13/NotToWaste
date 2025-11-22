import React from "react";

type Option = { id: string; label: React.ReactNode };

type ToggleTabsProps = {
    options: Option[];
    value: string;
    onChange: (id: string) => void;
    className?: string;
    baseLineColor?: string;     // cor da linha base (texto não selecionado)
    selectedTextColor?: string; // cor do texto selecionado
    selectedBorderColor?: string; // cor da risca do selecionado
};

export default function ToggleTabs({
                                       options,
                                       value,
                                       onChange,
                                       className = "",
                                       baseLineColor = "#767676",
                                       selectedTextColor = "#303030",
                                       selectedBorderColor = "#303030",
                                   }: ToggleTabsProps) {
    return (
        <div className={`relative inline-flex gap-6 ${className}`}>
            <div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{ backgroundColor: baseLineColor }}
                aria-hidden="true"
            />

            {options.map((opt) => {
                const selected = opt.id === value;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => onChange(opt.id)}
                        aria-pressed={selected}
                        className="relative z-10 px-2 pb-2 focus:outline-none transition-colors"
                        style={
                            selected
                                ? {
                                    color: selectedTextColor,
                                    borderBottom: `2px solid ${selectedBorderColor}`,
                                }
                                : { color: baseLineColor }
                        }
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}