import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Trust from './components/Trust'
import Audience from './components/Audience'
import Modules from './components/Modules'
import Benefits from './components/Benefits'
import Why from './components/Why'
import Reviews from './components/Reviews'
import Promo from './components/Promo'
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
        <Trust />
        <Audience />
        <Modules onCta={openModal} />
        <Benefits />
        <Why onCta={openModal} />
        <Reviews />
        <Promo onCta={openModal} />
      </main>
      <Footer />
      {modalOpen && <LeadModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
