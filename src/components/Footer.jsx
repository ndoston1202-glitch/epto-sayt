import { useLang } from '../i18n'
import { contacts } from '../config'
import Icon from '../icons'
import Logo from './Logo'

export default function Footer() {
  const { t } = useLang()
  const tel = `tel:${contacts.phone.replace(/[^\d+]/g, '')}`
  return (
    <footer className="footer" id="contacts">
      <div className="container footer-grid">
        <div>
          <Logo height={26} />
          <p className="footer-tag">{t.footer.tagline}</p>
        </div>
        <div>
          <h4>{t.footer.pages}</h4>
          <a href="#top">{t.nav.home}</a>
          <a href="#product">{t.nav.product}</a>
          <a href="#modules">{t.nav.modules}</a>
          <a href="#benefits">{t.nav.benefits}</a>
        </div>
        <div>
          <h4>{t.footer.contacts}</h4>
          <a href={tel} className="contact-row">
            <span className="contact-icon"><Icon name="phone" size={18} /></span>
            <span><small>{t.footer.phone}</small><b>{contacts.phone}</b></span>
          </a>
          <a href={contacts.telegram} target="_blank" rel="noreferrer" className="contact-row">
            <span className="contact-icon"><Icon name="send" size={18} /></span>
            <span><small>{t.footer.telegram}</small><b>{contacts.telegramHandle}</b></span>
          </a>
          <a href={contacts.instagram} target="_blank" rel="noreferrer" className="contact-row">
            <span className="contact-icon"><Icon name="instagram" size={18} /></span>
            <span><small>{t.footer.instagram}</small><b>{contacts.instagramHandle}</b></span>
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} EPRO. {t.footer.rights}</span>
      </div>
    </footer>
  )
}
