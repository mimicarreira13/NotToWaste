// File: `src/components/ToggleTabs.tsx`
import React, { isValidElement, cloneElement } from "react";

type Option = { id: string; label: React.ReactNode; icon?: React.ReactNode };

type ToggleTabsProps = {
    options: Option[];
    value: string;
    onChange: (id: string) => void;
    className?: string;
    selectedBackgroundColor?: string;
    selectedTextColor?: string;
    baseTextColor?: string;
    fontSize?: string | number; // new: overall label font size
    iconSize?: number; // new: icon size in px
};

export default function ToggleTabs({
                                       options,
                                       value,
                                       onChange,
                                       className = "",
                                       selectedBackgroundColor = "#4C6E43",
                                       selectedTextColor = "#FFFFFF",
                                       baseTextColor = "#767676",
                                       fontSize = "1.1rem",
                                       iconSize = 22,
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
                const computedFontSize = typeof fontSize === "number" ? `${fontSize}px` : fontSize;
                const baseButtonStyle: React.CSSProperties = {
                    padding: "0.5rem 1rem",
                    borderRadius: 8,
                    fontSize: computedFontSize,
                    minWidth: 88,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "center",
                };

                // if icon is a React element (react-icons), clone it to set size
                let iconNode: React.ReactNode = null;
                if (opt.icon && isValidElement(opt.icon)) {
                    try {
                        iconNode = cloneElement(opt.icon as React.ReactElement, { size: iconSize });
                    } catch {
                        iconNode = opt.icon;
                    }
                } else {
                    iconNode = opt.icon;
                }

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
                        {iconNode && (
                            <span aria-hidden style={{ display: "inline-flex", width: iconSize, height: iconSize, alignItems: "center", justifyContent: "center" }}>
                                {iconNode}
                            </span>
                        )}
                        <span>{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
}