import { useLang } from '../i18n'
import desktop from '../assets/screen-dashboard.webp'
import phone from '../assets/screen-phone.webp'

function Devices({ alt }) {
  return (
    <div className="devices-hero">
      {/* MacBook */}
      <div className="mac">
        <div className="mac-lid">
          <div className="mac-display">
            <img src={desktop} alt={alt} width="1600" height="706" loading="eager" />
          </div>
        </div>
        <div className="mac-base" aria-hidden="true" />
      </div>

      {/* iPhone 16 Pro */}
      <div className="iphone" aria-hidden="true">
        <span className="iphone-btn b1" />
        <span className="iphone-btn b2" />
        <span className="iphone-btn b3" />
        <div className="iphone-body">
          <div className="iphone-screen">
            <span className="island" />
            <div className="iphone-status">
              <b>9:41</b>
              <span className="status-icons"><i /><i /><i /></span>
            </div>
            <div className="iphone-appbar">Bosh sahifa</div>
            <img src={phone} alt="" width="560" height="970" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero({ onCta }) {
  const { t } = useLang()
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-text">
          <span className="hero-badge">{t.hero.badge}</span>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onCta}>{t.cta.consultLong}</button>
            <button className="btn btn-outline btn-lg" onClick={onCta}>{t.cta.demo}</button>
          </div>
        </div>
        <Devices alt={t.hero.screenAlt} />
      </div>
    </section>
  )
}
