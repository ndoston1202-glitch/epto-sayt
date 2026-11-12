import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { languages } from '../translations'
import Logo from './Logo'
import Icon from '../icons'

// "/#..." — boshqa sahifadan (masalan /mediateka) ham asosiy sahifa bo'limiga olib boradi
const links = [
  ['home', '/#top'],
  ['product', '/#product'],
  ['modules', '/#modules'],
  ['media', '/mediateka/'],
  ['contacts', '#contacts'],
]

function LangSwitch() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const current = languages.find((l) => l.code === lang)
  return (
    <div className="lang" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="true" aria-expanded={open} aria-label="Til / Язык / Language">
        {current.label}
        <Icon name="chevron" size={16} />
      </button>
      {open && (
        <ul className="lang-menu">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                className={l.code === lang ? 'active' : ''}
                aria-current={l.code === lang ? 'true' : undefined}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                <b>{l.label}</b> {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Header({ onCta }) {
  const { t } = useLang()
  const [menu, setMenu] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header-bar">
          <a href="/" className="header-logo" aria-label="EPRO">
            <Logo height={24} />
          </a>
          <nav className={`nav ${menu ? 'open' : ''}`}>
            {links.map(([key, href]) => (
              <a key={key} href={href} onClick={() => setMenu(false)}>
                {t.nav[key]}
              </a>
            ))}
            <button className="btn btn-primary nav-cta" onClick={() => { setMenu(false); onCta() }}>
              {t.cta.consult}
            </button>
          </nav>
          <div className="header-actions">
            <LangSwitch />
            <button className="btn btn-primary header-cta" onClick={onCta}>
              {t.cta.consult}
            </button>
            <button className="burger" onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu}>
              <Icon name={menu ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
