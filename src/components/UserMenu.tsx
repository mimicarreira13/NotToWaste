import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

export default function UserMenu() {
    const { profile, clearProfile } = useProfile();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogin() {
        setOpen(false);
        navigate("/perfis");
    }

    function handleViewAccount() {
        setOpen(false);
        navigate("/perfis");
    }

    function handleLogout() {
        setOpen(false);
        clearProfile();
        navigate("/perfis");
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(v => !v)}
                aria-haspopup="true"
                aria-expanded={open}
                className="relative"
            >
                <FiUser className="text-white w-10 h-10 cursor-pointer" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-50 overflow-hidden">
                    {profile ? (
                        <div className="flex flex-col">
                            <button onClick={handleViewAccount} className="text-left px-4 py-2 hover:bg-gray-100">
                                Ver conta
                            </button>
                            <button onClick={handleLogout} className="text-left px-4 py-2 hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <button onClick={handleLogin} className="text-left px-4 py-2 hover:bg-gray-100">
                                Login
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}