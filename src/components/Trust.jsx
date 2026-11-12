import { useLang } from '../i18n'
import { partners } from '../config'

export default function Trust() {
  const { t } = useLang()
  return (
    <section className="section section-gray">
      <div className="container">
        <div className="trust">
          <div className="trust-top">
            <h3>{t.trust.title}</h3>
            <p>{t.trust.text}</p>
          </div>
          <div className="trust-logos">
            {partners.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
