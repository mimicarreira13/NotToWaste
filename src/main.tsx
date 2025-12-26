import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ← ADICIONE ESTA LINHA
import './index.css'
import App from './App.tsx'

document.title = 'NotToWaste'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter> {/* ← ENVOLVA App com BrowserRouter */}
            <App />
        </BrowserRouter>
    </StrictMode>,
)