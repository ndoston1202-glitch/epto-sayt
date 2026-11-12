import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LangProvider } from './i18n'
import LeadPage from './components/LeadPage'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <LeadPage />
    </LangProvider>
  </StrictMode>,
)
