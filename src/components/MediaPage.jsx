// Mediateka: Instagram postlari /api/instagram orqali (token serverda).
// Token sozlanmagan bo'lsa, Instagram sahifasiga havola ko'rsatiladi.
import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { contacts } from '../config'
import Icon from '../icons'
const markSrc = '/favicon-192.png'

const TABS = [
  ['all', 'grid'],
  ['reel', 'reel'],
  ['image', 'layers'],
]
const fmt = (n) => (n == null ? null : new Intl.NumberFormat('ru-RU').format(n))

export default function MediaPage() {
  const { t } = useLang()
  const m = t.media
  const [state, setState] = useState({ status: 'loading' })
  const [tab, setTab] = useState('all')

  useEffect(() => {
    document.title = m.title
  }, [m])

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => setState(data.configured ? { status: 'ok', ...data } : { status: 'fallback' }))
      .catch(() => setState({ status: 'fallback' }))
  }, [])

  const profile = state.profile || {}
  const items = (state.items || []).filter((it) =>
    tab === 'all' ? true : tab === 'reel' ? it.type === 'reel' || it.type === 'video' : it.type === 'image' || it.type === 'album',
  )

  return (
    <section className="section media">
      <div className="container">
        <div className="media-head">
          <a href={contacts.instagram} target="_blank" rel="noreferrer" className="media-avatar">
            <img src={profile.picture || markSrc} alt={profile.username || 'Epro'} className={profile.picture ? '' : 'is-logo'} />
          </a>
          <div className="media-info">
            <h1>{m.title}</h1>
            <a className="btn btn-primary" href={contacts.instagram} target="_blank" rel="noreferrer">
              <Icon name="instagram" size={18} /> {m.follow}
            </a>
            {state.status === 'ok' && (
              <p className="media-counts">
                {profile.posts != null && <span><b>{fmt(profile.posts)}</b> {m.posts}</span>}
                {profile.followers != null && <span><b>{fmt(profile.followers)}</b> {m.followers}</span>}
              </p>
            )}
            <p className="media-sub">{m.subtitle}</p>
          </div>
        </div>

        {state.status === 'fallback' ? (
          <div className="media-fallback">
            <span className="icon-solid"><Icon name="instagram" /></span>
            <p>{m.fallback}</p>
            <a className="btn btn-primary btn-lg" href={contacts.instagram} target="_blank" rel="noreferrer">
              @{contacts.instagramHandle} — {m.open}
            </a>
          </div>
        ) : (
          <>
            <div className="media-tabs" role="tablist">
              {TABS.map(([key, icon]) => (
                <button key={key} role="tab" aria-selected={tab === key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>
                  <Icon name={icon} size={20} /> {m.tabs[key]}
                </button>
              ))}
            </div>

            {state.status === 'loading' ? (
              <div className="media-grid" aria-busy="true" aria-label={m.loading}>
                {Array.from({ length: 9 }, (_, i) => <span key={i} className="media-cell skeleton" />)}
              </div>
            ) : items.length === 0 ? (
              <p className="media-empty">{m.empty}</p>
            ) : (
              <div className="media-grid">
                {items.map((it) => (
                  <a key={it.id} className="media-cell" href={it.link} target="_blank" rel="noreferrer" title={it.caption}>
                    <img src={it.image} alt={it.caption || 'Instagram post'} loading="lazy" />
                    {(it.type === 'reel' || it.type === 'video') && <span className="media-badge"><Icon name="reel" size={20} /></span>}
                    {it.type === 'album' && <span className="media-badge"><Icon name="layers" size={20} /></span>}
                  </a>
                ))}
              </div>
            )}

            {state.status === 'ok' && (
              <div className="media-more">
                <a className="btn btn-outline btn-lg" href={contacts.instagram} target="_blank" rel="noreferrer">
                  <Icon name="instagram" size={18} /> {m.more}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
