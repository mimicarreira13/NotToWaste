// File: `src/components/Client/ClientGrid.tsx`
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
    const gapCss = typeof gap === "number" ? `${gap}px` : gap;

    const gridTemplateColumns = (() => {
        // For dishes ensure a minimum width of 24rem (w-96) and allow wrapping
        if (variant === "dishes") {
            return `repeat(auto-fit, minmax(22rem, 1fr))`;
        }
        // explicit columns prop wins for non-dishes variants
        const cols = columns ?? (variant === "ingredients" ? 6 : 4);
        return `repeat(${cols}, minmax(0, 1fr))`;
    })();

    return (
        <div className={className}>
            <div
                role="list"
                className="w-full"
                style={{
                    display: "grid",
                    gridTemplateColumns: gridTemplateColumns,
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