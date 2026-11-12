import { useLang } from '../i18n'
import { regions, stats } from '../config'
import Icon from '../icons'
import SectionHead from './SectionHead'

export default function Stats() {
  const { t, lang } = useLang()
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead title={t.stats.title} />
        <div className="grid grid-4 stats">
          {stats.map((value, i) => (
            <div className="stat" key={i}>
              <b>{value}</b>
              <span>{t.stats.items[i]}</span>
            </div>
          ))}
        </div>

        <div className="regions">
          <SectionHead title={t.stats.regionsTitle} subtitle={t.stats.regionsText} />
          <ul className="region-list">
            {regions.map((r) => (
              <li key={r.en} className={r.hq ? 'hq' : ''}>
                <Icon name="pin" size={18} />
                <span>{r[lang]}</span>
                {r.hq && <small>{t.stats.hq}</small>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
