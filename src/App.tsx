import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./contexts/ProfileContext";
import Navbar from "./components/Navbar";
import Perfis from "./pages/Perfis";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/Root";
import Cozinha from "./pages/Cozinha";
import Client from "./pages/Client";
import Definicoes from "./pages/Definicoes";

function App() {
    return (
        <ProfileProvider>
            <Router>
                <div className="min-h-screen bg-[#D9D9D9] flex flex-col w-full">
                    <Navbar />
                    <main className="flex-1 flex items-center justify-center">
                        <Routes>
                            <Route path="/" element={<Root />} />
                            <Route path="/perfis" element={<Perfis />} />
                            <Route path="/dashboard" element={<Dashboard/>} />
                            <Route path="/cozinha" element={<Cozinha />} />
                            <Route path="/client" element={<Client />} />
                            <Route path={"/definicoes"} element={<Definicoes />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ProfileProvider>
    );
}

export default App;