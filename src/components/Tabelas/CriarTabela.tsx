import React, { useState } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (
    row: T,
    updateRow: (patch: Partial<T>) => void
  ) => React.ReactNode;
  className?: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey?: (item: T, idx: number) => string | number;
  className?: string;
};

export function Tabela<T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  className,
}: TableProps<T>) {


  const [rows, setRows] = useState(data);

  function updateRow(index: number, patch: Partial<T>) {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  }

  return (
    <div className={`rounded-lg overflow-x-auto border bg-white shadow ${className ?? ""}`}>
      <table className="w-full border-collapse">
        
        <thead className="bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left px-4 py-3 border-r border-gray-400 last:border-r-0"
                style={{ backgroundColor: "#979797ff", color: "#ffffff" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={rowKey ? String(rowKey(row, idx)) : String((row as any).id ?? idx)}
              className="odd:bg-neutral-300 even:bg-neutral-200"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`px-4 py-2 border-r border-neutral-400 last:border-r-0 ${
                    col.className ?? ""
                  } font-semibold text-justify`}
                >
                  {col.render
                    ? col.render(row, (patch) => updateRow(idx, patch))
                    : (row as any)[col.key as string]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}