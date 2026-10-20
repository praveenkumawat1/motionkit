import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRootRef = useRef(null)
  const followerRef = useRef(null)
  const labelRef = useRef(null)

  useLayoutEffect(() => {
    const follower = followerRef.current
    const label = labelRef.current
    const cursorRoot = cursorRootRef.current
    if (!follower || !label || !cursorRoot) return undefined

    gsap.set(cursorRoot, { autoAlpha: 1 })
    const followX = gsap.quickTo(follower, 'x', { duration: 0.12, ease: 'power2.out' })
    const followY = gsap.quickTo(follower, 'y', { duration: 0.12, ease: 'power2.out' })
    const handleMove = (event) => {
      followX(event.clientX)
      followY(event.clientY)
    }
    const handleEnter = (event) => {
      const isCta = event.currentTarget.matches('a, button')
      gsap.to(follower, { scale: isCta ? 1.7 : 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(label, { autoAlpha: isCta ? 1 : 0, scale: isCta ? 1 : 0.7, duration: 0.2 })
    }
    const handleLeave = () => {
      gsap.to(follower, { scale: 1, duration: 0.25 })
      gsap.to(label, { autoAlpha: 0, scale: 0.7, duration: 0.2 })
    }
    const interactiveElements = document.querySelectorAll('a, button')
    window.addEventListener('mousemove', handleMove)
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleEnter)
      element.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleEnter)
        element.removeEventListener('mouseleave', handleLeave)
      })
      gsap.killTweensOf([cursorRoot, follower, label])
    }
  }, [])

  return (
    <div ref={cursorRootRef} className="custom-cursor" aria-hidden="true">
      <span ref={followerRef} className="cursor-follower">
        <svg className="cursor-arrow" viewBox="0 0 72 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="cursor-arrow-outline" d="M7 5L66 45L40 49L56 73L44 80L28 55L10 73L7 5Z" fill="#101010" />
          <path className="cursor-arrow-face" d="M14 16L52 43L35 45L47 64L43 66L30 46L17 59L14 16Z" fill="#fff" />
          <path className="cursor-arrow-accent" d="M19 23L42 40L32 41L20 51L19 23Z" fill="#FFD21F" />
        </svg>
        <span ref={labelRef}>GO</span>
      </span>
    </div>
  )
}
