export default function Spinner({ label }) {
  return (
    <div className="catalog-state" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p className="catalog-state-message">{label}</p>
    </div>
  )
}
