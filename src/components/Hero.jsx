import { useLang } from '../i18n'
import screen from '../assets/screen-dashboard.webp'
import Browser from './Browser'

export default function Hero({ onCta }) {
  const { t } = useLang()
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-text">
          <span className="hero-badge">{t.hero.badge}</span>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onCta}>{t.cta.consultLong}</button>
            <button className="btn btn-outline btn-lg" onClick={onCta}>{t.cta.demo}</button>
          </div>
        </div>
        <div className="hero-screen">
          <Browser src={screen} alt={t.hero.screenAlt} eager />
        </div>
      </div>
    </section>
  )
}
