import { useLang } from '../i18n'
import screen from '../assets/screen-warehouse.webp'
import SectionHead from './SectionHead'
import Browser from './Browser'

export default function Showcase() {
  const { t } = useLang()
  return (
    <section className="section section-gray" id="product">
      <div className="container">
        <SectionHead title={t.showcase.title} subtitle={t.showcase.subtitle} />
        <Browser src={screen} alt={t.showcase.screenAlt} />
      </div>
    </section>
  )
}
