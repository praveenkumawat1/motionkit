import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Github, Menu, Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import ButtonPreview from './components/ButtonPreview'
import './components-docs.css'

export const categoryData = {
  buttons: {
    label: 'Buttons',
    eyebrow: 'BUTTONS / 01',
    title: 'Make every click\nfeel intentional.',
    description: 'Button motion should confirm intent, not compete with it. Use these patterns for calls to action, navigation, and small moments of feedback.',
    tone: 'yellow',
    components: [
      ['FillButton', 'A rounded outline button that fills smoothly on hover.'],
      ['MagneticButton', 'Pulls gently toward the pointer before returning to rest.'],
      ['RippleButton', 'Creates a soft click response at the exact point of contact.'],
      ['HoverLift', 'Raises a call to action with a small, tactile shadow.'],
      ['IconButton', 'Keeps a compact action clear with an icon and label.'],
      ['ArrowButton', 'Adds direction to links and next-step actions.'],
      ['GhostButton', 'Keeps secondary actions quiet until they are needed.'],
      ['SplitButton', 'Combines a primary action with a related menu.'],
      ['LoadingButton', 'Communicates progress without losing the button label.'],
      ['ToggleButton', 'Makes an on/off state visible and easy to change.'],
      ['ShineButton', 'Adds a quick highlight sweep to important actions.'],
      ['DownloadButton', 'Uses motion to confirm a file or asset download.'],
    ],
    code: `import { MagneticButton } from 'motionkit'\n\n<MagneticButton strength={0.22}>\n  Start building <ArrowUpRight />\n</MagneticButton>`,
  },
  scroll: {
    label: 'Scroll & reveal',
    eyebrow: 'SCROLL & REVEAL / 02',
    title: 'Let the story\narrive on cue.',
    description: 'Scroll motion gives long pages rhythm. Reveal content as it enters the viewport and use depth only where it helps users understand the layout.',
    tone: 'blue',
    components: [
      ['ScrollReveal', 'Brings content into view once it reaches a clear threshold.'],
      ['Parallax', 'Moves layers at different speeds to create depth.'],
      ['ScrollFill', 'Maps reading progress to a visible visual indicator.'],
    ],
    code: `import { ScrollReveal } from 'motionkit'\n\n<ScrollReveal once threshold={0.2}>\n  <h2>Motion with purpose.</h2>\n</ScrollReveal>`,
  },
  text: {
    label: 'Text motion',
    eyebrow: 'TEXT MOTION / 03',
    title: 'Give words\na little rhythm.',
    description: 'Text effects work best when they support hierarchy. Reveal a heading, loop a short label, or scramble secondary copy without hurting readability.',
    tone: 'purple',
    components: [
      ['TextReveal', 'Splits a heading into a clean, staggered entrance.'],
      ['TextScramble', 'Adds an energetic decode effect to short labels.'],
      ['Marquee', 'Keeps announcements and supporting phrases moving.'],
    ],
    code: `import { TextReveal } from 'motionkit'\n\n<TextReveal stagger={0.04}>\n  Build better interfaces.\n</TextReveal>`,
  },
  hover: {
    label: 'Hover & magnetic',
    eyebrow: 'HOVER & MAGNETIC / 04',
    title: 'Respond to\nattention.',
    description: 'Pointer interactions should feel immediate and lightweight. These patterns add tactile feedback while keeping the original control easy to understand.',
    tone: 'ink',
    components: [
      ['MagneticButton', 'Adds a subtle pull toward the pointer.'],
      ['TiltCard', 'Tilts a surface based on pointer position.'],
      ['GradientBorder', 'Animates the edge of a card on hover.'],
    ],
    code: `import { TiltCard } from 'motionkit'\n\n<TiltCard maxTilt={8}>\n  <ProductPreview />\n</TiltCard>`,
  },
  cursor: {
    label: 'Cursor & pointer',
    eyebrow: 'CURSOR & POINTER / 05',
    title: 'Follow the\nuser’s focus.',
    description: 'Cursor effects can make a visual surface feel responsive. Keep them decorative, preserve native controls, and provide a reduced-motion fallback.',
    tone: 'white',
    components: [
      ['CursorTrail', 'Leaves a quiet trail behind pointer movement.'],
      ['Spotlight', 'Reveals the area under the user’s focus.'],
      ['CursorLens', 'Magnifies a detail without changing the layout.'],
    ],
    code: `import { CursorTrail } from 'motionkit'\n\n<CursorTrail color="#1769ff" size={18} />`,
  },
  cards: {
    label: 'Cards & layout',
    eyebrow: 'CARDS & LAYOUT / 06',
    title: 'Add depth\nwithout clutter.',
    description: 'Cards are useful places for motion because their boundaries are clear. Use depth, stacks, and image reveals to show relationship and hierarchy.',
    tone: 'green',
    components: [
      ['TiltCard', 'Creates depth while keeping content anchored.'],
      ['StackCards', 'Fans related cards into a readable group.'],
      ['ImagePeek', 'Reveals a supporting image on hover.'],
    ],
    code: `import { StackCards } from 'motionkit'\n\n<StackCards items={projects}>\n  <ProjectCard />\n</StackCards>`,
  },
}

export default function ComponentCategoryPage() {
  const { category = 'buttons' } = useParams()
  const data = categoryData[category] || categoryData.buttons
  const [copied, setCopied] = useState(false)
  const copyCode = async () => {
    await navigator.clipboard.writeText(data.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <main className={`component-category-page component-category-${data.tone}`}>
      <CustomCursor />
      <header className="component-docs-nav">
        <Link className="component-docs-brand" to="/components" aria-label="Back to MotionKit components">
          <span className="brand-word-main">MOTION<span className="brand-word-accent">KIT</span></span><b>.</b>
        </Link>
        <div className="component-docs-version">v1.0 <ChevronDown size={13} /></div>
        <nav className="component-docs-links"><Link className="active" to="/components">Components</Link><Link to="/docs">Docs</Link><Link to="/animations">Play</Link><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></nav>
        <div className="component-docs-search"><Search size={15} /><span>Search</span><kbd>⌘ K</kbd></div>
        <button className="component-docs-mobile-toggle" type="button" aria-label="Open navigation"><Menu size={19} /></button>
      </header>
      <div className="component-category-layout">
        <aside className="component-category-sidebar">
          <Link to="/components" className="component-category-back"><ArrowLeft size={15} /> All components</Link>
          <span>COMPONENT CATEGORIES</span>
          {Object.entries(categoryData).map(([key, item], index) => <Link className={key === category ? 'selected' : ''} to={`/components/${key}`} key={key}><b>0{index + 1}</b>{item.label}<ArrowUpRight size={13} /></Link>)}
        </aside>
        <article className="component-category-content">
          <span className="component-docs-eyebrow">{data.eyebrow}</span>
          <h1>{data.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h1>
          <p className="component-category-lead">{data.description}</p>
          <div className="component-category-meta"><span><b>{data.components.length}</b> patterns</span><span><b>React</b> ready</span><span><b>GSAP</b> powered</span></div>
          <section className="component-category-patterns"><div className="component-docs-section-kicker">IN THIS CATEGORY</div><h2>Choose the right<br /><em>starting point.</em></h2>                              <div className={`component-category-cards ${category === 'buttons' ? 'component-category-button-cards' : ''}`}>{data.components.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, '0')}</span><ButtonPreview name={name} /><strong>&lt;{name} /&gt;</strong><p>{description}</p><Link to="/docs">View usage <ArrowUpRight size={14} /></Link></article>)}</div></section>
          <section className="component-category-code"><div><span>Example.jsx</span><button type="button" onClick={copyCode}>{copied ? <><Check size={14} /> Copied</> : 'Copy code'}</button></div><pre><code>{data.code}</code></pre></section>
          <Link className="component-category-footer-link" to="/components"><ArrowLeft size={16} /> Back to all components</Link>
        </article>
      </div>
      <footer className="component-docs-footer"><span>MotionKit / {data.label}</span><a href="https://github.com" target="_blank" rel="noreferrer"><Github size={15} /> Open source on GitHub</a></footer>
    </main>
  )
}
