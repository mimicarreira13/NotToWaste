import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./contexts/ProfileContext";
import Navbar from "./components/Navbar";
import Root from "./pages/Root";
import Perfis from "./pages/Perfis";

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
                        </Routes>
                    </main>
                </div>
            </Router>
        </ProfileProvider>
    );
}

export default App;