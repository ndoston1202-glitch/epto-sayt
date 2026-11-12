import { useLang } from '../i18n'
import Icon from '../icons'
import SectionHead from './SectionHead'

const icons = ['gauge', 'handCoins', 'package', 'trendDown', 'dollar', 'card', 'trendUp', 'refresh']

export default function Benefits() {
  const { t } = useLang()
  return (
    <section className="section section-gray" id="benefits">
      <div className="container">
        <SectionHead title={t.benefits.title} subtitle={t.benefits.subtitle} />
        <div className="grid grid-4">
          {t.benefits.items.map(([title, text], i) => (
            <article className="card card-center" key={title}>
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
