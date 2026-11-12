// Skrinshotni brauzer oynasi ichida ko'rsatadi
export default function Browser({ src, alt, eager }) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <i /><i /><i />
        <span>app.e-pro.uz</span>
      </div>
      <img src={src} alt={alt} width="1600" loading={eager ? 'eager' : 'lazy'} />
    </div>
  )
}
