import { useLang } from '../i18n'

export default function Promo({ onCta }) {
  const { t } = useLang()
  return (
    <section className="section section-gray">
      <div className="container">
        <div className="promo">
          <div className="promo-text">
            <h2>{t.promo.title}</h2>
            <p>{t.promo.text}</p>
            <button className="btn btn-white btn-lg" onClick={onCta}>{t.promo.button}</button>
          </div>
          <div className="promo-badge" aria-hidden="true">
            <b>+3</b>
            <span>{t.promo.badge}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
