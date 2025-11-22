import { useState } from 'react';

export default function Client() {
    const [selected, setSelected] = useState<'reports' | 'dishes'>('reports');

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="fixed top-32 left-48 flex gap-6">
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#767676]" />
                <button
                    type="button"
                    onClick={() => setSelected('reports')}
                    aria-pressed={selected === 'reports'}
                    className={`relative z-10 px-2 pb-2 focus:outline-none transition-colors ${
                        selected === 'reports'
                            ? 'text-[#303030] border-b-2 border-[#303030]'
                            : 'text-[#767676]'
                    }`}
                >
                    Relatórios
                </button>

                <button
                    type="button"
                    onClick={() => setSelected('dishes')}
                    aria-pressed={selected === 'dishes'}
                    className={`relative z-10 px-2 pb-2 focus:outline-none transition-colors ${
                        selected === 'dishes'
                            ? 'text-[#303030] border-b-2 border-[#303030]'
                            : 'text-[#767676]'
                    }`}
                >
                    Pratos
                </button>
            </div>
        </div>
    );
}