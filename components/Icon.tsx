import React from 'react'
import { useHoverEffect } from 'granen/lib/hooks/use-hover-effect'
import { animated } from '@react-spring/web'

export const Icon = (props: React.HTMLAttributes<HTMLLIElement>) => {
  const { bind } = useHoverEffect()
  return (
    <animated.i {...bind()} {...props}>
      {props.children}
    </animated.i>
  )
}
