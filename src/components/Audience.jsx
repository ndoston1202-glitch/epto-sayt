import { useLang } from '../i18n'
import Icon from '../icons'
import SectionHead from './SectionHead'

const icons = ['brick', 'tv', 'wrench']

export default function Audience() {
  const { t } = useLang()
  return (
    <section className="section">
      <div className="container">
        <SectionHead title={t.audience.title} subtitle={t.audience.subtitle} />
        <div className="grid grid-3">
          {t.audience.items.map(([title, text], i) => (
            <article className="card card-center" key={title}>
              <span className="icon-soft"><Icon name={icons[i]} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
