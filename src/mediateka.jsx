import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { LangProvider } from './i18n'
import Header from './components/Header'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import MediaPage from './components/MediaPage'
import './styles.css'

function App() {
  const [modal, setModal] = useState(false)
  return (
    <>
      <Header onCta={() => setModal(true)} />
      <main>
        <MediaPage />
      </main>
      <Footer />
      {modal && <LeadModal onClose={() => setModal(false)} />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
