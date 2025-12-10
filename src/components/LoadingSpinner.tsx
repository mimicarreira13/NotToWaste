import React from "react";

type Props = {
    message?: string;
    size?: number;
    ariaLabel?: string;
};

export default function LoadingSpinner({ message = "Loading...", size = 48, ariaLabel = "loading" }: Props) {
    const borderSize = Math.max(3, Math.round(size / 12));
    const spinnerStyle: React.CSSProperties = {
        width: size,
        height: size,
        borderWidth: borderSize,
    };

    return (
        <div className="flex flex-col items-center gap-3" role="status" aria-live="polite" aria-label={ariaLabel}>
            <div
                className="rounded-full border-gray-200 animate-spin"
                style={{
                    ...spinnerStyle,
                    borderStyle: "solid",
                    borderColor: "#e5e7eb",
                    borderTopColor: "#4C6E43",
                    boxSizing: "border-box",
                }}
            />
            {message && <div className="text-[#4C6E43] font-medium">{message}</div>}
        </div>
    );
}