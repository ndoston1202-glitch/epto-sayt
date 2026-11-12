import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Audience from './components/Audience'
import Showcase from './components/Showcase'
import Modules from './components/Modules'
import Benefits from './components/Benefits'
import Why from './components/Why'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)

  return (
    <>
      <Header onCta={openModal} />
      <main>
        <Hero onCta={openModal} />
        <Audience />
        <Showcase />
        <Modules onCta={openModal} />
        <Benefits />
        <Why onCta={openModal} />
      </main>
      <Footer />
      {modalOpen && <LeadModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
