import { useState } from 'react'
import { ArrowDownToLine, ArrowRight, Check, ChevronDown, LoaderCircle, MousePointer2, Play, Plus, Sparkles } from 'lucide-react'
import FillButton from './FillButton'

export default function ButtonPreview({ name }) {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  if (name === 'FillButton') return <FillButton />
  if (name === 'MagneticButton') return <button className="button-preview magnetic-preview" type="button" onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--mx', `${(event.clientX - rect.left - rect.width / 2) * .12}px`); event.currentTarget.style.setProperty('--my', `${(event.clientY - rect.top - rect.height / 2) * .12}px`) }} onMouseLeave={(event) => { event.currentTarget.style.setProperty('--mx', '0px'); event.currentTarget.style.setProperty('--my', '0px') }}><MousePointer2 size={13} /> Magnetic</button>
  if (name === 'RippleButton') return <button className="button-preview ripple-preview" type="button" onClick={(event) => { const button = event.currentTarget; const ripple = document.createElement('i'); const rect = button.getBoundingClientRect(); ripple.style.left = `${event.clientX - rect.left}px`; ripple.style.top = `${event.clientY - rect.top}px`; button.appendChild(ripple); window.setTimeout(() => ripple.remove(), 550) }}><span>Click me</span></button>
  if (name === 'HoverLift') return <button className="button-preview lift-preview" type="button"><span>Hover lift</span><ArrowRight size={14} /></button>
  if (name === 'IconButton') return <button className="button-preview icon-preview" type="button" aria-label="Play preview"><Play size={15} fill="currentColor" /></button>
  if (name === 'ArrowButton') return <button className="button-preview arrow-preview" type="button"><span>Continue</span><ArrowRight size={15} /></button>
  if (name === 'GhostButton') return <button className="button-preview ghost-preview" type="button"><span>Learn more</span></button>
  if (name === 'SplitButton') return <div className="split-preview"><button type="button">Publish</button><button type="button" aria-label="Open publish menu" onClick={() => setActive((value) => !value)}><ChevronDown size={14} /></button>{active && <div className="split-preview-menu"><span>Publish now</span><span>Schedule</span></div>}</div>
  if (name === 'LoadingButton') return <button className="button-preview loading-preview" type="button" disabled={loading} onClick={() => { setLoading(true); window.setTimeout(() => setLoading(false), 1200) }}>{loading ? <><LoaderCircle size={14} className="spin-icon" /> Saving</> : 'Save changes'}</button>
  if (name === 'ToggleButton') return <button className={`button-preview toggle-preview ${active ? 'is-on' : ''}`} type="button" aria-pressed={active} onClick={() => setActive((value) => !value)}><span className="toggle-preview-dot" />{active ? 'On' : 'Off'}</button>
  if (name === 'ShineButton') return <button className="button-preview shine-preview" type="button"><Sparkles size={14} /> Get started</button>
  if (name === 'DownloadButton') return <button className={`button-preview download-preview ${downloaded ? 'is-downloaded' : ''}`} type="button" onClick={() => { setDownloaded(true); window.setTimeout(() => setDownloaded(false), 1500) }}>{downloaded ? <><Check size={14} /> Downloaded</> : <><ArrowDownToLine size={14} /> Download</>}</button>
  return <button className="button-preview" type="button">{name.replace('Button', '')}</button>
}
