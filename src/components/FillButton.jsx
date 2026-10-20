import { ArrowUpRight } from 'lucide-react'

export default function FillButton({ children = 'Explore motion', onClick, className = '', type = 'button' }) {
  return (
    <button
      className={`motion-fill-button ${className}`.trim()}
      type={type}
      onClick={onClick}
    >
      <span className="motion-fill-button-label">{children}</span>
      <span className="motion-fill-button-icon" aria-hidden="true">
        <ArrowUpRight size={16} strokeWidth={2.4} />
      </span>
    </button>
  )
}
