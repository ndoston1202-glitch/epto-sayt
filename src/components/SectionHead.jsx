export default function SectionHead({ title, subtitle }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
