// File: `src/components/ToggleTabs.tsx`
import React from "react";

type Option = { id: string; label: React.ReactNode; icon?: React.ReactNode };

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
                padding: "8px",
                borderRadius: 10,
            }}
            role="tablist"
        >
            {options.map((opt) => {
                const selected = opt.id === value;
                const baseButtonStyle: React.CSSProperties = {
                    padding: "0.5rem 1rem",
                    borderRadius: 8,
                    fontSize: "1rem",
                    minWidth: 88,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "center",
                };
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
                                    ...baseButtonStyle,
                                    backgroundColor: selectedBackgroundColor,
                                    color: selectedTextColor,
                                    fontWeight: 600,
                                }
                                : {
                                    ...baseButtonStyle,
                                    backgroundColor: "transparent",
                                    color: baseTextColor,
                                    fontWeight: 500,
                                }
                        }
                    >
                        {opt.icon && <span aria-hidden style={{ display: "inline-flex", width: 20, height: 20 }}>{opt.icon}</span>}
                        <span>{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
}