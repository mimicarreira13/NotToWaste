import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cozinha from "./pages/Cozinha";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white flex flex-col w-full">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cozinha" element={<Cozinha />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;