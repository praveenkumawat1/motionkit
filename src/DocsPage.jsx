import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, Copy, MousePointer2, Play, ScrollText, Sparkles, Terminal, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import CustomCursor from './CustomCursor'

const sections = [
  { id: 'quickstart', label: 'Quick start', number: '01' },
  { id: 'components', label: 'Components', number: '02' },
  { id: 'reference', label: 'API reference', number: '03' },
  { id: 'triggers', label: 'Triggers', number: '04' },
  { id: 'customize', label: 'Customize', number: '05' },
  { id: 'accessibility', label: 'Accessibility', number: '06' },
  { id: 'api', label: 'API server', number: '07' },
  { id: 'production', label: 'Production', number: '08' },
]

const installCode = `npm install motionkit`
const setupCode = `import 'motionkit/styles.css'
import { MagneticButton, ScrollReveal } from 'motionkit'

export default function App() {
  return (
    <ScrollReveal>
      <MagneticButton>Start building</MagneticButton>
    </ScrollReveal>
  )
}`
const componentCode = `import { MagneticButton } from 'motionkit'

export default function Hero() {
  return (
    <MagneticButton strength={0.22}>
      Start building <ArrowUpRight />
    </MagneticButton>
  )
}`
const triggerCode = `import { ScrollReveal } from 'motionkit'

<ScrollReveal
  trigger="enter"
  duration={0.8}
  ease="power3.out"
>
  <h2>Motion with purpose.</h2>
</ScrollReveal>`
const apiCode = `fetch('/api/components?premium=false')
  .then((response) => response.json())
  .then(({ components }) => {
    console.log(components)
  })`
const accessibilityCode = `import { ScrollReveal, useMotionKit } from 'motionkit'

function AccessibleSection() {
  const { prefersReducedMotion } = useMotionKit()

  return (
    <ScrollReveal once>
      <section aria-label="Featured work">
        <h2>Motion that stays usable</h2>
        {!prefersReducedMotion && <CursorTrail />}
      </section>
    </ScrollReveal>
  )
}`
const productionCode = `// app entry: import once
import 'motionkit/styles.css'

// keep motion on compositor-friendly properties
<ScrollReveal threshold={0.25} once>
  <Card />
</ScrollReveal>`

function CodeBlock({ children, onCopy, copied }) {
  return <div className="docs-code"><div className="docs-code-bar"><span><i /><i /><i /></span><b>example.jsx</b><button type="button" onClick={onCopy}>{copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}</button></div><pre><code>{children}</code></pre></div>
}

export default function DocsPage() {
  const [copied, setCopied] = useState('')
  const copy = async (value, key) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    window.setTimeout(() => setCopied(''), 1500)
  }

  return (
    <main className="docs-page">
      <CustomCursor />
      <nav className="docs-nav">
        <Link className="brand-logo flex items-center gap-1 text-[2rem] leading-none" style={{ letterSpacing: '-0.1em' }} to="/">MOTION<span className="brand-word-accent">KIT</span><b className="text-yellow">.</b></Link>
        <Link className="components-back" to="/"><ArrowLeft size={17} strokeWidth={3} /> Back home</Link>
      </nav>
      <header className="docs-hero">
        <span className="section-pill"><Sparkles size={14} fill="currentColor" /> MotionKit documentation</span>
        <h1>Ship motion<br /><em>with purpose.</em></h1>
        <p>Everything you need to install, compose and customize expressive interactions without starting from a blank GSAP timeline.</p>
        <div className="docs-hero-actions"><a href="#quickstart" className="docs-primary-button">Start here <ArrowRight size={16} /></a><Link to="/components" className="docs-secondary-button">Browse components <ArrowUpRight size={16} /></Link></div>
      </header>
      <div className="docs-layout">
        <aside className="docs-sidebar"><span>On this page</span>{sections.map((section) => <a href={`#${section.id}`} key={section.id}><b>{section.number}</b>{section.label}<ChevronRight size={14} /></a>)}<div className="docs-sidebar-note"><Zap size={15} /><span>Built for React<br />and GSAP.</span></div></aside>
        <div className="docs-content">
          <section className="docs-section" id="quickstart"><div className="docs-section-title"><span>01 / Quick start</span><h2>Install once.<br /><em>Move everywhere.</em></h2></div><p className="docs-lead">MotionKit gives you named, reusable animations. Install the package, import the interaction you need and keep your attention on the interface.</p><CodeBlock onCopy={() => copy(installCode, 'install')} copied={copied === 'install'}>{installCode}</CodeBlock><div className="docs-note"><Terminal size={17} /><span><strong>Already using Vite?</strong> You are ready to go. MotionKit works with React 18+, Vite, Next.js and standard CSS.</span></div></section>
          <section className="docs-section" id="components"><div className="docs-section-title"><span>02 / Components</span><h2>Import a feeling.</h2></div><p className="docs-lead">Every component has a small API and sensible defaults. Start with the preset, then tune only the values that matter to your brand.</p><CodeBlock onCopy={() => copy(componentCode, 'component')} copied={copied === 'component'}>{componentCode}</CodeBlock><div className="docs-component-grid"><article><div className="docs-demo docs-demo-magnetic"><MousePointer2 size={25} /><span>MAGNETIC</span></div><strong>MagneticButton</strong><small>Moves toward intent.</small></article><article><div className="docs-demo docs-demo-reveal"><span>SCROLL</span><b>REVEAL</b></div><strong>ScrollReveal</strong><small>Arrives on cue.</small></article><article><div className="docs-demo docs-demo-cursor"><Play size={18} fill="currentColor" /><i /><i /></div><strong>CursorTrail</strong><small>Follows attention.</small></article></div></section>
          <section className="docs-section" id="reference"><div className="docs-section-title"><span>03 / API reference</span><h2>Small props.<br /><em>Clear control.</em></h2></div><p className="docs-lead">MotionKit components are deliberately composable. Start with the defaults, then add only the prop that expresses the interaction you need.</p><div className="docs-reference"><div><b>MagneticButton</b><code>children</code><span>Any React node rendered inside the button.</span><code>strength</code><span>Pointer attraction from 0 to 1. Default: 0.22.</span><code>className</code><span>Your existing styles are merged safely.</span></div><div><b>ScrollReveal</b><code>children</code><span>Content that enters when it reaches the viewport.</span><code>threshold</code><span>Intersection ratio from 0 to 1. Default: 0.2.</span><code>once</code><span>Keep visible after entering. Default: true.</span></div><div><b>CursorTrail</b><code>color / size</code><span>Customize the ring without writing pointer listeners.</span><code>className</code><span>Add a project-specific visual layer.</span></div></div><CodeBlock onCopy={() => copy(setupCode, 'setup')} copied={copied === 'setup'}>{setupCode}</CodeBlock></section>
          <section className="docs-section" id="triggers"><div className="docs-section-title"><span>04 / Triggers</span><h2>Choose the<br /><em>right moment.</em></h2></div><p className="docs-lead">A good animation starts with a clear trigger. Use hover for feedback, scroll for storytelling and click for confirmation. If an animation does not communicate state, remove it.</p><div className="docs-trigger-list"><div><span><MousePointer2 size={17} /></span><strong>Hover</strong><small>Immediate feedback and affordance. Keep it under 300ms.</small><code>MagneticButton</code></div><div><span><ScrollText size={17} /></span><strong>Scroll</strong><small>Reveals, depth and long-form pacing. Use once for content.</small><code>ScrollReveal</code></div><div><span><Zap size={17} /></span><strong>Click</strong><small>State changes and confirmation. Never hide essential feedback.</small><code>onClick + state</code></div></div><CodeBlock onCopy={() => copy(triggerCode, 'trigger')} copied={copied === 'trigger'}>{triggerCode}</CodeBlock></section>
          <section className="docs-section" id="customize"><div className="docs-section-title"><span>05 / Customize</span><h2>Tune the<br /><em>feeling.</em></h2></div><p className="docs-lead">Motion is a system of timing, distance and easing. Change one variable at a time and keep the user’s attention as the guide.</p><div className="docs-props"><div><b>duration</b><span>How long the move takes.</span><code>0.18 — 0.8s</code></div><div><b>threshold</b><span>When scroll content becomes visible.</span><code>0.1 — 0.4</code></div><div><b>strength</b><span>How far a pointer interaction travels.</span><code>0.12 — 0.3</code></div><div><b>once</b><span>Prevent repeated scroll choreography.</span><code>true</code></div></div><div className="docs-best-practices"><h3>Keep it intentional.</h3><ul><li><Check size={15} /> Animate to clarify hierarchy, not to decorate every pixel.</li><li><Check size={15} /> Prefer transform and opacity for smooth performance.</li><li><Check size={15} /> Respect reduced-motion preferences in production.</li><li><Check size={15} /> Keep one dominant movement per viewport.</li></ul></div></section>
          <section className="docs-section" id="accessibility"><div className="docs-section-title"><span>06 / Accessibility</span><h2>Motion that<br /><em>respects people.</em></h2></div><p className="docs-lead">Every primitive includes a reduced-motion fallback. The layout stays visible, the content stays readable and decorative cursor effects disappear automatically when a user asks for less motion.</p><div className="docs-access-grid"><div><b>01 / REDUCE</b><strong>Respect the OS preference.</strong><span>MotionKit uses <code>prefers-reduced-motion</code> so users do not need to configure every page manually.</span></div><div><b>02 / KEEP</b><strong>Keep content in the DOM.</strong><span>Reveal effects only change presentation. Do not put essential information behind animation state.</span></div><div><b>03 / TEST</b><strong>Keyboard first.</strong><span>Use real buttons and links, visible focus states and motion-independent success feedback.</span></div></div><CodeBlock onCopy={() => copy(accessibilityCode, 'accessibility')} copied={copied === 'accessibility'}>{accessibilityCode}</CodeBlock></section>
          <section className="docs-section" id="api"><div className="docs-section-title"><span>07 / API server</span><h2>Use the<br /><em>real catalog.</em></h2></div><p className="docs-lead">The included Express server exposes the component catalog, plan data, health status and premium entitlement preview. Run it beside Vite when you want dynamic data instead of hardcoded page content.</p><CodeBlock onCopy={() => copy('npm run server', 'server')} copied={copied === 'server'}>{'npm run server'}</CodeBlock><div className="docs-api-grid"><div><b>GET /api/health</b><span>Server status and uptime.</span></div><div><b>GET /api/components</b><span>Free catalog by default.</span></div><div><b>GET /api/components?premium=true</b><span>Full catalog for entitled clients.</span></div><div><b>GET /api/plans</b><span>Starter, Pro and Studio plans.</span></div></div><CodeBlock onCopy={() => copy(apiCode, 'api')} copied={copied === 'api'}>{apiCode}</CodeBlock><div className="docs-note"><Zap size={17} /><span><strong>Production note:</strong> entitlement preview is intentionally demo-only. Connect Stripe, Lemon Squeezy or your auth provider before granting premium access in production.</span></div></section>
          <section className="docs-section" id="production"><div className="docs-section-title"><span>08 / Production</span><h2>Ship a<br /><em>faster interface.</em></h2></div><p className="docs-lead">Use this checklist before releasing motion to users. It keeps animation expressive without turning it into layout instability or a performance tax.</p><div className="docs-production-list"><div><span>01</span><strong>Install once</strong><small>Import <code>motionkit/styles.css</code> once in your app entry, not in every component.</small></div><div><span>02</span><strong>Animate the compositor</strong><small>Prefer transform and opacity. Avoid repeatedly animating layout properties such as width, top or left.</small></div><div><span>03</span><strong>Measure the real page</strong><small>Test on a mid-range phone with DevTools CPU throttling and reduced-motion enabled.</small></div><div><span>04</span><strong>Keep the bundle clean</strong><small>Use named imports so bundlers can tree-shake unused primitives.</small></div></div><CodeBlock onCopy={() => copy(productionCode, 'production')} copied={copied === 'production'}>{productionCode}</CodeBlock></section>
        </div>
      </div>
      <footer className="docs-footer"><span>Ready to move?</span><Link to="/components">Explore the full library <ArrowUpRight size={17} /></Link></footer>
    </main>
  )
}
