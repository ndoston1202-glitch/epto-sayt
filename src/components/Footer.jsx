import { useLang } from '../i18n'
import { contacts } from '../config'
import Icon from '../icons'
import Logo from './Logo'

export default function Footer() {
  const { t } = useLang()
  const tel = (p) => `tel:${p.replace(/[^\d+]/g, '')}`
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
          <a href="#modules">{t.nav.modules}</a>
          <a href="#benefits">{t.nav.benefits}</a>
          <a href="#reviews">{t.nav.reviews}</a>
        </div>
        <div>
          <h4>{t.footer.contacts}</h4>
          <a href={tel(contacts.salesPhone)} className="phone">{contacts.salesPhone}</a>
          <small>{t.footer.sales}</small>
          <a href={tel(contacts.supportPhone)} className="phone">{contacts.supportPhone}</a>
          <small>{t.footer.support}</small>
          <a href={contacts.telegram} target="_blank" rel="noreferrer">{t.footer.telegram}</a>
          <small>{t.footer.address}</small>
          <div className="socials">
            {[['send', contacts.telegram], ['instagram', contacts.instagram], ['facebook', contacts.facebook], ['youtube', contacts.youtube]].map(([icon, href]) => (
              <a key={icon} href={href} target="_blank" rel="noreferrer" aria-label={icon}>
                <Icon name={icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} EPRO. {t.footer.rights}</span>
      </div>
    </footer>
  )
}
