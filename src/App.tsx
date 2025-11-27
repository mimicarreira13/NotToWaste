import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./contexts/ProfileContext";
import Navbar from "./components/Navbar";
import Perfis from "./pages/Perfis";
import Dashboard from "./pages/Dashboard";
import Root from "./pages/Root";
import Cozinha from "./pages/Cozinha.tsx";
import Food from "./pages/Food";
import Ingredient from "./pages/Ingredient.tsx";
import Client from "./pages/Client";
import Pratos from "./pages/Pratos";
import Stock from "./pages/Stock";
import Desperdicio from "./pages/Desperdicio";


function App() {
    return (
        <ProfileProvider>
            <Router>
                <div className="min-h-screen bg-[#D9D9D9] flex flex-col w-full font-[Sansita]">
                    <Navbar />
                    <main className="flex-1 flex items-center justify-center">
                        <Routes>
                            <Route path="/" element={<Root />} />
                            <Route path="/perfis" element={<Perfis />} />

                            <Route path="/dashboard" element={<Dashboard/>} />
                            <Route path="/cozinha" element={<Cozinha />} />
                            <Route path="/client" element={<Client />} />
                            <Route path="/cozinha/food/:id" element={<Food mode={false} />} />
                            <Route path="/cozinha/ingredient/:id" element={<Ingredient mode={false} />} />
                            <Route path="/pratos" element={<Pratos />} />
                            <Route path="/pratos/food/:id" element={<Food mode={true} />} />
                            <Route path="/pratos/ingredient/:id" element={<Ingredient  mode={true} />} />
                            <Route path="/stock" element={<Stock />} />
                            <Route path="/desperdicio" element={<Desperdicio />} />

                        </Routes>
                    </main>
                </div>
            </Router>
        </ProfileProvider>
    );
}

export default App;