const freeComponents = [
  { name: 'MagneticButton', slug: 'magnetic-button', category: 'Magnetic', premium: false, description: 'Pull every click closer.' },
  { name: 'TextScramble', slug: 'text-scramble', category: 'Text', premium: false, description: 'Make words feel alive.' },
  { name: 'TiltCard', slug: 'tilt-card', category: 'Cards', premium: false, description: 'Give flat cards a point of view.' },
  { name: 'CursorTrail', slug: 'cursor-trail', category: 'Cursor', premium: false, description: 'Leave a little energy behind.' },
  { name: 'Marquee', slug: 'marquee', category: 'Scroll', premium: false, description: 'Keep the good stuff moving.' },
  { name: 'Parallax', slug: 'parallax', category: 'Scroll', premium: false, description: 'Let layers tell the story.' },
  { name: 'ScrollReveal', slug: 'scroll-reveal', category: 'Reveal', premium: false, description: 'Bring content in on cue.' },
  { name: 'HoverLift', slug: 'hover-lift', category: 'Hover', premium: false, description: 'Make every interaction count.' },
  { name: 'ImagePeek', slug: 'image-peek', category: 'Hover', premium: false, description: 'Reveal a visual on hover.' },
  { name: 'ScrollFill', slug: 'scroll-fill', category: 'Scroll', premium: false, description: 'Paint progress as you scroll.' },
  { name: 'TextReveal', slug: 'text-reveal', category: 'Text', premium: false, description: 'Split words into a soft entrance.' },
  { name: 'StaggerList', slug: 'stagger-list', category: 'Text', premium: false, description: 'Sequence a list with rhythm.' },
  { name: 'GradientBorder', slug: 'gradient-border', category: 'Hover', premium: false, description: 'Turn a border into a signal.' },
  { name: 'BlobMorph', slug: 'blob-morph', category: 'Effects', premium: false, description: 'Keep shapes wonderfully loose.' },
  { name: 'Spotlight', slug: 'spotlight', category: 'Cursor', premium: false, description: 'Follow the focus, not the noise.' },
  { name: 'TypeLoop', slug: 'type-loop', category: 'Text', premium: false, description: 'Give headlines a typing pulse.' },
  { name: 'StackCards', slug: 'stack-cards', category: 'Cards', premium: false, description: 'Fan a stack on interaction.' },
  { name: 'LiquidProgress', slug: 'liquid-progress', category: 'Effects', premium: false, description: 'Make loading feel alive.' },
]

const premiumComponents = [
  ['FlipTicket', 'Cards', 'Turn a card into a second story.'],
  ['GooeyMenu', 'Navigation', 'Connect actions with playful physics.'],
  ['NumberTicker', 'Text', 'Count important numbers into focus.'],
  ['KineticUnderline', 'Text', 'Make links react to attention.'],
  ['OrbitMenu', 'Navigation', 'Let actions travel in orbit.'],
  ['SplitReveal', 'Reveal', 'Open an image like a curtain.'],
  ['SwipeStack', 'Cards', 'Give cards a tactile direction.'],
  ['RippleButton', 'Buttons', 'Turn every click into a wave.'],
  ['CursorLens', 'Cursor', 'Magnify the detail under focus.'],
  ['ScrollRail', 'Scroll', 'Guide long stories sideways.'],
].map(([name, category, description]) => ({
  name,
  slug: name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, ''),
  category,
  description,
  premium: true,
}))

const plans = [
  { id: 'starter', name: 'Starter', price: 0, interval: 'forever', componentLimit: 18, features: ['18 free components', 'Live previews', 'Import snippets'] },
  { id: 'pro', name: 'Pro', price: 19, interval: 'month', componentLimit: 28, features: ['All 28 components', 'Complete React + CSS source', 'Commercial projects'] },
  { id: 'studio', name: 'Studio', price: 49, interval: 'month', componentLimit: 28, features: ['Everything in Pro', '10 team members', 'Priority support'] },
]

export const catalog = [...freeComponents, ...premiumComponents]
export { plans }
