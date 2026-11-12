import { useLang } from '../i18n'
import Icon from '../icons'
import SectionHead from './SectionHead'

const icons = ['trendUp', 'gauge', 'handCoins', 'trendDown', 'refresh', 'package', 'file', 'wifi']

export default function Benefits() {
  const { t } = useLang()
  return (
    <section className="section" id="benefits">
      <div className="container">
        <SectionHead title={t.benefits.title} subtitle={t.benefits.subtitle} />
        <div className="grid grid-4">
          {t.benefits.items.map(([title, text], i) => (
            <article className="card card-center card-tint" key={title}>
              <span className="icon-solid"><Icon name={icons[i]} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
