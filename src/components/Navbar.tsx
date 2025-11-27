import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

import logo from "../assets/images/logo.png";

export default function Navbar() {
    const [isCompact, setIsCompact] = useState<boolean>(() =>
        typeof window !== "undefined" ? window.innerWidth <= 900 : false
    );

    useEffect(() => {
        function onResize() {
            setIsCompact(window.innerWidth <= 900);
        }
        window.addEventListener("resize", onResize);
        // garante estado inicial correto
        onResize();
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <nav className="w-full bg-[#4C6E43] text-white p-4 h-20 flex items-center justify-between fixed z-50">
            {/* Left: logo */}
            <div className="flex items-center gap-2 flex-1">
                <Link to="/" aria-label="Ir para a página inicial">
                    <img src={logo} alt="Logo" className="w-12 h-12 sm:w-[72px] sm:h-[72px]" />
                </Link>
            </div>

            {/* Center: title (hidden on compact) AND mobile search (visible only on compact) */}
            <div className="flex-1 flex items-center justify-center">
                {!isCompact && (
                    <Link
                        to="/"
                        className="text-center font-normal"
                        aria-label="Ir para a página inicial"
                        style={{ fontFamily: "Arial", fontSize: "40px", lineHeight: "17px", textDecoration: "none", color: "inherit" }}
                    >
                        NotToWaste
                    </Link>
                )}

                {isCompact && (
                    <div className="flex items-center bg-white/20 rounded-full px-3 py-1 hover:bg-white/30 transition w-full max-w-xs">
                        <FiSearch className="text-white" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="bg-transparent placeholder-white text-white ml-2 outline-none w-full"
                        />
                    </div>
                )}
            </div>

            {/* Right: desktop search (hidden on compact) + user menu */}
            <div className="flex items-center gap-4 justify-end flex-1">
                {!isCompact && (
                    <div className="flex items-center bg-white/20 rounded-full px-3 py-1 hover:bg-white/30 transition">
                        <FiSearch className="text-white" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="bg-transparent placeholder-white text-white ml-2 outline-none"
                        />
                    </div>
                )}

                <UserMenu />
            </div>
        </nav>
    );
}