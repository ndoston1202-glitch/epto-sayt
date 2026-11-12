// Reklama (Instagram / Facebook target) uchun alohida sahifa: /ariza
// Raqam qoldirilganda ariza /api/lead orqali Telegram botga tushadi.
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { languages } from '../translations'
import { contacts } from '../config'
import { readUtm, submitLead } from '../lead'
import Icon from '../icons'
import Logo from './Logo'
import phoneScreen from '../assets/screen-phone.webp'

function LangPills() {
  const { lang, setLang } = useLang()
  return (
    <div className="lp-langs" role="group" aria-label="Til">
      {languages.map((l) => (
        <button key={l.code} className={l.code === lang ? 'active' : ''} onClick={() => setLang(l.code)}>
          {l.label}
        </button>
      ))}
    </div>
  )
}

export default function LeadPage() {
  const { t, lang } = useLang()
  const p = t.leadPage
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const utm = useMemo(readUtm, [])
  const nameRef = useRef(null)
  const tel = `tel:${contacts.phone.replace(/[^\d+]/g, '')}`

  useEffect(() => {
    document.title = `Epro — ${p.badge.toLowerCase()}`
  }, [p.badge])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const fields = Object.fromEntries(new FormData(e.target))
    const ok = await submitLead({
      ...fields,
      language: lang,
      subject: `EPRO: yangi ariza — ${fields.name}`,
      source: 'ariza sahifasi',
      ...utm,
    })
    setStatus(ok ? 'sent' : 'error')
    if (ok) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="lp">
      <header className="lp-top container">
        <a href="/" aria-label="EPRO">
          <Logo height={24} />
        </a>
        <LangPills />
      </header>

      <main className="container lp-grid">
        <section className="lp-head">
          <span className="hero-badge">{p.badge}</span>
          <h1>{p.title}</h1>
          <p className="lp-sub">{p.subtitle}</p>
        </section>

        <section className="lp-more">
          <ul className="lp-points">
            {p.points.map((pt) => (
              <li key={pt}>
                <span className="lp-check"><Icon name="check" size={16} stroke={2.4} /></span>
                {pt}
              </li>
            ))}
          </ul>
          <div className="lp-phone" aria-hidden="true">
            <div className="iphone">
              <div className="iphone-body">
                <div className="iphone-screen">
                  <span className="island" />
                  <div className="iphone-status"><b>9:41</b><span className="status-icons"><i /><i /><i /></span></div>
                  <div className="iphone-appbar">Bosh sahifa</div>
                  <img src={phoneScreen} alt="" width="560" height="970" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-card" aria-live="polite">
          {status === 'sent' ? (
            <div className="lp-success">
              <span className="icon-solid"><Icon name="check" /></span>
              <h2>{p.successTitle}</h2>
              <p>{p.successText}</p>
              <a className="btn btn-outline" href="/">{p.toSite}</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>{p.formTitle}</h2>
              <p className="hp" aria-hidden="true">
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </p>
              <label>
                <span>{t.form.name}</span>
                <input ref={nameRef} required name="name" autoComplete="name" placeholder={t.form.name} />
              </label>
              <label>
                <span>{t.form.phone}</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  defaultValue="+998 "
                  pattern="[\d\s+()\-]{9,20}"
                  placeholder="+998 90 123 45 67"
                />
              </label>
              <label>
                <span>{t.form.company}</span>
                <input name="company" autoComplete="organization" placeholder={t.form.company} />
              </label>
              {status === 'error' && <p className="form-error">{t.form.error}</p>}
              <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t.form.sending : p.submit}
              </button>
              <p className="lp-privacy">🔒 {p.privacy}</p>
            </form>
          )}
          <a className="lp-call" href={tel}>
            <Icon name="phone" size={18} /> {p.call}: <b>{contacts.phone}</b>
          </a>
        </section>
      </main>

      <footer className="lp-foot container">© {new Date().getFullYear()} EPRO</footer>
    </div>
  )
}
