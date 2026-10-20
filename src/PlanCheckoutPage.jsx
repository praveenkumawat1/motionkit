import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import CustomCursor from './CustomCursor'

const plans = {
  Pro: {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'The complete MotionKit library for creators shipping expressive interfaces.',
    features: ['All 28 components', 'Complete React + CSS source', 'Premium hover and scroll systems', 'Commercial projects'],
  },
  Studio: {
    name: 'Studio',
    price: '$49',
    period: 'per month',
    description: 'A team-ready motion system for studios, agencies and collaborative product teams.',
    features: ['Everything in Pro', 'Up to 10 team members', 'Private component collections', 'Priority support'],
  },
}

export default function PlanCheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')
  const plan = plans[searchParams.get('plan')] || plans.Pro

  useEffect(() => {
    try {
      const email = window.localStorage.getItem('motionkit-session')
      const users = JSON.parse(window.localStorage.getItem('motionkit-users') || '[]')
      const sessionUser = Array.isArray(users) ? users.find((item) => item.email === email) : null
      if (sessionUser) setUser(sessionUser)
      else navigate('/', { replace: true })
    } catch {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const activatePlan = (event) => {
    event.preventDefault()
    if (!termsAccepted) {
      setError('Please accept the terms and conditions to continue.')
      return
    }
    const data = new FormData(event.currentTarget)
    const users = JSON.parse(window.localStorage.getItem('motionkit-users') || '[]')
    const updatedUsers = users.map((item) => item.email === user.email ? {
      ...item,
      name: String(data.get('name') || user.name).trim(),
      company: String(data.get('company') || '').trim(),
      billingCountry: String(data.get('country') || '').trim(),
      plan: plan.name,
      planPrice: plan.price,
      planStartedAt: new Date().toISOString(),
    } : item)
    window.localStorage.setItem('motionkit-users', JSON.stringify(updatedUsers))
    navigate('/profile')
  }

  if (!user) return null

  return (
    <main className="checkout-page">
      <CustomCursor />
      <nav className="checkout-nav">
        <Link className="brand-logo" to="/">MOTION<span className="brand-word-accent">KIT</span><b className="text-yellow">.</b></Link>
        <Link className="components-back" to="/premium"><ArrowLeft size={17} strokeWidth={3} /> Back to plans</Link>
      </nav>
      <header className="checkout-hero">
        <span className="section-pill"><LockKeyhole size={14} fill="currentColor" /> Secure plan setup</span>
        <h1>Connect your<br /><em>{plan.name} plan.</em></h1>
        <p>Review your plan, add your basic information and accept the terms before connecting premium access to your MotionKit profile.</p>
      </header>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={activatePlan}>
          <section className="checkout-card">
            <div className="checkout-card-heading"><span>01 / Basic information</span><h2>Tell us about<br /><em>your account.</em></h2></div>
            <div className="checkout-fields">
              <label>Full name<input name="name" required defaultValue={user.name} /></label>
              <label>Email address<input value={user.email} disabled /></label>
              <label>Company / team<input name="company" placeholder="Your studio or team" defaultValue={user.company || ''} /></label>
              <label>Billing country<select name="country" defaultValue={user.billingCountry || 'India'} required><option>India</option><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option></select></label>
            </div>
          </section>
          <section className="checkout-card">
            <div className="checkout-card-heading"><span>02 / Terms & conditions</span><h2>Know before<br /><em>you connect.</em></h2></div>
            <div className="checkout-terms">
              <p><b>Access:</b> Your selected plan unlocks the features listed in this review for the MotionKit account you are currently using.</p>
              <p><b>Usage:</b> Pro allows commercial projects. Studio adds team and client-project access. Do not redistribute MotionKit source as a standalone library.</p>
              <p><b>Billing:</b> This is a local demo activation. No payment is collected and no real subscription is created in this prototype.</p>
              <p><b>Data:</b> The information is stored in your browser localStorage only. Use test information until a production billing backend is connected.</p>
            </div>
            <label className="checkout-consent"><input type="checkbox" checked={termsAccepted} onChange={(event) => { setTermsAccepted(event.target.checked); setError('') }} /> <span>I have read and accept the MotionKit terms and conditions.</span></label>
            {error && <p className="checkout-error">{error}</p>}
            <button className="checkout-submit" type="submit">Connect {plan.name} plan <ArrowRight size={17} /></button>
          </section>
        </form>
        <aside className="checkout-summary">
          <span className="checkout-summary-kicker"><ShieldCheck size={15} /> Selected plan</span>
          <h2>{plan.name}</h2>
          <p>{plan.description}</p>
          <div className="checkout-price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
          <div className="checkout-divider" />
          <b className="checkout-includes">Included with your plan</b>
          <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul>
          <div className="checkout-demo-note">Demo checkout<br /><span>No payment will be charged.</span></div>
        </aside>
      </div>
      <footer className="checkout-footer">MotionKit / Plan connection <span>Local demo mode</span></footer>
    </main>
  )
}
