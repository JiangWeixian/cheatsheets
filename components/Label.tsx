import React from 'react'
import Link from 'next/link'
import { Link as MayumiLink } from 'mayumi/link'
import { Label as LabelTypes } from '@omcs/request/types'

export const Label = (label: LabelTypes) => {
  return (
    <Link key={label.id} href={`/sheet/label/${label.id}`} passHref={true}>
      <MayumiLink animation="reverse"># {label.name}</MayumiLink>
    </Link>
  )
}
