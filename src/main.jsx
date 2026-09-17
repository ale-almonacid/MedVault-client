import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme-provider'
import { AuthWrapper } from './context/auth.context.jsx';
import { MedicalProfileWrapper } from './context/medicalProfile.context.jsx';
import { DocumentWrapper } from './context/document.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>

    <AuthWrapper>
    <MedicalProfileWrapper>
    <DocumentWrapper>
    <App />
    </DocumentWrapper>
    </MedicalProfileWrapper>
    </AuthWrapper>

    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
