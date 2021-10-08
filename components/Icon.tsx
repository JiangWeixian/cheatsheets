import React from 'react'
import { useHoverEffect } from 'granen/lib/hooks/use-hover-effect'
import { animated } from '@react-spring/web'

export const Icon = (props: { children?: React.ReactNode; className?: string }) => {
  const { bind } = useHoverEffect()
  return (
    <animated.i {...bind()} className={props.className}>
      {props.children}
    </animated.i>
  )
}
