import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, MousePointer2, Play, Sparkles, Wand2, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import CustomCursor from './CustomCursor'

const animationItems = [
  { name: 'Magnetic pull', component: 'MagneticButton', group: 'Hover', tone: 'yellow', type: 'magnetic', detail: 'Pull actions toward the cursor with a soft elastic return.', duration: '0.6s' },
  { name: 'Text scramble', component: 'TextScramble', group: 'Text', tone: 'ink', type: 'scramble', detail: 'Turn static headlines into a playful sequence of changing characters.', duration: '1.2s' },
  { name: 'Tilt perspective', component: 'TiltCard', group: 'Hover', tone: 'blue', type: 'tilt', detail: 'Map pointer position to a tactile 3D card tilt.', duration: '0.4s' },
  { name: 'Scroll reveal', component: 'ScrollReveal', group: 'Scroll', tone: 'white', type: 'reveal', detail: 'Bring copy into view with a clean, staged entrance.', duration: '0.8s' },
  { name: 'Cursor trail', component: 'CursorTrail', group: 'Cursor', tone: 'yellow', type: 'cursor', detail: 'Leave a small trail of energy behind every pointer movement.', duration: '∞' },
  { name: 'Layer shift', component: 'Parallax', group: 'Scroll', tone: 'blue', type: 'parallax', detail: 'Give layered compositions depth without heavy setup.', duration: '0.7s' },
  { name: 'Marquee loop', component: 'Marquee', group: 'Loop', tone: 'ink', type: 'marquee', detail: 'Keep important words moving in a seamless, direction-aware loop.', duration: '22s' },
  { name: 'Image reveal', component: 'ImagePeek', group: 'Hover', tone: 'white', type: 'image', detail: 'Reveal a visual layer when the user earns the interaction.', duration: '0.5s' },
]
const animationLessons = [
  { number: '01', title: 'Trigger', copy: 'The moment that starts the motion.', detail: 'hover · scroll · click · load', tone: 'yellow' },
  { number: '02', title: 'Transform', copy: 'The property that creates the feeling.', detail: 'x · opacity · scale · rotate', tone: 'blue' },
  { number: '03', title: 'Ease', copy: 'The personality of the movement.', detail: 'power3.out · elastic · sine', tone: 'ink' },
  { number: '04', title: 'Timing', copy: 'The rhythm that makes it feel right.', detail: 'duration · delay · stagger', tone: 'white' },
]
const beforeAfter = [
  { name: 'Scroll reveal', type: 'reveal', before: 'Static block', after: 'Arrives on cue', copy: 'Content starts hidden and moves into place as it enters the viewport.' },
  { name: 'Magnetic button', type: 'magnetic', before: 'Fixed target', after: 'Follows focus', copy: 'Pointer distance becomes movement, then the element springs back on leave.' },
  { name: 'Tilt card', type: 'tilt', before: 'Flat surface', after: 'Feels tactile', copy: 'The cursor position maps to rotation so the card responds like a physical object.' },
]
const motionRecipes = [
  { title: 'Scroll choreography', tag: 'Scroll', copy: 'Use progress to move a scene through a sequence instead of firing one reveal at a time.', code: 'scrollY → progress → translateY + opacity', tone: 'blue' },
  { title: 'Hover physics', tag: 'Hover', copy: 'Respond to proximity, not just a binary hover state. Small movement makes controls feel tangible.', code: 'pointer distance → spring → reset', tone: 'yellow' },
  { title: 'Transition language', tag: 'Transition', copy: 'Pair a fast entrance with a soft settle. The contrast creates clarity without slowing the interface.', code: 'duration + ease + delay = feeling', tone: 'ink' },
  { title: 'Stagger rhythm', tag: 'Sequence', copy: 'Let related elements arrive in a readable order. The eye follows the story naturally.', code: 'items × stagger(0.08) → hierarchy', tone: 'white' },
  { title: 'Micro feedback', tag: 'Feedback', copy: 'Use a ripple, nudge or color shift to confirm that an action was understood.', code: 'click → visual response → confidence', tone: 'yellow' },
  { title: 'Parallax depth', tag: 'Depth', copy: 'Move layers at different speeds to create focus, scale and a sense of space.', code: 'layer speed × scroll progress → depth', tone: 'blue' },
]
const visualConcepts = [
  { id: 'scroll', label: 'Scroll', title: 'Scroll tells the story', type: 'reveal', steps: ['ENTER', 'MOVE', 'SETTLE'], note: 'Content follows the reader.' },
  { id: 'hover', label: 'Hover', title: 'Hover gives feedback', type: 'magnetic', steps: ['NOTICE', 'RESPOND', 'RETURN'], note: 'The interface feels alive.' },
  { id: 'transition', label: 'Transition', title: 'Transition changes state', type: 'tilt', steps: ['BEFORE', 'SHIFT', 'AFTER'], note: 'Change becomes understandable.' },
  { id: 'stagger', label: 'Stagger', title: 'Stagger creates rhythm', type: 'scramble', steps: ['ONE', 'TWO', 'THREE'], note: 'The eye knows where to look.' },
  { id: 'cursor', label: 'Cursor', title: 'Cursor reveals focus', type: 'cursor', steps: ['TRACK', 'FOCUS', 'DISCOVER'], note: 'Attention gets a direction.' },
]

function Preview({ type }) {
  if (type === 'magnetic') return <div className="animation-preview-magnetic"><span>CLICK</span><MousePointer2 size={34} /></div>
  if (type === 'scramble') return <div className="animation-preview-scramble"><b>HELLO</b><strong>WORLD</strong></div>
  if (type === 'tilt') return <div className="animation-preview-tilt">MOVE<br /><span>WITH PURPOSE ↗</span></div>
  if (type === 'reveal') return <div className="animation-preview-reveal"><span>SCROLL</span><b>INTO VIEW</b></div>
  if (type === 'cursor') return <div className="animation-preview-cursor"><MousePointer2 size={37} /><i /><i /><i /></div>
  if (type === 'parallax') return <div className="animation-preview-parallax"><i /><i /><b>SHIFT</b></div>
  if (type === 'marquee') return <div className="animation-preview-marquee">✦ MOTIONKIT ✦ MOTIONKIT ✦</div>
  return <div className="animation-preview-image"><span>HOVER<br />TO REVEAL</span><i /></div>
}

export default function AnimationsPage() {
  const [filter, setFilter] = useState('All')
  const [visualId, setVisualId] = useState('scroll')
  const filters = ['All', 'Hover', 'Scroll', 'Text', 'Cursor', 'Loop']
  const visible = animationItems.filter((item) => filter === 'All' || item.group === filter)
  const visual = visualConcepts.find((concept) => concept.id === visualId) || visualConcepts[0]

  return (
    <main className="animations-page">
      <CustomCursor />
      <nav className="animations-nav">
        <Link className="brand-logo flex items-center gap-1 text-[2rem] leading-none" style={{ letterSpacing: '-0.1em' }} to="/">MOTION<span className="brand-word-accent">KIT</span><b className="text-yellow">.</b></Link>
        <Link className="components-back" to="/"><ArrowLeft size={17} strokeWidth={3} /> Back home</Link>
      </nav>
      <header className="animations-hero">
        <span className="section-pill"><Sparkles size={14} fill="currentColor" /> Animation playground</span>
        <h1>Make it<br /><em>move.</em></h1>
        <p>A field guide to the small interactions that make a digital experience feel intentional. Hover, scroll and play with every pattern.</p>
        <div className="animations-hero-line"><span /><b>08 LIVE PATTERNS</b><span /></div>
      </header>
      <section className="animation-library">
        <div className="animation-library-top">
          <div><span className="animation-kicker">Motion index / 001—008</span><h2>Pick a feeling.</h2></div>
          <div className="animation-filters">{filters.map((item) => <button className={filter === item ? 'active' : ''} key={item} type="button" onClick={() => setFilter(item)}>{item}</button>)}</div>
        </div>
        <div className="animation-grid">
          {visible.map((item, index) => (
            <article className={`animation-item animation-item-${item.tone}`} key={item.name}>
              <div className="animation-item-head"><span><i /> {item.group}</span><b>0{index + 1}</b></div>
              <div className="animation-preview"><Preview type={item.type} /><span className="animation-play"><Play size={13} fill="currentColor" /></span></div>
              <div className="animation-item-copy"><h3>{item.name}</h3><p>{item.detail}</p></div>
              <div className="animation-item-foot"><span><Clock3 size={13} /> {item.duration}</span><Link to="/components">Try component <ArrowUpRight size={14} /></Link></div>
            </article>
          ))}
        </div>
      </section>
      <section className="visual-motion-lab">
        <div className="visual-lab-heading"><span className="section-pill"><Sparkles size={14} fill="currentColor" /> Watch the idea</span><h2>Feel the<br /><em>interface move.</em></h2><div className="visual-lab-tabs">{visualConcepts.map((concept) => <button className={visual.id === concept.id ? 'active' : ''} key={concept.id} type="button" onClick={() => setVisualId(concept.id)}>{concept.label}</button>)}</div></div>
        <div className="visual-lab-stage">
          <div className="visual-lab-stage-bg" />
          <div className="visual-lab-caption"><span>INTERACTION / 00{visualConcepts.findIndex((concept) => concept.id === visual.id) + 1}</span><b>LIVE DEMO</b></div>
          <div className="visual-lab-main" key={visual.id}><div className="visual-lab-object"><Preview type={visual.type} /></div><div className="visual-lab-orbit visual-lab-orbit-one">{visual.steps[0]}</div><div className="visual-lab-orbit visual-lab-orbit-two">{visual.steps[1]}</div><div className="visual-lab-orbit visual-lab-orbit-three">{visual.steps[2]}</div></div>
          <div className="visual-lab-bottom"><div><span className="visual-lab-eyebrow">{visual.label} / {visual.note}</span><h3>{visual.title.split(' ').slice(0, 2).join(' ')}<br /><em>{visual.title.split(' ').slice(2).join(' ')}</em></h3></div><div className="visual-lab-sequence">{visual.steps.map((step, index) => <span key={step}><i>{String(index + 1).padStart(2, '0')}</i>{step}</span>)}</div></div>
        </div>
      </section>
      <section className="animation-before-after">
        <div className="animation-section-heading"><span className="section-pill"><Wand2 size={14} /> Before / after</span><h2>See the feeling<br /><em>change.</em></h2><p>Good motion does not decorate a component. It gives the user feedback, hierarchy and a reason to keep exploring.</p></div>
        <div className="before-after-list">
          {beforeAfter.map((item) => (
            <article className="before-after-row" key={item.name}>
              <div className="before-after-label"><span>{item.name}</span><small>{item.copy}</small></div>
              <div className="before-after-panel before-panel"><i />{item.before}</div>
              <ArrowRight className="before-after-arrow" size={21} />
              <div className={`before-after-panel after-panel after-${item.type}`}><Preview type={item.type} />{item.after}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="animation-how">
        <div className="animation-section-heading"><span className="section-pill"><Zap size={14} fill="currentColor" /> Under the hood</span><h2>Every move<br /><em>has a reason.</em></h2><p>MotionKit keeps the API simple, but every animation is built from the same four decisions.</p></div>
        <div className="animation-lesson-grid">{animationLessons.map((lesson) => <article className={`animation-lesson animation-lesson-${lesson.tone}`} key={lesson.number}><span>{lesson.number}</span><div><h3>{lesson.title}</h3><p>{lesson.copy}</p><code>{lesson.detail}</code></div></article>)}</div>
      </section>
      <section className="animation-recipes">
        <div className="animation-section-heading"><span className="section-pill"><Sparkles size={14} fill="currentColor" /> Motion recipes</span><h2>Patterns you<br /><em>can compose.</em></h2><p>Start with a simple idea, then choose the right motion recipe for the job. These are the building blocks behind polished product experiences.</p></div>
        <div className="motion-recipe-grid">{motionRecipes.map((recipe, index) => <article className={`motion-recipe motion-recipe-${recipe.tone}`} key={recipe.title}><div className="motion-recipe-top"><span>0{index + 1}</span><b>{recipe.tag}</b></div><h3>{recipe.title}</h3><p>{recipe.copy}</p><code>{recipe.code}</code><div className={`recipe-visual recipe-visual-${index + 1}`}><i /><i /><i /><span>PLAY</span></div></article>)}</div>
      </section>
      <section className="animation-timeline">
        <div className="animation-section-heading"><span className="section-pill"><Clock3 size={14} /> Timeline anatomy</span><h2>Watch one<br /><em>interaction.</em></h2><p>A good animation is a short story: it starts, travels, settles and leaves the interface ready for the next move.</p></div>
        <div className="timeline-board">
          <div className="timeline-header"><span>Magnetic button / hover sequence</span><b>0.00s — 0.60s</b></div>
          <div className="timeline-track"><span className="timeline-marker timeline-marker-start">START</span><span className="timeline-marker timeline-marker-peak">PEAK</span><span className="timeline-marker timeline-marker-end">RESET</span><i className="timeline-progress" /></div>
          <div className="timeline-steps"><span><b>01</b><strong>Pointer enters</strong><small>trigger</small></span><span><b>02</b><strong>Button follows</strong><small>transform</small></span><span><b>03</b><strong>Spring settles</strong><small>ease</small></span></div>
          <div className="timeline-code"><span>gsap.to(button, {`{`}</span><b>x: distance * 0.22,</b><b>ease: 'elastic.out',</b><b>duration: 0.6</b><span>{`}`})</span></div>
        </div>
      </section>
      <section className="animation-bottom">
        <div><span className="section-pill"><Zap size={14} fill="currentColor" /> Designed to compose</span><h2>One motion is nice.<br /><em>A system is better.</em></h2></div>
        <p>Combine a reveal with a magnetic button. Add a cursor trail to a parallax layer. MotionKit gives every pattern a clear API so your interface can feel expressive without feeling noisy.</p>
        <Link className="showcase-cta" to="/components">Browse all components <ArrowUpRight size={17} /></Link>
      </section>
    </main>
  )
}
