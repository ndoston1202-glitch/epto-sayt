import { useLang } from '../i18n'
import Icon from '../icons'

const bars = [42, 58, 66, 48, 38, 55, 92, 70, 60, 50, 64]

function Dashboard() {
  const { t } = useLang()
  return (
    <div className="dash" aria-hidden="true">
      <div className="dash-card dash-chart">
        <div className="dash-head">
          <div>
            <b>{t.hero.chartTitle}</b>
            <small>{t.hero.chartSub}</small>
          </div>
          <span className="dash-pill">{t.hero.month} <Icon name="chevron" size={12} /></span>
        </div>
        <div className="bars">
          {bars.map((h, i) => (
            <div key={i} className={`bar ${i === 6 ? 'hot' : ''}`} style={{ height: `${h}%` }}>
              {i === 6 && <span className="bar-tip">+24%</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="dash-card dash-donut">
        <b>{t.hero.clientsTitle}</b>
        <small>{t.hero.clientsSub}</small>
        <div className="donut">
          <span>68%</span>
        </div>
      </div>
      <div className="dash-stats">
        {[
          ['trendUp', t.hero.revenue, '+18%'],
          ['cart', t.hero.orders, '+32%'],
          ['chart', t.hero.profit, '+12%'],
        ].map(([icon, label, val]) => (
          <div className="dash-stat" key={label}>
            <span className="dash-stat-icon"><Icon name={icon} size={18} /></span>
            <div>
              <b>{val}</b>
              <small>{label}</small>
            </div>
          </div>
        ))}
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
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <button className="btn btn-primary btn-lg" onClick={onCta}>
            {t.cta.consultLong}
          </button>
        </div>
        <Dashboard />
      </div>
    </section>
  )
}
