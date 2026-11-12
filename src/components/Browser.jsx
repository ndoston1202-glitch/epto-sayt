// Skrinshotni brauzer oynasi ichida ko'rsatadi
export default function Browser({ src, alt }) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <i /><i /><i />
        <span>app.e-pro.uz</span>
      </div>
      <img src={src} alt={alt} width="1600" height="664" loading="lazy" />
    </div>
  )
}
