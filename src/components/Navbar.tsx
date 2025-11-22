import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

import logo from "../assets/images/logo.png";

export default function Navbar() {

    return (
        <nav className="w-full bg-[#4C6E43] text-white p-4 h-20 flex items-center justify-between fixed">
            <div className="flex items-center gap-2 flex-1">
                <img src={logo} alt="Logo" className="w-[72px] h-[72px]" />
            </div>

            <Link
                to="/"
                className="flex-1 text-center font-normal"
                aria-label="Ir para a página inicial"
                style={{ fontFamily: 'Arial', fontSize: '40px', lineHeight: '17px', textDecoration: 'none', color: 'inherit' }}
            >
                NotToWaste
            </Link>

            <div className="flex items-center gap-4 justify-end flex-1">
                <div className="flex items-center bg-white/20 rounded-full px-3 py-1 hover:bg-white/30 transition">
                    <FiSearch className="text-white" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="bg-transparent placeholder-white text-white ml-2 outline-none"
                    />
                </div>

                <UserMenu />
            </div>
        </nav>
    );
}