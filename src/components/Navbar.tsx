import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
        onResize();
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const location = useLocation();
    const hideUserMenu = location.pathname.startsWith("/client"); // também indica página /client

    return (
        <nav className="w-full bg-[#4C6E43] text-white p-4 h-20 flex items-center justify-between fixed z-50">
            <div className="flex items-center gap-3 flex-1">
                {hideUserMenu ? (
                    <div aria-disabled="true" className="flex items-center gap-3" style={{ cursor: "default" }}>
                        <img src={logo} alt="Logo" className="w-12 h-12 sm:w-[72px] sm:h-[72px]" />
                        {!isCompact && (
                            <span
                                className="text-white font-normal"
                                style={{ fontFamily: "Arial", fontSize: "40px", lineHeight: "17px", textDecoration: "none" }}
                            >
                                NotToWaste
                            </span>
                        )}
                    </div>
                ) : (
                    <Link to="/" aria-label="Ir para a página inicial" className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="w-12 h-12 sm:w-[72px] sm:h-[72px]" />
                        {!isCompact && (
                            <span
                                className="text-white font-normal"
                                style={{ fontFamily: "Arial", fontSize: "40px", lineHeight: "17px", textDecoration: "none" }}
                            >
                                NotToWaste
                            </span>
                        )}
                    </Link>
                )}
            </div>

            <div className="flex items-center gap-4 justify-end flex-1">
                {!hideUserMenu && <UserMenu />}
            </div>
        </nav>
    );
}