import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme-provider'
import { AuthWrapper } from './context/auth.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>

    <AuthWrapper>  
    <App />
    </AuthWrapper> 

    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
