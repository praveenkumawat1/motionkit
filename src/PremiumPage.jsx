import { ArrowLeft, ArrowRight, Check, Crown, Sparkles, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import CustomCursor from './CustomCursor'

const plans = [
  {
    name: 'Starter',
    eyebrow: 'For trying motion',
    price: '$0',
    period: 'forever',
    tone: 'white',
    description: 'A focused set of polished interactions for personal experiments and small prototypes.',
    features: ['18 free components', 'Live previews and demos', 'Copy import snippets', 'Community updates'],
    action: 'Keep exploring',
  },
  {
    name: 'Pro',
    eyebrow: 'Most popular',
    price: '$19',
    period: 'per month',
    tone: 'yellow',
    description: 'The complete MotionKit library for creators who want to ship expressive interfaces faster.',
    features: ['All 28 components', 'Complete React + CSS source', 'Premium hover and scroll systems', 'Lifetime component updates', 'Commercial projects'],
    action: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Studio',
    eyebrow: 'For teams and agencies',
    price: '$49',
    period: 'per month',
    tone: 'blue',
    description: 'A team-ready motion system with shared access, advanced patterns and priority support.',
    features: ['Everything in Pro', 'Up to 10 team members', 'Private component collections', 'Priority support', 'Client project license'],
    action: 'Choose Studio',
  },
]

export default function PremiumPage() {
  const navigate = useNavigate()

  const choosePlan = (plan) => {
    const email = window.localStorage.getItem('motionkit-session')
    if (email) navigate(`/checkout?plan=${plan.name}`)
    else navigate('/')
  }

  return (
    <main className="premium-page">
      <CustomCursor />
      <nav className="premium-nav">
        <Link className="brand-logo flex items-center gap-1 text-[2rem] leading-none" style={{ letterSpacing: '-0.1em' }} to="/">
          MOTION<span className="brand-word-accent">KIT</span><b className="text-yellow">.</b>
        </Link>
        <Link className="components-back" to="/components"><ArrowLeft size={17} strokeWidth={3} /> Back to components</Link>
      </nav>
      <header className="premium-hero">
        <span className="section-pill"><Crown size={14} fill="currentColor" /> Premium access</span>
        <h1>Choose your<br /><em>motion level.</em></h1>
        <p>Unlock the complete MotionKit library and turn every scroll, hover and click into a memorable product moment.</p>
        <div className="premium-hero-stats"><span><Sparkles size={15} /> 28 total components</span><span><Zap size={15} /> Copy-ready source</span><span><Check size={15} /> Cancel anytime</span></div>
      </header>
      <section className="premium-plans" aria-label="Premium plans">
        {plans.map((plan) => (
          <article className={`premium-plan premium-plan-${plan.tone} ${plan.popular ? 'premium-plan-popular' : ''}`} key={plan.name}>
            {plan.popular && <div className="premium-popular-ribbon">RECOMMENDED</div>}
            <div className="premium-plan-top"><span>{plan.eyebrow}</span>{plan.popular && <Crown size={19} />}</div>
            <h2>{plan.name}</h2>
            <p className="premium-plan-description">{plan.description}</p>
            <div className="premium-price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
            <div className="premium-plan-divider" />
            <strong className="premium-includes">What you get</strong>
            <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul>
            {plan.name === 'Starter' ? <Link className="premium-plan-button" to="/components">{plan.action} <ArrowRight size={16} /></Link> : <button className="premium-plan-button" type="button" onClick={() => choosePlan(plan)}>{plan.action} <ArrowRight size={16} /></button>}
          </article>
        ))}
      </section>
      <section className="premium-bottom-note">
        <strong>Built for teams that care how it feels.</strong>
        <span>Every plan includes accessible defaults, smooth performance and documentation that gets you from idea to interaction.</span>
      </section>
    </main>
  )
}
