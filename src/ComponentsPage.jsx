import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, Github, Menu, Search, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import { categoryData } from './ComponentCategoryPage'
import ButtonPreview from './components/ButtonPreview'
import './components-docs.css'

const sections = [
  {
    title: 'GETTING STARTED',
    items: [
      ['Installation', 'installation'],
      ['Editor setup', 'editor-setup'],
      ['Compatibility', 'compatibility'],
      ['Upgrade guide', 'upgrade-guide'],
    ],
  },
  {
    title: 'COMPONENTS',
    items: [
      ['Buttons', 'buttons'],
      ['Scroll & reveal', 'scroll'],
      ['Text motion', 'text'],
      ['Hover & magnetic', 'hover'],
      ['Cursor & pointer', 'cursor'],
      ['Cards & layout', 'cards'],
    ],
  },
]

const tabs = ['Using Vite', 'Using React', 'Using CDN']
const setupCode = `import 'motionkit/styles.css'
import { MagneticButton } from 'motionkit'

export default function App() {
  return <MagneticButton>Try this interaction</MagneticButton>
}`
const settingsCode = `{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}`

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('Using Vite')
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('installation')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    const sectionIds = sections.flatMap((section) => section.items.map(([, id]) => id))
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sectionElements.length) return undefined

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visibleSections[0]) setActiveSection(visibleSections[0].target.id)
    }, {
      rootMargin: '-18% 0px -64% 0px',
      threshold: [0, 0.15, 0.5],
    })

    sectionElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const installCode = activeTab === 'Using CDN'
    ? '<script src="https://cdn.motionkit.dev/latest"></script>'
    : activeTab === 'Using React'
      ? 'npm install motionkit react react-dom'
      : 'npm install motionkit'

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const copyText = async (value) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main className="component-docs-page">
      <CustomCursor />
      <header className="component-docs-nav">
        <Link className="component-docs-brand" to="/" aria-label="MotionKit home">
          <span className="brand-word-main">MOTION<span className="brand-word-accent">KIT</span></span><b>.</b>
        </Link>
        <div className="component-docs-version">
          v1.0 <ChevronDown size={13} />
        </div>
        <nav className="component-docs-links" aria-label="Main navigation">
          <Link className="active" to="/components">Docs</Link>
          <Link to="/animations">Play</Link>
          <Link to="/premium">Pricing</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <button className="component-docs-mobile-toggle" type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-label="Toggle navigation">
          <Menu size={19} />
        </button>
        <div className="component-docs-search"><Search size={15} /><span>Search</span><kbd>⌘ K</kbd></div>
      </header>

      <div className="component-docs-layout">
        <aside className={`component-docs-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="component-docs-sidebar-top">
            <span>ON THIS PAGE</span>
            <Sparkles size={14} />
          </div>
          {sections.map((section) => (
            <div className="component-docs-section" key={section.title}>
              <h2>{section.title}</h2>
              <div className="component-docs-section-links">
                {section.items.map(([label, id]) => (
                  section.title === 'COMPONENTS' ? (
                    <button className={`component-docs-sidebar-link ${selectedCategory === id ? 'selected' : ''}`} type="button" key={id} onClick={() => {
                      setSelectedCategory(id)
                      setActiveSection(id)
                      setMobileMenuOpen(false)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}>
                      <span>{label}</span><small>↗</small>
                    </button>
                  ) : (
                  <a className={activeSection === id && !selectedCategory ? 'selected' : ''} href={`#${id}`} key={id} onClick={() => {
                    setSelectedCategory('')
                    setActiveSection(id)
                    setMobileMenuOpen(false)
                  }}>
                    <span>{label}</span>
                  </a>)
                ))}
              </div>
            </div>
          ))}
          <div className="component-docs-sidebar-footer">
            <span className="component-docs-status-dot" />
            <span>Built for better movement.</span>
          </div>
        </aside>

        <article className="component-docs-content">
          {selectedCategory ? <InlineCategoryContent category={selectedCategory} /> : <>
          <section className="component-docs-intro" id="installation">
            <span className="component-docs-eyebrow">INSTALLATION / 01</span>
            <h1>Build interfaces<br /><em>that move.</em></h1>
            <p>MotionKit is a small, expressive toolkit for adding purposeful animation to React interfaces. Install once, then call the interaction you need.</p>
            <div className="component-docs-intro-meta">
              <span><b>18</b> components</span>
              <span><b>GSAP</b> powered</span>
              <span><b>MIT</b> licensed</span>
            </div>
          </section>

          <section className="component-docs-article">
            <h2>Get started with MotionKit</h2>
            <p>MotionKit works with Vite, React, and any modern JavaScript setup. It is GSAP powered, keyboard-safe, and ready to drop into production.</p>
            <div className="component-docs-principles">
              <div><span>01</span><strong>Purposeful</strong><small>Motion guides attention.</small></div>
              <div><span>02</span><strong>Composable</strong><small>Small APIs, clear control.</small></div>
              <div><span>03</span><strong>Production-ready</strong><small>Accessible by default.</small></div>
            </div>

            <h3>Installation</h3>
            <div className="component-docs-tabs" role="tablist" aria-label="Installation options">
              {tabs.map((tab) => <button className={activeTab === tab ? 'active' : ''} key={tab} type="button" onClick={() => setActiveTab(tab)}>{tab}</button>)}
            </div>
            <p className="component-docs-muted">{activeTab === 'Using CDN' ? 'Add MotionKit directly to a static HTML page.' : 'Install the package in your project with one command.'}</p>
            <div className="component-docs-code">
              <div><span>Terminal</span><button type="button" onClick={copyInstall}>{copied ? <><Check size={14} /> Copied</> : 'Copy'}</button></div>
              <code><b>$</b> {installCode}</code>
            </div>

            <div className="component-docs-step">
              <span>01</span>
              <div>
                <h3>Create your first interaction</h3>
                <p>Import a component by name and keep your animation logic close to the interface it improves.</p>
                <div className="component-docs-code component-docs-code-dark">
                  <div><span>src/App.jsx</span><button type="button" onClick={() => copyText(setupCode)}>{copied ? <><Check size={14} /> Copied</> : 'Copy'}</button></div>
                  <code><i>import</i> <strong>'motionkit/styles.css'</strong>{'\n'}<i>import</i> {'{ MagneticButton }'} <i>from</i> <strong>'motionkit'</strong>{'\n\n'}<i>export default function</i> App() {'{'}{'\n  '}<span>&lt;MagneticButton&gt;</span>Try this interaction<span>&lt;/MagneticButton&gt;</span>{'\n}'}</code>
                </div>
              </div>
            </div>

            <div className="component-docs-guide">
              <div className="component-docs-guide-heading">
                <span>VISUAL INSTALL GUIDE / 02</span>
                <strong>Follow these steps</strong>
                <p>These panels show exactly where each command belongs in a fresh Vite project.</p>
              </div>
              <div className="component-docs-guide-grid">
                <article className="component-docs-guide-card">
                  <span className="component-docs-guide-number">01</span>
                  <h3>Check your setup</h3>
                  <p>Use Node.js 18 or newer and npm 9 or newer. Confirm both commands before creating the app.</p>
                  <div className="component-docs-mini-shot terminal-shot">
                    <div><i /><i /><i /><b>Terminal</b></div>
                    <code><span>$</span> node --version{'\n'}v20.11.0{'\n\n'}<span>$</span> npm --version{'\n'}10.2.4</code>
                  </div>
                </article>
                <article className="component-docs-guide-card">
                  <span className="component-docs-guide-number">02</span>
                  <h3>Create a Vite app</h3>
                  <p>If you already have a React app, skip this step and run the install command in its root folder.</p>
                  <div className="component-docs-mini-shot terminal-shot">
                    <div><i /><i /><i /><b>Terminal</b></div>
                    <code><span>$</span> npm create vite@latest my-motion-app{'\n'}<span>$</span> cd my-motion-app{'\n'}<span>$</span> npm install</code>
                  </div>
                </article>
                <article className="component-docs-guide-card">
                  <span className="component-docs-guide-number">03</span>
                  <h3>Install MotionKit</h3>
                  <p>Open the project folder in VS Code, then paste the package command into the integrated terminal.</p>
                  <div className="component-docs-mini-shot terminal-shot">
                    <div><i /><i /><i /><b>motion-app / Terminal</b></div>
                    <code><span>$</span> npm install motionkit{'\n'}{'\n'}added 1 package{'\n'}found 0 vulnerabilities</code>
                  </div>
                </article>
                <article className="component-docs-guide-card">
                  <span className="component-docs-guide-number">04</span>
                  <h3>Import the styles</h3>
                  <p>Add the stylesheet once at the top of your app entry. This gives every component its base motion styles.</p>
                  <div className="component-docs-mini-shot editor-shot">
                    <div><b>src / main.jsx</b><span>●</span></div>
                    <code><em>import</em> <strong>'motionkit/styles.css'</strong>{'\n'}<em>import</em> ReactDOM <em>from</em> <strong>'react-dom/client'</strong></code>
                  </div>
                </article>
                <article className="component-docs-guide-card">
                  <span className="component-docs-guide-number">05</span>
                  <h3>Start the dev server</h3>
                  <p>Run the local server and open the URL printed in your terminal. Vite normally uses port 5173.</p>
                  <div className="component-docs-mini-shot terminal-shot">
                    <div><i /><i /><i /><b>Terminal</b></div>
                    <code><span>$</span> npm run dev{'\n'}{'\n'}Local: http://localhost:5173/</code>
                  </div>
                </article>
                <article className="component-docs-guide-card guide-success">
                  <span className="component-docs-guide-number">06</span>
                  <h3>See the interaction</h3>
                  <p>Move your pointer over the button. It should gently follow your cursor and return smoothly when it leaves.</p>
                  <div className="component-docs-mini-shot preview-shot">
                    <span>TRY THE MOTION</span><b>↗</b>
                  </div>
                </article>
              </div>
            </div>

            <section className="component-docs-troubleshooting" id="troubleshooting">
              <span>QUICK TROUBLESHOOTING</span>
              <h2>If something does not work</h2>
              <div>
                <p><strong>“Command not found”</strong> — Install Node.js from nodejs.org, restart VS Code, and run the version checks again.</p>
                <p><strong>“Cannot find module motionkit”</strong> — Make sure your terminal is inside the folder containing package.json, then run npm install motionkit.</p>
                <p><strong>Styles are missing</strong> — Confirm <code>import 'motionkit/styles.css'</code> appears only after the package has been installed.</p>
              </div>
            </section>
          </section>

          <section className="component-docs-editor" id="editor-setup">
            <div className="component-docs-section-kicker">EDITOR SETUP / 02</div>
            <h2>Make your editor<br /><em>feel ready.</em></h2>
            <p className="component-docs-editor-lead">A clean editor makes animation work faster. Configure VS Code once, keep your files easy to find, and use the built-in feedback loop while you build.</p>

            <div className="component-docs-editor-hero">
              <div className="component-docs-editor-window">
                <div className="component-docs-window-bar"><span><i /><i /><i /></span><b>motion-app — Visual Studio Code</b><small>● main</small></div>
                <div className="component-docs-editor-body">
                  <div className="component-docs-file-tree">
                    <span>EXPLORER</span>
                    <b>⌄ MOTION-APP</b>
                    <i>⌄ src</i>
                    <strong>◻ App.jsx</strong>
                    <i>◻ main.jsx</i>
                    <i>◻ styles.css</i>
                    <i>⌄ public</i>
                    <i>◻ package.json</i>
                  </div>
                  <div className="component-docs-editor-code">
                    <div className="component-docs-code-tabs"><span>App.jsx</span><span>main.jsx</span><b>×</b></div>
                    <code><small>1</small> <em>import</em> {'{ MagneticButton }'} <em>from</em> <strong>'motionkit'</strong>{'\n'}<small>2</small>{'\n'}<small>3</small> <em>export default function</em> App() {'{'}{'\n'}<small>4</small>   <span>&lt;MagneticButton&gt;</span>{'\n'}<small>5</small>     Move your cursor here{'\n'}<small>6</small>   <span>&lt;/MagneticButton&gt;</span>{'\n'}<small>7</small> {'}'}</code>
                    <div className="component-docs-editor-status"><span>✓ Prettier</span><span>Ln 1, Col 1</span><span>JavaScript React</span></div>
                  </div>
                </div>
              </div>
              <div className="component-docs-editor-callout"><span>TIP / 01</span><strong>Keep motion close to the component.</strong><p>When the markup and interaction live together, it is easier to tune the feeling without jumping between files.</p></div>
            </div>

            <div className="component-docs-editor-grid">
              <article>
                <span className="component-docs-editor-number">01</span>
                <h3>Install the essentials</h3>
                <p>These extensions are optional, but they make React and MotionKit projects much more comfortable to edit.</p>
                <div className="component-docs-extension-list">
                  <div><b className="extension-icon purple">{'</>'}</b><span><strong>ES7+ React/Redux/React-Native Snippets</strong><small>Fast JSX component scaffolding</small></span><em>Install</em></div>
                  <div><b className="extension-icon blue">Prettier</b><span><strong>Prettier - Code formatter</strong><small>Consistent formatting on save</small></span><em>Install</em></div>
                  <div><b className="extension-icon yellow">JS</b><span><strong>JavaScript and TypeScript Nightly</strong><small>Better modern JS suggestions</small></span><em>Optional</em></div>
                </div>
              </article>
              <article>
                <span className="component-docs-editor-number">02</span>
                <h3>Use a predictable structure</h3>
                <p>Keep reusable interactions in their own folder as the project grows. Start small and split only when a component earns it.</p>
                <div className="component-docs-folder-shot">
                  <code><b>src/</b>{'\n'}  <span>components/</span>{'\n'}    MagneticButton.jsx{'\n'}    ScrollReveal.jsx{'\n'}  App.jsx{'\n'}  main.jsx{'\n'}  styles.css</code>
                </div>
              </article>
            </div>

            <div className="component-docs-editor-settings">
              <div><span>03 / Recommended settings</span><h3>Let VS Code format as you work.</h3><p>Save this as <code>.vscode/settings.json</code> in your project. It keeps JSX readable and prevents noisy formatting differences.</p></div>
              <div className="component-docs-code component-docs-code-dark"><div><span>.vscode/settings.json</span><button type="button" onClick={() => copyText(settingsCode)}>{copied ? <><Check size={14} /> Copied</> : 'Copy'}</button></div><code>{settingsCode}</code></div>
            </div>

            <div className="component-docs-editor-checklist">
              <span>EDITOR CHECKLIST</span>
              <div><p><b>✓</b> Open the folder that contains <code>package.json</code></p><p><b>✓</b> Install extensions before styling components</p><p><b>✓</b> Keep the browser and terminal visible while tuning motion</p><p><b>✓</b> Save often and check the console for warnings</p></div>
            </div>
          </section>

          <section className="component-docs-compatibility" id="compatibility">
            <div className="component-docs-section-kicker">COMPATIBILITY / 03</div>
            <h2>Works with<br /><em>your stack.</em></h2>
            <p className="component-docs-editor-lead">MotionKit stays close to standard React and CSS APIs, so it can fit into the tools you already use without changing your application architecture.</p>

            <div className="component-docs-support-grid">
              <article><span className="component-docs-support-icon">⚛</span><strong>React 18+</strong><small>Recommended</small><p>Works with function components, hooks, and React 19.</p></article>
              <article><span className="component-docs-support-icon blue">V</span><strong>Vite</strong><small>Recommended</small><p>Fast development server with zero extra configuration.</p></article>
              <article><span className="component-docs-support-icon black">N</span><strong>Next.js</strong><small>App + Pages Router</small><p>Add client boundaries to components using browser motion.</p></article>
              <article><span className="component-docs-support-icon green">JS</span><strong>Modern browsers</strong><small>Evergreen</small><p>Chrome, Edge, Firefox, and Safari with CSS transforms.</p></article>
            </div>

            <div className="component-docs-compat-table">
              <div className="component-docs-compat-row component-docs-compat-head"><span>Environment</span><span>Minimum</span><span>Status</span></div>
              <div className="component-docs-compat-row"><span>Node.js</span><b>18.0+</b><em>✓ Supported</em></div>
              <div className="component-docs-compat-row"><span>React</span><b>18.0+</b><em>✓ Supported</em></div>
              <div className="component-docs-compat-row"><span>Vite</span><b>5.0+</b><em>✓ Supported</em></div>
              <div className="component-docs-compat-row"><span>Safari</span><b>15.4+</b><em>✓ Supported</em></div>
            </div>

            <div className="component-docs-reduced-motion">
              <span>ACCESSIBILITY NOTE</span>
              <div><strong>Respect reduced motion.</strong><p>MotionKit detects the user’s <code>prefers-reduced-motion</code> preference. Keep important content visible and never use animation as the only way to communicate state.</p></div>
              <b>✓ Built in</b>
            </div>
          </section>

          <section className="component-docs-upgrade" id="upgrade-guide">
            <div className="component-docs-section-kicker">UPGRADE GUIDE / 04</div>
            <h2>Stay current.<br /><em>Move forward.</em></h2>
            <p className="component-docs-editor-lead">MotionKit releases are designed to be small and predictable. Update the package, review the changelog, then run your app’s checks before shipping.</p>

            <div className="component-docs-upgrade-flow">
              <div><span>01</span><strong>Check your version</strong><p>See which version is installed in the current project.</p><code>npm list motionkit</code></div>
              <div><span>02</span><strong>Update the package</strong><p>Install the latest compatible release.</p><code>npm install motionkit@latest</code></div>
              <div><span>03</span><strong>Verify your app</strong><p>Run the build and test the interactions in the browser.</p><code>npm run build</code></div>
            </div>

            <div className="component-docs-upgrade-notes">
              <div><span>BEFORE YOU UPGRADE</span><strong>Keep updates easy to undo.</strong><p>Commit or stash your work first. Update one dependency at a time so a visual change is easy to trace.</p></div>
              <ul>
                <li><b>Read</b> the release notes for renamed props or removed APIs.</li>
                <li><b>Search</b> your project for old component names before editing imports.</li>
                <li><b>Run</b> <code>npm run build</code> and check the browser console.</li>
              </ul>
            </div>

            <div className="component-docs-version-card">
              <div><span>VERSIONING</span><strong>Semver makes upgrades clear.</strong><p>Patch releases contain fixes, minor releases add backwards-compatible features, and major releases may require code changes.</p></div>
              <div className="component-docs-version-pills"><b>1.0.2 <small>PATCH</small></b><b>1.1.0 <small>MINOR</small></b><b>2.0.0 <small>MAJOR</small></b></div>
            </div>
          </section>

          <section className="component-docs-next" id="components">
            <div><span>NEXT UP</span><strong>Explore the component library</strong><p>Browse buttons, text effects, cards, scroll reveals, and more.</p></div>
            <Link to="/animations" aria-label="Explore animations"><ArrowUpRight size={22} /></Link>
          </section>
          </>}
        </article>
      </div>

      <footer className="component-docs-footer">
        <span>MotionKit / Documentation</span>
        <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={15} /> Open source on GitHub</a>
      </footer>
    </main>
  )
}

function InlineCategoryContent({ category }) {
  const data = categoryData[category] || categoryData.buttons
  const [copied, setCopied] = useState(false)
  const [selectedPattern, setSelectedPattern] = useState(null)
  const copyCode = async () => {
    await navigator.clipboard.writeText(data.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={`component-inline-category component-category-${data.tone}`}>
      <span className="component-docs-eyebrow">{data.eyebrow}</span>
      <h1>{data.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h1>
      <p className="component-category-lead">{data.description}</p>
      <div className="component-category-meta"><span><b>{data.components.length}</b> patterns</span><span><b>React</b> ready</span><span><b>GSAP</b> powered</span></div>
      <section className="component-category-patterns">
        <div className="component-docs-section-kicker">IN THIS CATEGORY</div>
        <h2>Choose the right<br /><em>starting point.</em></h2>
        <div className={`component-category-cards ${category === 'buttons' ? 'component-category-button-cards' : ''}`}>{data.components.map(([name, description], index) => <article key={name}><span>{String(index + 1).padStart(2, '0')}</span><ButtonPreview name={name} /><strong>&lt;{name} /&gt;</strong><p>{description}</p><button className="component-usage-button" type="button" onClick={() => setSelectedPattern({ name, description, index })}>View usage <ArrowUpRight size={14} /></button></article>)}</div>
      </section>
      <section className="component-category-code"><div><span>Example.jsx</span><button type="button" onClick={copyCode}>{copied ? <><Check size={14} /> Copied</> : 'Copy code'}</button></div><pre><code>{data.code}</code></pre></section>
      {selectedPattern && <PatternDetailModal pattern={selectedPattern} category={category} onClose={() => setSelectedPattern(null)} />}
    </div>
  )
}

function PatternDetailModal({ pattern, category, onClose }) {
  const [copied, setCopied] = useState(false)
  const code = buttonCode[pattern.name] || `import { ${pattern.name} } from 'motionkit'

<${pattern.name}>Try this interaction</${pattern.name}>`
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="component-usage-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`component-usage-modal component-usage-modal-${category}`} role="dialog" aria-modal="true" aria-labelledby="component-usage-title">
        <button className="component-usage-close" type="button" onClick={onClose} aria-label="Close details"><X size={18} /></button>
        <div className="component-usage-preview">
          <span>LIVE COMPONENT</span>
          <ButtonPreview name={pattern.name} />
          <small>Hover to preview the interaction</small>
        </div>
        <div className="component-usage-content">
          <span className="component-docs-eyebrow">COMPONENT DETAIL</span>
          <h2 id="component-usage-title">&lt;{pattern.name} /&gt;</h2>
          <p>{pattern.description} Use it when the interaction should feel clear, quick, and easy to repeat.</p>
          <div className="component-usage-tags"><span>React ready</span><span>Keyboard safe</span><span>Reduced motion</span></div>
          <h3>How it works</h3>
          <p className="component-usage-note">{buttonDetails[pattern.name] || 'The component uses a small, purposeful transition to give the user feedback without changing the layout.'}</p>
          <div className="component-usage-code"><div><span>Example.jsx</span><button type="button" onClick={copy}>{copied ? <><Check size={13} /> Copied</> : 'Copy code'}</button></div><pre><code>{code}</code></pre></div>
        </div>
      </section>
    </div>
  )
}

const buttonDetails = {
  FillButton: 'The fill layer slides from left to right on hover. The circular arrow badge rotates to reinforce direction.',
  MagneticButton: 'The button follows the pointer by a small amount, then returns to its original position when the pointer leaves.',
  RippleButton: 'Each click creates a ripple from the exact pointer position, giving immediate tactile feedback.',
  HoverLift: 'The button rises with a compact shadow on hover and returns smoothly when the pointer leaves.',
  IconButton: 'The compact icon action rotates and scales slightly while remaining keyboard accessible.',
  ArrowButton: 'The arrow shifts forward on hover, making the link direction obvious before the click.',
  GhostButton: 'A quiet underline appears only on hover, keeping secondary actions visually light.',
  SplitButton: 'The primary action stays separate from its menu control so both actions remain predictable.',
  LoadingButton: 'The spinner replaces the action state temporarily and the button becomes unavailable during the operation.',
  ToggleButton: 'The sliding dot and color change make the current on/off state visible at a glance.',
  ShineButton: 'A fast diagonal highlight sweeps across the button to draw attention without changing layout.',
  DownloadButton: 'The action changes to a success state after click so the user knows the download completed.',
}

const buttonCode = {
  FillButton: `import FillButton from './components/FillButton'

<FillButton>Explore motion</FillButton>`,
  MagneticButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="MagneticButton" />`,
  RippleButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="RippleButton" />`,
  HoverLift: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="HoverLift" />`,
  IconButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="IconButton" />`,
  ArrowButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="ArrowButton" />`,
  GhostButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="GhostButton" />`,
  SplitButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="SplitButton" />`,
  LoadingButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="LoadingButton" />`,
  ToggleButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="ToggleButton" />`,
  ShineButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="ShineButton" />`,
  DownloadButton: `import ButtonPreview from './components/ButtonPreview'

<ButtonPreview name="DownloadButton" />`,
}
