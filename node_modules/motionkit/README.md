# MotionKit

Production-ready React motion primitives for expressive interfaces.

## Install

```bash
npm install motionkit
```

## Setup

Import the package stylesheet once in your app entry:

```jsx
import 'motionkit/styles.css'
```

## Usage

```jsx
import { MagneticButton, ScrollReveal, TextReveal } from 'motionkit'

export default function Hero() {
  return (
    <ScrollReveal>
      <TextReveal>Motion with purpose.</TextReveal>
      <MagneticButton strength={0.22}>Start building</MagneticButton>
    </ScrollReveal>
  )
}
```

## Included primitives

- `MagneticButton` — pointer-following interaction with configurable strength.
- `ScrollReveal` — IntersectionObserver-based reveal with reduced-motion support.
- `TextReveal` — word-by-word entrance animation.
- `CursorTrail` — lightweight custom cursor ring.
- `useMotionKit` — exposes the user's reduced-motion preference.

MotionKit ships ESM and CommonJS builds, source maps, CSS, and declaration metadata. React and React DOM are peer dependencies so your application controls their versions.

## Development

This repository builds the package with:

```bash
npm run build:package
npm run pack:package
```
