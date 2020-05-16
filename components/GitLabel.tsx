import React from 'react'
import Link from 'next/link'

import { Github } from '~/interface/github'

export const GitLabel = (props: { value: Github.Label }) => {
  return (
    <Link href="/sheet/[id]" as={`/sheet/${props.value.name}`}>
      <li
        title={props.value.description}
        className="cursor-pointer rounded shadow p-4 lg:mr-2 mt-2 text-white bg-blue-600 hover:bg-blue-700 transition ease-in duration-300"
      >
        {props.value.name}
      </li>
    </Link>
  )
}
