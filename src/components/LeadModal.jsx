import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import Icon from '../icons'

// Hozircha ariza hech qayerga yuborilmaydi. Telegram bot / CRM ulanganda
// handleSubmit ichiga so'rov qo'shiladi.
export default function LeadModal({ onClose }) {
  const { t } = useLang()
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="lead-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t.form.close}>
          <Icon name="close" size={20} />
        </button>
        {sent ? (
          <div className="modal-success">
            <span className="icon-solid"><Icon name="check" /></span>
            <p>{t.form.success}</p>
            <button className="btn btn-primary" onClick={onClose}>{t.form.close}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 id="lead-title">{t.form.title}</h3>
            <p>{t.form.text}</p>
            <input required name="name" placeholder={t.form.name} autoComplete="name" />
            <input required name="phone" type="tel" placeholder={t.form.phone} defaultValue="+998 " autoComplete="tel" />
            <input name="company" placeholder={t.form.company} autoComplete="organization" />
            <button className="btn btn-primary btn-lg" type="submit">{t.form.submit}</button>
          </form>
        )}
      </div>
    </div>
  )
}
