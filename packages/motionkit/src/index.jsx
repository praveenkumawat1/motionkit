import { useEffect, useRef, useState } from 'react'
import './styles.css'

const cn = (...values) => values.filter(Boolean).join(' ')

export function MagneticButton({
  children,
  strength = 0.22,
  className,
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const move = (event) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left - rect.width / 2) * strength
      const y = (event.clientY - rect.top - rect.height / 2) * strength
      element.style.setProperty('--motionkit-x', `${x}px`)
      element.style.setProperty('--motionkit-y', `${y}px`)
    }
    const reset = () => {
      element.style.setProperty('--motionkit-x', '0px')
      element.style.setProperty('--motionkit-y', '0px')
    }

    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)
    return () => {
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
    }
  }, [strength])

  return <button ref={ref} className={cn('mk-magnetic', className)} {...props}>{children}</button>
}

export function ScrollReveal({
  children,
  as: Tag = 'div',
  threshold = 0.2,
  once = true,
  className,
  ...props
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setVisible(false)
      }
    }, { threshold })
    observer.observe(element)
    return () => observer.disconnect()
  }, [once, threshold])

  return <Tag ref={ref} className={cn('mk-reveal', visible && 'mk-reveal-visible', className)} {...props}>{children}</Tag>
}

export function TextReveal({ children, delay = 0, className }) {
  return (
    <span className={cn('mk-text-reveal', className)} style={{ '--motionkit-delay': `${delay}s` }}>
      {String(children).split(' ').map((word, index) => <span className="mk-text-word" style={{ '--motionkit-index': index }} key={`${word}-${index}`}>{word}&nbsp;</span>)}
    </span>
  )
}

export function CursorTrail({ color = '#ff4d00', size = 18, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const move = (event) => {
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return <span ref={ref} aria-hidden="true" className={cn('mk-cursor-trail', className)} style={{ '--motionkit-color': color, '--motionkit-size': `${size}px` }} />
}

export function useMotionKit() {
  return {
    prefersReducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}

export const motionKitVersion = '0.1.0'
