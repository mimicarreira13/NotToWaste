import React from "react";

type Variant = "sustainability" | "ingredients" | "dishes";
type ClientGridProps<T> = {
    items: T[];
    variant?: Variant;
    columns?: number; // override de colunas se fornecido
    gap?: number | string;
    className?: string;
    renderItem: (item: T, index: number) => React.ReactNode;
};

export default function ClientGrid<T>({
                                          items,
                                          variant,
                                          columns,
                                          gap = 16,
                                          className = "",
                                          renderItem,
                                      }: ClientGridProps<T>) {
    const cols = columns ?? (variant === "ingredients" ? 6 : 4);
    const gapCss = typeof gap === "number" ? `${gap}px` : gap;

    return (
        <div className={className}>
            <div
                role="list"
                className="w-full"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gap: gapCss,
                }}
            >
                {items.map((it, i) => (
                    <div key={i} role="listitem">
                        {renderItem(it, i)}
                    </div>
                ))}
            </div>
        </div>
    );
}