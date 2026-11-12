import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import Icon from '../icons'
import { readUtm, submitLead } from '../lead'

// Ariza src/lead.js orqali yuboriladi: /api/lead (Telegram bot) + Netlify Forms zaxira.
export default function LeadModal({ onClose }) {
  const { t, lang } = useLang()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const fields = Object.fromEntries(new FormData(e.target))
    delete fields['form-name']
    const ok = await submitLead({
      ...fields,
      subject: `EPRO: yangi ariza — ${fields.name}`,
      source: 'sayt',
      ...readUtm(),
    })
    setStatus(ok ? 'sent' : 'error')
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="lead-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t.form.close}>
          <Icon name="close" size={20} />
        </button>
        {status === 'sent' ? (
          <div className="modal-success">
            <span className="icon-solid"><Icon name="check" /></span>
            <p>{t.form.success}</p>
            <button className="btn btn-primary" onClick={onClose}>{t.form.close}</button>
          </div>
        ) : (
          <form name="lead" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="lead" />
            <input type="hidden" name="language" value={lang} />
            <p className="hp" aria-hidden="true">
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </p>
            <h3 id="lead-title">{t.form.title}</h3>
            <p>{t.form.text}</p>
            <input required name="name" placeholder={t.form.name} autoComplete="name" />
            <input required name="phone" type="tel" placeholder={t.form.phone} defaultValue="+998 " autoComplete="tel" />
            <input name="company" placeholder={t.form.company} autoComplete="organization" />
            {status === 'error' && <p className="form-error">{t.form.error}</p>}
            <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t.form.sending : t.form.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
