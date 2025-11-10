import { FiSearch } from "react-icons/fi";
import logo from "../assets/images/logo.png";
import UserMenu from "./UserMenu";

export default function Navbar() {

    return (
        <nav className="w-full bg-[#4C6E43] text-white p-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
                <img src={logo} alt="Logo" className="w-[72px] h-[72px]" />
            </div>

            <h2
                className="flex-1 text-center font-normal"
                style={{ fontFamily: 'Sansita', fontSize: '40px', lineHeight: '17px' }}
            >
                NotToWaste
            </h2>

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