import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
  children?: ReactNode
}

export interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
  threshold?: number
  once?: boolean
  children?: ReactNode
}

export interface TextRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export interface CursorTrailProps {
  color?: string
  size?: number
  className?: string
}

export declare function MagneticButton(props: MagneticButtonProps): ReactNode
export declare function ScrollReveal(props: ScrollRevealProps): ReactNode
export declare function TextReveal(props: TextRevealProps): ReactNode
export declare function CursorTrail(props: CursorTrailProps): ReactNode
export declare function useMotionKit(): {
  prefersReducedMotion: boolean
}
export declare const motionKitVersion: string
