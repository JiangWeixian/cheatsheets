import React from 'react'
import { useHoverEffect } from 'granen/lib/hooks'
import { animated } from '@react-spring/web'

export const Icon = (props: React.HTMLAttributes<HTMLLIElement>) => {
  const { bind } = useHoverEffect()
  return (
    <animated.i {...bind()} {...props}>
      {props.children}
    </animated.i>
  )
}
