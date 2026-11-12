import { useLang } from '../i18n'
import Icon from '../icons'
import SectionHead from './SectionHead'

function Devices() {
  return (
    <div className="why-art devices" aria-hidden="true">
      <div className="dev-laptop">
        <div className="dev-screen">
          <span className="ln w60" /><span className="ln w40" />
          <div className="mini-bars">{[40, 70, 55, 90, 65].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        </div>
        <div className="dev-base" />
      </div>
      <div className="dev-phone">
        <span className="ln w60" /><span className="ln w40" />
        <div className="mini-donut" />
      </div>
    </div>
  )
}

function Support() {
  const { t } = useLang()
  return (
    <div className="why-art chat" aria-hidden="true">
      <div className="bubble bubble-in">{t.why.chatQ}</div>
      <div className="bubble bubble-out">{t.why.chatA}</div>
      <div className="chat-badge"><Icon name="send" size={18} /> Telegram</div>
    </div>
  )
}

export default function Why({ onCta }) {
  const { t } = useLang()
  return (
    <section className="section">
      <div className="container">
        <SectionHead title={t.why.title} subtitle={t.why.subtitle} />
        <div className="grid grid-2">
          <article className="card why-card">
            <h3>{t.why.devicesTitle}</h3>
            <p>{t.why.devicesText}</p>
            <Devices />
          </article>
          <article className="card why-card">
            <h3>{t.why.supportTitle}</h3>
            <p>{t.why.supportText}</p>
            <Support />
          </article>
        </div>
        <div className="demo-cta">
          <h3>{t.why.demoTitle}</h3>
          <button className="btn btn-primary btn-lg" onClick={onCta}>{t.cta.demo}</button>
        </div>
      </div>
    </section>
  )
}
