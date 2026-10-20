import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Crown, LogOut, Save, UserRound, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import CustomCursor from './CustomCursor'

const USERS_KEY = 'motionkit-users'
const SESSION_KEY = 'motionkit-session'

function getSessionUser() {
  try {
    const email = window.localStorage.getItem(SESSION_KEY)
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(users) ? users.find((user) => user.email === email) || null : null
  } catch {
    return null
  }
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const sessionUser = getSessionUser()
    if (sessionUser) setUser(sessionUser)
    else navigate('/', { replace: true })
  }, [navigate])

  const saveProfile = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const updated = {
      ...user,
      name: String(data.get('name') || '').trim(),
      role: String(data.get('role') || '').trim(),
      bio: String(data.get('bio') || '').trim(),
      location: String(data.get('location') || '').trim(),
      website: String(data.get('website') || '').trim(),
      timezone: String(data.get('timezone') || '').trim(),
      company: String(data.get('company') || '').trim(),
    }
    const users = JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]')
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users.map((item) => item.email === user.email ? updated : item)))
    setUser(updated)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY)
    navigate('/', { replace: true })
  }

  if (!user) return null

  return (
    <main className="profile-page">
      <CustomCursor />
      <nav className="profile-nav">
        <Link className="brand-logo" to="/">MOTION<span className="brand-word-accent">KIT</span><b className="text-yellow">.</b></Link>
        <Link className="components-back" to="/"><ArrowLeft size={17} strokeWidth={3} /> Back home</Link>
      </nav>
      <header className="profile-hero">
        <span className="section-pill"><UserRound size={14} fill="currentColor" /> MotionKit workspace</span>
        <h1>Your profile.<br /><em>Your motion space.</em></h1>
        <p>Manage your basic information, personalize your workspace and keep your MotionKit identity ready for the next project.</p>
      </header>
      <div className="profile-layout">
        <aside className="profile-summary">
          <div className="profile-avatar profile-avatar-large"><UserRound size={38} /></div>
          <span className="profile-summary-kicker">Creator account</span>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <div className="profile-badges"><span>{user.plan || 'Starter'} plan</span><span>Local account</span></div>
          <button className="profile-logout profile-logout-page" type="button" onClick={logout}><LogOut size={15} /> Log out</button>
        </aside>
        <section className="profile-editor">
          <div className="profile-section-heading"><span>01 / Basic information</span><h2>Make it<br /><em>yours.</em></h2></div>
          <form className="profile-form" onSubmit={saveProfile}>
            <div className="profile-form-grid">
              <label>Full name<input name="name" required defaultValue={user.name} /></label>
              <label>Role<input name="role" required defaultValue={user.role} /></label>
            </div>
            <label>Email address<input value={user.email} disabled /></label>
            <div className="profile-form-grid">
              <label>Location<input name="location" placeholder="Delhi, India" defaultValue={user.location || ''} /></label>
              <label>Website<input name="website" type="url" placeholder="https://your-site.com" defaultValue={user.website || ''} /></label>
            </div>
            <div className="profile-form-grid">
              <label>Company / team<input name="company" placeholder="Your studio or team" defaultValue={user.company || ''} /></label>
              <label>Timezone<input name="timezone" placeholder="Asia/Kolkata" defaultValue={user.timezone || ''} /></label>
            </div>
            <label>About you<textarea name="bio" rows="4" defaultValue={user.bio} /></label>
            <button className="profile-save" type="submit">{saved ? 'Profile saved locally' : 'Save changes'} {saved ? <Check size={17} /> : <Save size={17} />}</button>
          </form>
        </section>
      </div>
      <section className="profile-account-strip">
        <div><span>Plan</span><strong>{user.plan || 'Starter'}</strong><small>{user.plan === 'Starter' || !user.plan ? 'Explore the starter library' : 'Premium access is active'}</small></div>
        <div><span>Member since</span><strong>{new Date(user.joinedAt).toLocaleDateString()}</strong><small>Your MotionKit journey started here</small></div>
        <div><span>Next step</span><strong>{user.plan === 'Starter' || !user.plan ? 'Unlock more' : 'Build motion'}</strong><small>{user.plan === 'Starter' || !user.plan ? 'Connect a premium plan' : 'Browse premium components'}</small><Link to={user.plan === 'Starter' || !user.plan ? '/premium' : '/components'}><ArrowUpRight size={16} /> {user.plan === 'Starter' || !user.plan ? 'View plans' : 'Explore library'}</Link></div>
      </section>
      <section className="profile-plan-section">
        <div className="profile-section-heading"><span>02 / Membership</span><h2>Pick your<br /><em>motion level.</em></h2></div>
        <p className="profile-plan-intro">Your account is ready for the next stage. Choose a plan to connect premium components to this local profile.</p>
        <div className="profile-plan-grid">
          <article className={user.plan === 'Starter' || !user.plan ? 'profile-plan-card profile-plan-active' : 'profile-plan-card'}><span><Zap size={15} /> Starter</span><strong>Free</strong><small>18 free components, previews and copy-ready imports.</small><b>{user.plan === 'Starter' || !user.plan ? 'Current plan' : 'Available'}</b></article>
          <article className={user.plan === 'Pro' ? 'profile-plan-card profile-plan-pro profile-plan-active' : 'profile-plan-card profile-plan-pro'}><span><Crown size={15} /> Pro</span><strong>$19/mo</strong><small>All 28 components, complete source and commercial projects.</small><Link to="/premium">Connect Pro <ArrowUpRight size={15} /></Link></article>
          <article className={user.plan === 'Studio' ? 'profile-plan-card profile-plan-studio profile-plan-active' : 'profile-plan-card profile-plan-studio'}><span><Crown size={15} /> Studio</span><strong>$49/mo</strong><small>Team access, private collections and priority support.</small><Link to="/premium">Connect Studio <ArrowUpRight size={15} /></Link></article>
        </div>
      </section>
      <footer className="profile-footer"><span>MotionKit / Local profile</span><small>Demo mode: data is stored only in this browser. Use a real backend before production.</small></footer>
    </main>
  )
}
