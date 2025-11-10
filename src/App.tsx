import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Perfis from "./pages/Perfis";

function App() {
    const [hasProfile, setHasProfile] = useState<boolean>(() =>
        Boolean(localStorage.getItem("selectedProfile"))
    );

    return (
        <Router>
            <div className="min-h-screen bg-[#D9D9D9] flex flex-col w-full">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <Routes>
                        <Route
                            path="/"
                            element={hasProfile ? <Home /> : <Perfis onSelect={() => setHasProfile(true)} />}
                        />
                        <Route path="/perfis" element={<Perfis onSelect={() => setHasProfile(true)} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;