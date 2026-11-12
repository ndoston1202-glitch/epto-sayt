import { useLang } from '../i18n'
import Icon from '../icons'
import SectionHead from './SectionHead'

export default function Reviews() {
  const { t } = useLang()
  // Lenta uzluksiz aylanishi uchun ro'yxat ikki marta takrorlanadi
  const items = [...t.reviews.items, ...t.reviews.items]
  return (
    <section className="section" id="reviews">
      <div className="container">
        <SectionHead title={t.reviews.title} />
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {items.map(([text, name, role], i) => (
            <article className="card review" key={i} aria-hidden={i >= t.reviews.items.length}>
              <div className="stars">
                {Array.from({ length: 5 }, (_, s) => <Icon key={s} name="star" size={16} />)}
              </div>
              <p>{text}</p>
              <div className="review-author">
                <span className="avatar">{name.charAt(0)}</span>
                <div>
                  <b>{name}</b>
                  <small>{role}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
