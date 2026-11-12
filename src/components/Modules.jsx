import { useLang } from '../i18n'
import Icon from '../icons'
import SectionHead from './SectionHead'

const icons = ['warehouse', 'register', 'chart', 'users']

export default function Modules({ onCta }) {
  const { t } = useLang()
  return (
    <section className="section" id="modules">
      <div className="container">
        <SectionHead title={t.modules.title} subtitle={t.modules.subtitle} />
        <div className="grid grid-4">
          {t.modules.items.map(([title, text], i) => (
            <article className="card card-center module" key={title}>
              <div className="module-top">
                <span className="module-icon"><Icon name={icons[i]} size={30} /></span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="module-cta">
          <span className="icon-soft"><Icon name="phone" /></span>
          <p>{t.modules.moreText}</p>
          <button className="btn btn-primary" onClick={onCta}>{t.cta.demo}</button>
        </div>
      </div>
    </section>
  )
}
