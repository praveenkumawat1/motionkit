import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, ChevronRight, Github, Instagram, Linkedin, LogOut, Mail, Menu, MousePointer2, Rocket, Sparkles, UserRound, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mascot1 from './assets/mascot1.png'
import mascot2 from './assets/mascot2.png'
import bag from './assets/bag1.png'

gsap.registerPlugin(ScrollTrigger)

const componentNames = ['<MagneticButton />', '<TextReveal />', '<TiltCard />', '+37']
const comparisonRows = [
  ['One install', 'Three-day setup'],
  ['Animation by name', 'Animation by guesswork'],
  ['GSAP powered', 'Plugin overload'],
  ['Reusable components', 'Copy-paste snippets'],
  ['Smooth by default', 'Janky by accident'],
  ['Production ready', 'Demo-only polish'],
  ['Clear API', 'Scattered options'],
  ['Fast iteration', 'Slow feedback loops'],
  ['Motion with purpose', 'Motion for noise'],
]
const showcaseCards = [
  { name: 'MagneticButton', type: 'magnetic', tone: 'white', label: 'PULL WITH PURPOSE' },
  { name: 'TextScramble', type: 'scramble', tone: 'ink', label: 'HELLO WORLD' },
  { name: 'TiltCard', type: 'tilt', tone: 'blue', label: 'MOVE WITH PURPOSE' },
  { name: 'CursorTrail', type: 'cursor', tone: 'white', label: 'TRACE THE MOMENT' },
  { name: 'Marquee', type: 'marquee', tone: 'yellow', label: 'MOTIONKIT · MOTIONKIT' },
  { name: 'Parallax', type: 'parallax', tone: 'blue', label: 'SHIFT YOUR LAYERS' },
  { name: 'ScrollReveal', type: 'reveal', tone: 'white', label: 'SCROLL REVEAL' },
]
const faqItems = [
  { question: 'Do I need to know GSAP first?', answer: 'No. MotionKit handles the setup so you can call expressive animations by name and keep your focus on the interface.', tags: ['Beginner friendly', 'GSAP powered'] },
  { question: 'Can I use only one component?', answer: 'Absolutely. Every component is independent, so start with one interaction and add more only when your product needs them.', tags: ['Modular', 'Drop-in ready'] },
  { question: 'Is it ready for production?', answer: 'Yes. The toolkit is designed for real interfaces with reusable APIs, smooth defaults, and motion that supports the user journey.', tags: ['Reusable API', 'Smooth defaults'] },
  { question: 'What can I animate?', answer: 'Buttons, text, cards, cursors, marquees, reveals and more. Pick a pattern, tune the feeling, and ship it.', tags: ['Text', 'Cards', 'Cursor'] },
]
const navLinks = [
  { label: 'Home', href: '#home', number: '01' },
  { label: 'Components', href: '/components', number: '02' },
  { label: 'Animations', href: '/animations', number: '03' },
  { label: 'Playground', href: '#playground', number: '04' },
  { label: 'Docs', href: '/docs', number: '05' },
]
const USERS_KEY = 'motionkit-users'
const SESSION_KEY = 'motionkit-session'

function readLocalUsers() {
  try {
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

function FloatingCard({ className, eyebrow, children, rotate = 0 }) {
  return (
    <div
      className={`floating-card absolute z-10 hidden rounded-[1.25rem] border-[3px] border-ink bg-white p-3 shadow-[5px_6px_0_#111] sm:block ${className}`}
      style={{ '--rotate': `${rotate}deg` }}
    >
      <div className="mb-2 flex items-center gap-2 text-xs font-bold">
        <span className="h-2.5 w-2.5 rounded-full bg-blue" />
        {eyebrow}
      </div>
      {children}
    </div>
  )
}

function App() {
  const heroRef = useRef(null)
  const menuPanelRef = useRef(null)
  const menuItemsRef = useRef([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('register')
  const [authSubmitted, setAuthSubmitted] = useState(false)
  const [authError, setAuthError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

  useEffect(() => {
    try {
      const sessionEmail = window.localStorage.getItem(SESSION_KEY)
      const user = readLocalUsers().find((item) => item.email === sessionEmail)
      if (user) setCurrentUser(user)
    } catch {
      setCurrentUser(null)
    }
  }, [])

  const openAuth = (mode = 'register') => {
    setAuthMode(mode)
    setAuthSubmitted(false)
    setAuthError('')
    setAuthOpen(true)
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email') || '').trim().toLowerCase()
    const password = String(formData.get('password') || '')
    const users = readLocalUsers()
    setAuthError('')

    if (authMode === 'register') {
      const confirmPassword = String(formData.get('confirmPassword') || '')
      if (password !== confirmPassword) {
        setAuthError('Passwords do not match. Please try again.')
        return
      }
      if (users.some((user) => user.email === email)) {
        setAuthMode('login')
        setAuthError('This email is already registered. Please log in.')
        return
      }
      const user = {
        id: crypto.randomUUID(),
        name: String(formData.get('name') || 'MotionKit creator').trim(),
        email,
        password,
        role: String(formData.get('role') || 'Developer'),
        bio: 'Building expressive interfaces with MotionKit.',
        joinedAt: new Date().toISOString(),
      }
      window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
      setAuthMode('login')
      setAuthSubmitted(false)
      setAuthError('Account created. Log in with your new credentials.')
      return
    }

    const user = users.find((item) => item.email === email && item.password === password)
    if (!user) {
      setAuthError('Email or password is incorrect.')
      return
    }
    window.localStorage.setItem(SESSION_KEY, user.email)
    setCurrentUser(user)
    setAuthSubmitted(true)
  }

  const handleLogout = () => {
    window.localStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
    setProfileOpen(false)
  }

  const handleProfileSave = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const updatedUser = {
      ...currentUser,
      name: String(formData.get('name') || '').trim(),
      role: String(formData.get('role') || '').trim(),
      bio: String(formData.get('bio') || '').trim(),
    }
    const users = readLocalUsers().map((user) => user.email === currentUser.email ? updatedUser : user)
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
    setCurrentUser(updatedUser)
    setProfileSaved(true)
    window.setTimeout(() => setProfileSaved(false), 1600)
  }

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const loadCounter = { value: 0 }
      const loaderTimeline = gsap.timeline({
        onComplete: () => setIsLoading(false),
      })
      loaderTimeline
        .to(loadCounter, {
          value: 100,
          duration: 1.55,
          ease: 'power2.inOut',
          onUpdate: () => {
            const counter = document.querySelector('.loader-counter')
            if (counter) counter.textContent = String(Math.round(loadCounter.value)).padStart(3, '0')
          },
        })
        .to('.loader-curtain', {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        }, '+=0.12')
        .to('.loader-screen', { autoAlpha: 0, duration: 0.2 })
        .from('.page-content', { y: 12, opacity: 0, duration: 0.45, ease: 'power3.out' }, '-=0.08')

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .from('.nav-item', { y: -20, opacity: 0, duration: 0.55, stagger: 0.08 })
        .from('.hero-kicker', { y: 20, opacity: 0, duration: 0.45 }, '-=0.2')
        .from('.hero-title-line', { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.15')
        .from('.hero-copy, .hero-actions', { y: 18, opacity: 0, duration: 0.55 }, '-=0.35')
        .from('.floating-card, .hero-spark', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.45')
        .from('.mascot', { y: 60, opacity: 0, duration: 0.7 }, '-=0.5')

      gsap.to('.floating-card', {
        y: -10,
        rotation: '+=2',
        duration: 2.2,
        ease: 'sine.inOut',
        stagger: 0.25,
        repeat: -1,
        yoyo: true,
      })
      gsap.to('.hero-spark', { rotation: 360, duration: 8, ease: 'none', repeat: -1 })


      const marquee = gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      })
      let lastScrollY = window.scrollY
      const handleScrollDirection = () => {
        const currentScrollY = window.scrollY
        const direction = currentScrollY >= lastScrollY ? 1 : -1
        marquee.timeScale(direction)
        lastScrollY = currentScrollY
      }
      window.addEventListener('scroll', handleScrollDirection, { passive: true })
      gsap.utils.toArray('.steps-reveal').forEach((element) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
        })
      })
      gsap.utils.toArray('.step-card').forEach((card) => {
        const details = card.querySelectorAll('.step-kicker, h3, .code-window, .try-button, .mini-magnet, .step-mascot')

        gsap.from(details, {
          y: 22,
          scale: 0.96,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            end: 'top 58%',
            scrub: 0.7,
          },
        })

        gsap.from(card.querySelector('.step-number'), {
          scale: 0.55,
          rotation: -18,
          opacity: 0,
          duration: 0.75,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            once: true,
          },
        })
      })
      const comparisonSection = document.querySelector('.comparison-section')
      const comparisonBadge = document.querySelector('.comparison-badge')
      let moveBadge
      let resetBadge
      let enterBadge
      if (comparisonSection && comparisonBadge) {
        gsap.from('.section-divider-line, .section-divider-copy', {
          scaleX: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-divider',
            start: 'top 82%',
            once: true,
          },
        })
        gsap.fromTo(comparisonBadge,
          { y: -80, rotation: -8 },
          {
            y: 575,
            rotation: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: comparisonSection,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          },
        )
        moveBadge = (event) => {
          const bounds = comparisonBadge.getBoundingClientRect()
          const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) * 0.12
          gsap.to(comparisonBadge, {
            x: offsetX,
            scale: 1.08,
            duration: 0.35,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        }
        resetBadge = () => {
          gsap.to(comparisonBadge, { x: 0, scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
        }
        enterBadge = () => {
          gsap.to(comparisonBadge, { scale: 1.08, duration: 0.35, ease: 'power3.out' })
        }
        comparisonBadge.addEventListener('pointermove', moveBadge)
        comparisonBadge.addEventListener('pointerenter', enterBadge)
        comparisonBadge.addEventListener('pointerleave', resetBadge)
        gsap.from('.comparison-row', {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: comparisonSection,
            start: 'top 78%',
            once: true,
          },
        })
        gsap.from('.bag-copy, .bag-visual', {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bag-section',
            start: 'top 78%',
            once: true,
          },
        })
        gsap.fromTo('.bag-badge',
          { y: -210, rotation: -16, scale: 0.72, opacity: 0 },
          {
            y: 155,
            rotation: 14,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.bag-section',
              start: 'top 82%',
              end: 'center 45%',
              scrub: 1,
            },
          },
        )
        gsap.to('.bag-image', {
          y: -12,
          rotation: -1.5,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        const showcase = document.querySelector('.showcase-section')
        if (showcase) {
          gsap.from('.showcase-heading', {
            y: 45,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: showcase, start: 'top 82%', once: true },
          })
          gsap.fromTo('.showcase-card',
            { x: 0, y: 55, scale: 0.18, rotation: 0, opacity: 0 },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              rotation: (index, target) => Number(target.dataset.rotation || 0),
              duration: 1,
              stagger: 0.1,
              ease: 'back.out(1.45)',
              scrollTrigger: {
                trigger: '.showcase-grid',
                start: 'top 78%',
                once: true,
              },
            },
          )
          gsap.from('.showcase-footer', {
            y: 25,
            opacity: 0,
            duration: 0.7,
            delay: 0.45,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.showcase-grid', start: 'top 68%', once: true },
          })
          gsap.from('.split-copy, .site-footer-column, .footer-wordmark', {
            y: 35,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.final-section',
              start: 'top 78%',
              once: true,
            },
          })
          gsap.utils.toArray('.showcase-card').forEach((card) => {
            const art = card.querySelector('.showcase-art')
            const label = card.querySelector('.showcase-art-label')
            const originalLabel = label?.textContent || ''
            const handleMove = (event) => {
              const bounds = card.getBoundingClientRect()
              const x = event.clientX - (bounds.left + bounds.width / 2)
              const y = event.clientY - (bounds.top + bounds.height / 2)
              if (card.classList.contains('showcase-card-tilt')) {
                gsap.to(art, { rotationY: x * 0.08, rotationX: -y * 0.08, duration: 0.35, ease: 'power2.out' })
              }
              if (card.classList.contains('showcase-card-magnetic')) {
                gsap.to(art, { x: x * 0.08, y: y * 0.08, duration: 0.35, ease: 'power3.out' })
              }
              if (card.classList.contains('showcase-card-parallax')) {
                gsap.to(art.querySelector('.showcase-layered'), { x: x * 0.1, y: y * 0.1, duration: 0.4, ease: 'power2.out' })
              }
            }
            const handleEnter = () => {
              if (card.classList.contains('showcase-card-scramble') && label) {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                let frame = 0
                const scramble = () => {
                  label.textContent = originalLabel.split('').map((character, index) => (
                    index < frame / 2 ? character : chars[Math.floor(Math.random() * chars.length)]
                  )).join('')
                  frame += 1
                  if (frame < originalLabel.length * 2) window.requestAnimationFrame(scramble)
                  else label.textContent = originalLabel
                }
                scramble()
              }
              if (card.classList.contains('showcase-card-reveal')) gsap.to(art, { clipPath: 'inset(0 0 0 0)', duration: 0.45, ease: 'power3.out' })
            }
            const handleLeave = () => {
              gsap.to(art, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
              const layers = art.querySelector('.showcase-layered')
              if (layers) gsap.to(layers, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
            }
            card.addEventListener('pointermove', handleMove)
            card.addEventListener('pointerenter', handleEnter)
            card.addEventListener('pointerleave', handleLeave)
            card._showcaseCleanup = () => {
              card.removeEventListener('pointermove', handleMove)
              card.removeEventListener('pointerenter', handleEnter)
              card.removeEventListener('pointerleave', handleLeave)
            }
          })
        }
      }

      return () => {
        window.removeEventListener('scroll', handleScrollDirection)
        if (comparisonBadge) {
          comparisonBadge.removeEventListener('pointermove', moveBadge)
          comparisonBadge.removeEventListener('pointerenter', enterBadge)
          comparisonBadge.removeEventListener('pointerleave', resetBadge)
        }
        document.querySelectorAll('.showcase-card').forEach((card) => card._showcaseCleanup?.())
        marquee.kill()
      }
    }, heroRef)

    return () => context.revert()
  }, [])

  useLayoutEffect(() => {
    if (!menuPanelRef.current) return undefined

    const menuAnimation = gsap.timeline({ defaults: { ease: 'power3.out' } })
    if (menuOpen) {
      menuAnimation
        .set(menuPanelRef.current, { display: 'block' })
        .fromTo(menuPanelRef.current, { autoAlpha: 0, y: -12, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35 })
        .fromTo(menuItemsRef.current, { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.06 }, '-=0.18')
    } else {
      menuAnimation
        .to(menuItemsRef.current, { autoAlpha: 0, x: -8, duration: 0.15, stagger: 0.03 })
        .to(menuPanelRef.current, { autoAlpha: 0, y: -8, scale: 0.96, duration: 0.2 })
        .set(menuPanelRef.current, { display: 'none' })
    }

    return () => menuAnimation.kill()
  }, [menuOpen])

  return (
    <main ref={heroRef} className={`min-h-screen overflow-hidden bg-paper text-ink ${isLoading ? 'is-loading' : ''}`}>
      {isLoading && (
        <div className="loader-screen" aria-label="Loading MotionKit" role="status">
          <div className="loader-curtain" aria-hidden="true" />
          <div className="loader-counter-wrap">
            <span className="loader-counter">000</span>
            <span className="loader-counter-mark">/ 100</span>
          </div>
          <div className="loader-caption">MotionKit / Initializing motion</div>
        </div>
      )}
      <CustomCursor />
      {profileOpen && currentUser && (
        <div className="auth-modal-backdrop" role="presentation" onClick={() => setProfileOpen(false)}>
          <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={(event) => event.stopPropagation()}>
            <button className="auth-close" type="button" aria-label="Close profile" onClick={() => setProfileOpen(false)}><X size={19} strokeWidth={3} /></button>
            <div className="profile-avatar"><UserRound size={28} /></div>
            <span className="auth-kicker"><i /> MotionKit workspace</span>
            <h2 id="profile-title">Your profile.</h2>
            <p className="auth-intro">Manage your local profile and keep your creative setup close.</p>
            <form className="auth-form" onSubmit={handleProfileSave}>
              <label>Full name<input name="name" required defaultValue={currentUser.name} /></label>
              <label>Email address<input type="email" value={currentUser.email} disabled /></label>
              <label>Role<input name="role" required defaultValue={currentUser.role} /></label>
              <label>About you<textarea name="bio" rows="3" defaultValue={currentUser.bio} /></label>
              <button className="auth-submit" type="submit">{profileSaved ? 'Saved locally' : 'Save profile'} {profileSaved ? <Check size={17} /> : <ArrowUpRight size={17} />}</button>
            </form>
            <div className="profile-stats"><span><b>Free</b> plan</span><span><b>Local</b> account</span><span><b>{new Date(currentUser.joinedAt).toLocaleDateString()}</b> joined</span></div>
            <button className="profile-logout" type="button" onClick={handleLogout}><LogOut size={15} /> Log out</button>
            <p className="profile-disclaimer">Demo mode: account data is stored only in this browser’s localStorage. Do not use a real password.</p>
          </section>
        </div>
      )}
      {authOpen && (
        <div className="auth-modal-backdrop" role="presentation" onClick={() => setAuthOpen(false)}>
          <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(event) => event.stopPropagation()}>
            <button className="auth-close" type="button" aria-label="Close registration dialog" onClick={() => setAuthOpen(false)}><X size={19} strokeWidth={3} /></button>
            <div className="auth-mark">M<span>K</span><b>.</b></div>
            <span className="auth-kicker"><i /> {authMode === 'register' ? 'Create your account' : 'Welcome back'}</span>
            <h2 id="auth-title">{authMode === 'register' ? 'Start moving.' : 'Keep moving.'}</h2>
            <p className="auth-intro">{authMode === 'register' ? 'Build expressive interfaces with MotionKit.' : 'Log in to continue to your MotionKit workspace.'}</p>
            {authError && <div className={`auth-feedback ${authError.startsWith('Account created') ? 'auth-feedback-success' : ''}`}>{authError}</div>}
            {authSubmitted ? (
              <div className="auth-success">
                <strong>{authMode === 'register' ? 'You are on the list.' : 'You are logged in.'}</strong>
                <span>{authMode === 'register' ? 'Your MotionKit workspace is ready to explore.' : 'Welcome back to your motion workspace.'}</span>
                <button className="auth-submit" type="button" onClick={() => setAuthOpen(false)}>Continue exploring <ArrowUpRight size={17} /></button>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleAuthSubmit}>
                {authMode === 'register' && <label>Full name<input required name="name" placeholder="Your name" autoComplete="name" /></label>}
                <label>Email address<input required name="email" type="email" placeholder="you@example.com" autoComplete="email" /></label>
                <label>Password<input required name="password" minLength={6} type="password" placeholder="At least 6 characters" autoComplete={authMode === 'register' ? 'new-password' : 'current-password'} /></label>
                {authMode === 'register' && (
                  <>
                    <label>Confirm password<input required name="confirmPassword" minLength={6} type="password" placeholder="Repeat your password" autoComplete="new-password" /></label>
                    <label>What best describes you?
                      <select name="role" defaultValue="" required>
                        <option value="" disabled>Select your role</option>
                        <option>Student</option>
                        <option>Working professional</option>
                        <option>Founder</option>
                        <option>Designer</option>
                        <option>Developer</option>
                      </select>
                    </label>
                  </>
                )}
                <button className="auth-submit" type="submit">{authMode === 'register' ? 'Create account' : 'Log in'} <ArrowUpRight size={17} /></button>
              </form>
            )}
            <p className="auth-switch">
              {authMode === 'register' ? 'Already registered?' : 'New to MotionKit?'}
              <button type="button" onClick={() => { setAuthMode(authMode === 'register' ? 'login' : 'register'); setAuthSubmitted(false); setAuthError('') }}>
                {authMode === 'register' ? 'Log in' : 'Create an account'}
              </button>
            </p>
          </section>
        </div>
      )}
      <div className="page-content">
      <nav className="nav-item relative z-30 mx-auto flex max-w-[1440px] items-start justify-between px-5 py-5 sm:px-10 lg:px-14">
        <div className="relative">
          <button
            className="pill-button group flex items-center gap-3 px-4 py-2.5 text-sm font-extrabold uppercase tracking-tight"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-yellow transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
              {menuOpen ? <X size={16} strokeWidth={3} /> : <Menu size={16} strokeWidth={3} />}
            </span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
          <div ref={menuPanelRef} id="site-menu" className="site-menu absolute left-0 top-[calc(100%+14px)] hidden w-[min(330px,calc(100vw-40px))] origin-top-left rounded-[1.5rem] border-[3px] border-ink bg-white p-4 text-left shadow-[6px_7px_0_#111]">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  ref={(element) => { menuItemsRef.current[index] = element }}
                  className="menu-link group flex items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-yellow"
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-ink/45">{link.number}</span>
                    <span className="menu-label" data-label={link.label}>
                      <span className="menu-label-front">{link.label}</span>
                      <span className="menu-label-back">{link.label}</span>
                    </span>
                  </span>
                  <ChevronRight size={17} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <a className="brand-logo group mt-1 flex items-center gap-1 text-[2rem] leading-none tracking-[-0.1em]" href="/" aria-label="MotionKit home">
          <span className="brand-word-main">MOTION<span className="brand-word-accent">KIT</span></span><span className="brand-dot text-yellow">.</span>
        </a>
        {currentUser ? (
          <Link className="pill-button group flex items-center gap-2 px-4 py-3 text-sm font-extrabold uppercase tracking-tight" to="/profile">
            <UserRound size={17} strokeWidth={3} /> {currentUser.name.split(' ')[0]}
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} strokeWidth={3} />
          </Link>
        ) : (
          <button className="pill-button group flex items-center gap-2 px-4 py-3 text-sm font-extrabold uppercase tracking-tight" type="button" onClick={() => openAuth()}>
            Get started <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} strokeWidth={3} />
          </button>
        )}
      </nav>

      <section id="home" className="relative mx-auto flex min-h-[calc(100vh-76px)] max-w-[1440px] flex-col items-center px-5 pb-8 pt-8 text-center sm:px-10 sm:pt-12 lg:px-14 lg:pt-14">
        <div className="hero-spark absolute left-[22%] top-10 text-yellow"><Sparkles size={42} fill="currentColor" strokeWidth={2.5} /></div>
        <div className="hero-spark absolute right-[20%] top-24 hidden text-yellow sm:block"><Sparkles size={28} fill="currentColor" strokeWidth={2.5} /></div>

        <FloatingCard className="left-[5%] top-[25%] w-44 lg:left-[8%]" eyebrow="Magnetic" rotate={-9}>
          <div className="flex items-center justify-center rounded-xl bg-yellow px-5 py-4">
            <div className="relative h-14 w-14 rounded-full border-[3px] border-ink bg-yellow shadow-[3px_3px_0_#111]">
              <MousePointer2 className="absolute -bottom-4 -right-4 fill-white" size={28} strokeWidth={3} />
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="right-[5%] top-[29%] w-48 lg:right-[8%]" eyebrow="Tilt card" rotate={8}>
          <div className="relative h-20 rounded-lg border-2 border-ink bg-blue p-2">
            <div className="h-full rounded border-2 border-dashed border-white/80 p-2 text-left text-[10px] font-black text-white">
              <span className="block text-2xl">↗</span> MOVE WITH PURPOSE
            </div>
          </div>
        </FloatingCard>

        <div id="animations" className="hero-kicker mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-blue" /> The animation toolkit for the web
        </div>

        <div className="relative z-20 max-w-5xl">
          <div className="overflow-hidden">
            <h1 className="hero-title-line hero-heading text-[clamp(4.8rem,12vw,12rem)] uppercase">
              Animations
            </h1>
          </div>
          <div className="relative overflow-visible">
            <h1 className="hero-title-line hero-heading relative z-10 text-[clamp(4.8rem,12vw,12rem)] uppercase">
              <span className="relative inline-block text-yellow text-shadow">
                in one
                <span className="scribble-underline" />
              </span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-title-line hero-heading text-[clamp(4.8rem,12vw,12rem)] uppercase">
              line?
            </h1>
          </div>

          <p className="hero-copy mx-auto mt-8 max-w-xl text-base font-medium leading-relaxed text-ink/70 sm:text-lg">
            Install once. Use any animation by name.<br className="hidden sm:block" /> No more three-day GSAP rabbit holes.
          </p>

          <div id="components" className="hero-actions mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-[2rem] border-[3px] border-ink bg-white p-2.5 shadow-[5px_6px_0_#111]">
            {componentNames.map((name, index) => (
              <span key={name} className={`rounded-full border-2 border-ink px-3 py-2 text-xs font-bold ${index === 3 ? 'bg-paper' : 'bg-white'}`}>
                {index < 3 && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue" />}
                {name}
              </span>
            ))}
            <a href="#components" className="group flex items-center gap-2 rounded-full border-2 border-ink bg-yellow px-4 py-2.5 text-xs font-black uppercase transition-transform hover:-translate-y-1">
              Browse components <ArrowUpRight size={16} strokeWidth={3} />
            </a>
          </div>
        </div>

        <div className="mascot mascot-position mascot-left pointer-events-none absolute left-0 z-10 hidden w-[clamp(165px,19vw,270px)] sm:block lg:left-[2%]">
          <img src={mascot1} alt="" className="h-auto w-full drop-shadow-[5px_7px_0_rgba(16,16,16,0.14)]" />
        </div>
        <div className="mascot mascot-position mascot-right pointer-events-none absolute right-0 z-10 hidden w-[clamp(165px,19vw,270px)] sm:block lg:right-[2%]">
          <img src={mascot2} alt="" className="h-auto w-full drop-shadow-[5px_7px_0_rgba(16,16,16,0.14)]" />
        </div>

        <div className="mt-auto flex flex-col items-center gap-3 pt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/60">
          <span>Beautiful&nbsp;&nbsp; • &nbsp;&nbsp;GSAP powered&nbsp;&nbsp; • &nbsp;&nbsp;Production ready</span>
          <span className="animate-bounce text-ink">↓ &nbsp; Scroll to explore</span>
        </div>
      </section>

      <div className="marquee border-y-[3px] border-ink bg-ink py-4 text-yellow" aria-label="MotionKit animation features">
        <div className="marquee-track flex w-max items-center">
          <span className="marquee-content">✦ Magnetic&nbsp;&nbsp;&nbsp; ✦ Scroll reveal&nbsp;&nbsp;&nbsp; ✦ Cursor trail&nbsp;&nbsp;&nbsp; ✦ Text scramble&nbsp;&nbsp;&nbsp; ✦ Marquee&nbsp;&nbsp;&nbsp; ✦ Parallax&nbsp;&nbsp;&nbsp;</span>
          <span className="marquee-content" aria-hidden="true">✦ Magnetic&nbsp;&nbsp;&nbsp; ✦ Scroll reveal&nbsp;&nbsp;&nbsp; ✦ Cursor trail&nbsp;&nbsp;&nbsp; ✦ Text scramble&nbsp;&nbsp;&nbsp; ✦ Marquee&nbsp;&nbsp;&nbsp; ✦ Parallax&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <section id="how-it-works" className="steps-section relative mx-auto max-w-[1440px] px-5 py-24 sm:px-10 lg:px-14">
        <div className="steps-header steps-reveal relative z-10 mx-auto max-w-4xl text-center">
          <span className="section-pill"><Sparkles size={14} fill="currentColor" /> How it works</span>
          <h2 className="steps-title mt-6">
            Three steps. <span>Zero pain.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            From install to production-ready motion, MotionKit keeps the setup simple and the results seriously smooth.
          </p>
        </div>

        <div className="steps-grid relative z-10 mt-16 grid gap-6 lg:grid-cols-3">
          <article className="step-card step-card-white steps-reveal">
            <div className="step-number">01</div>
            <span className="step-kicker">Install</span>
            <h3>One command.<br />Done.</h3>
            <div className="code-window">
              <div className="window-bar"><i /><i /><i /><span>Terminal</span></div>
              <code><b>$</b> npm i motionkit<span className="code-caret" /></code>
            </div>
            <img className="step-mascot step-mascot-star" src={mascot1} alt="" />
          </article>

          <article className="step-card step-card-yellow steps-reveal">
            <div className="step-number">02</div>
            <span className="step-kicker">Import</span>
            <h3>Add it once.<br />Use it anywhere.</h3>
            <div className="code-window">
              <div className="window-bar"><i /><i /><i /><span>page.jsx</span></div>
              <code><em>import</em> <strong>"motionkit"</strong></code>
            </div>
            <div className="mini-magnet" aria-hidden="true"><span /><span /></div>
          </article>

          <article className="step-card step-card-blue steps-reveal">
            <div className="step-number">03</div>
            <span className="step-kicker">Use by name</span>
            <h3>Call any animation<br />like a tag.</h3>
            <div className="code-window">
              <div className="window-bar"><i /><i /><i /><span>page.jsx</span></div>
              <code><strong>&lt;MagneticButton /&gt;</strong></code>
            </div>
            <div className="try-button">TRY ME <MousePointer2 size={22} /></div>
            <img className="step-mascot step-mascot-magnet" src={mascot2} alt="" />
          </article>
        </div>

        <div id="docs" className="steps-footer steps-reveal">
          <div className="component-rail">
            {['<TextReveal />', '<TiltCard />', '<CursorTrail />', '<Marquee />', '+36 more'].map((item) => (
              <span key={item}><i />{item}</span>
            ))}
          </div>
          <p>Same steps. Any component.</p>
          <a className="docs-button" href="#docs">Read the docs <ArrowUpRight size={18} strokeWidth={3} /></a>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true">
        <span className="section-divider-line" />
        <span className="section-divider-copy">Built for better movement <b>✦</b> keep scrolling</span>
        <span className="section-divider-line" />
      </div>

      <section id="comparison" className="comparison-section relative mx-auto max-w-[1440px] overflow-hidden px-4 pb-28 pt-8 sm:px-8 lg:px-14">
        <div className="comparison-heading comparison-reveal mx-auto max-w-3xl text-center">
          <span className="section-pill"><Sparkles size={14} fill="currentColor" /> Why MotionKit</span>
          <h2 className="steps-title mt-6">Less noise. <span>More motion.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Skip the messy setup and ship expressive interactions that feel intentional from the first frame.
          </p>
        </div>

        <div className="comparison-board relative mx-auto mt-16 max-w-[1240px]">
          <div className="comparison-panel comparison-panel-good">
            <div className="comparison-side-label">MOTIONKIT WAY</div>
            <div className="comparison-side-title">MOTIONKIT WAY</div>
          </div>
          <div className="comparison-panel comparison-panel-bad">
            <div className="comparison-side-label">OLD WORKFLOW</div>
            <div className="comparison-side-title">OLD WORKFLOW</div>
          </div>
          <div className="comparison-rows">
            {comparisonRows.map(([good, bad], index) => (
              <div className="comparison-row" key={good}>
                <span>{good}</span>
                <span>{bad}</span>
                <i aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="comparison-badge" aria-hidden="true">
            <small>MOTION</small>
            <strong>99</strong>
            <span>×</span>
          </div>
        </div>
      </section>

      <section id="playground" className="bag-section relative mx-auto max-w-[1440px] overflow-hidden px-5 pb-32 pt-20 sm:px-10 lg:px-14">
        <div className="bag-copy relative z-10 mx-auto max-w-3xl text-center">
          <span className="section-pill"><Sparkles size={14} fill="currentColor" /> Pack your motion</span>
          <h2 className="steps-title mt-6">Carry your <span>best ideas.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Your motion toolkit is packed and ready. Pick a component, drop it in, and keep building without the setup spiral.
          </p>
        </div>

        <div className="bag-visual relative mx-auto mt-12 max-w-[1120px]">
          <div className="bag-glow" aria-hidden="true" />
          <div className="bag-card bag-card-left">
            <strong>01</strong>
            <span>Pick a motion</span>
            <small>Magnetic · Reveal · Tilt</small>
          </div>
          <div className="bag-card bag-card-right">
            <strong>02</strong>
            <span>Drop it in</span>
            <small>One import. Zero fuss.</small>
          </div>
          <div className="bag-card bag-card-bottom">
            <strong>03</strong>
            <span>Ship with feeling</span>
            <small>Small details, big impact.</small>
          </div>
          <img className="bag-image" src={bag} alt="Yellow MotionKit backpack ready for animation components" />
          <div className="bag-badge" aria-hidden="true">
            <small>MOTION</small>
            <strong>99</strong>
            <span>×</span>
          </div>
          <div className="bag-note">READY WHEN YOU ARE <ArrowUpRight size={16} strokeWidth={3} /></div>
        </div>
      </section>

      <section id="components-showcase" className="showcase-section relative mx-auto max-w-[1440px] overflow-hidden px-5 pb-28 pt-24 sm:px-10 lg:px-14">
        <div className="showcase-heading relative z-10 mx-auto max-w-5xl text-center">
          <span className="section-pill"><Sparkles size={14} fill="currentColor" /> Live components</span>
          <h2 className="steps-title mt-6">Touch it. <span>Break it.</span> Ship it.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Hover any card. Every component is live, expressive, and ready to drop into your next build.
          </p>
        </div>

        <div className="showcase-grid mx-auto mt-14 max-w-[1180px]">
          {showcaseCards.map((card, index) => (
            <article
              className={`showcase-card showcase-card-${card.tone} showcase-card-${card.type}`}
              data-rotation={[-8, -4, -2, 0, 3, 5, 8][index]}
              key={card.name}
            >
              <div className="showcase-live"><i /> LIVE</div>
              <div className="showcase-art">
                <span className="showcase-art-label">{card.label}</span>
                {card.type === 'magnetic' && <MousePointer2 className="showcase-pointer" size={55} strokeWidth={2.5} />}
                {card.type === 'scramble' && <><strong>H3LLO</strong><strong>WORLD</strong></>}
                {card.type === 'tilt' && <div className="showcase-layered"><span>↗</span><b>TILT</b></div>}
                {card.type === 'cursor' && <><MousePointer2 className="showcase-pointer showcase-pointer-blue" size={48} strokeWidth={2.5} /><span className="showcase-cursor-dot" /></>}
                {card.type === 'marquee' && <div className="showcase-ribbon"><span>✦ MOTIONKIT ✦ MOTIONKIT ✦</span><span>✦ MOTIONKIT ✦ MOTIONKIT ✦</span></div>}
                {card.type === 'parallax' && <div className="showcase-layered showcase-layered-blue"><span>●</span><b>SHIFT</b></div>}
                {card.type === 'reveal' && <><strong>SCROLL</strong><strong>REVEAL</strong></>}
              </div>
              <div className="showcase-card-footer">&lt;{card.name} /&gt;</div>
            </article>
          ))}
        </div>

        <div className="showcase-footer relative z-10 mx-auto mt-10 flex max-w-[980px] flex-col items-center justify-between gap-5 sm:flex-row">
          <p>Hover any card. Every component is live — drag, tilt, scramble, pull.</p>
          <a className="showcase-cta" href="#components">View all components <ArrowUpRight size={17} strokeWidth={3} /></a>
        </div>
      </section>

      <section className="final-section relative mx-auto max-w-[1440px] overflow-hidden px-4 pb-4 pt-16 sm:px-8 lg:px-14">
        <div className="faq-section relative overflow-hidden rounded-[2rem] bg-ink px-5 py-16 text-white sm:px-10 sm:py-20">
          <div className="faq-glow faq-glow-left" aria-hidden="true" />
          <div className="faq-glow faq-glow-right" aria-hidden="true" />
          <div className="faq-layout relative z-10 mx-auto mt-4 max-w-6xl">
            <div className="faq-heading">
              <span className="final-pill"><Sparkles size={14} fill="currentColor" /> Ask the motion system</span>
              <h2 className="faq-title mt-6">Questions? <span>Good.</span></h2>
              <p className="mt-5 max-w-sm text-white/65">
                The quick answers to help you move from “how?” to “shipped.”
              </p>
              <div className="faq-stamp" aria-hidden="true"><strong>MK</strong><span>37+<br />MOTIONS</span></div>
              <div className="faq-side-note">CURIOUS BY DEFAULT <Sparkles size={15} fill="currentColor" /></div>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`} key={item.question}>
                    <button className="faq-question" type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                      <span className="faq-number">0{index + 1}</span>
                      <span>{item.question}</span>
                      <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className="faq-answer" aria-hidden={!isOpen}>
                      <p>{item.answer}</p>
                      <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </div>
                )
              })}
              <div className="faq-bottom flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <span>Still curious? Start with one component.</span>
                <a className="final-button final-button-light" href="#components-showcase">Explore components <ArrowUpRight size={18} strokeWidth={3} /></a>
              </div>
            </div>
          </div>
        </div>

        <footer id="footer" className="site-footer relative mt-4 overflow-hidden rounded-[2rem] bg-ink px-5 pb-4 pt-10 text-white sm:px-10 sm:pt-12">
          <div className="grid gap-10 border-b border-white/25 pb-10 sm:grid-cols-[1.25fr_0.8fr_0.8fr_1.25fr]">
            <div className="site-footer-column">
              <div className="footer-logo">MOTION<span>KIT</span><b>.</b></div>
              <p className="mt-2 max-w-xs text-sm text-white/65">Animations in one line.</p>
              <div className="footer-socials mt-6">
                <a href="#home" aria-label="GitHub"><Github size={17} /></a>
                <a href="#home" aria-label="LinkedIn"><Linkedin size={17} /></a>
                <a href="#home" aria-label="Instagram"><Instagram size={17} /></a>
              </div>
            </div>
            <div className="site-footer-column">
              <span className="footer-heading">Product</span>
              <a href="#components-showcase">Components</a>
              <a href="#docs">Docs</a>
              <a href="#animations">Changelog</a>
              <a href="#comparison">Roadmap</a>
            </div>
            <div className="site-footer-column">
              <span className="footer-heading">Resources</span>
              <a href="#components">Getting started</a>
              <a href="#home">GitHub</a>
              <a href="#docs">Report a bug</a>
              <a href="#docs">Request a component</a>
            </div>
            <div className="site-footer-column footer-newsletter">
              <span className="footer-heading">New components, straight to your inbox.</span>
              <form onSubmit={(event) => event.preventDefault()}>
                <Mail size={18} />
                <input aria-label="Email address" type="email" placeholder="your@email.dev" />
                <button type="submit">Notify me <Rocket size={15} /></button>
              </form>
            </div>
          </div>
          <div className="footer-wordmark" aria-hidden="true">MOTIONKIT<span>.</span></div>
          <div className="footer-bottom">
            <span>© 2026 MotionKit. Built with GSAP + React.</span>
            <span>Made with <b>♥</b> for better motion.</span>
            <a href="#home">Back to top ↑</a>
          </div>
        </footer>
      </section>
      </div>
    </main>
  )
}

export default App
