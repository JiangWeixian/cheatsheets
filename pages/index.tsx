import * as React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import { api, Github } from '~/api'

const IndexPage: NextPage<{ data: Github.Label[] }> = ({ data }) => {
  return (
    <div className="contianer flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <input className="shadow appearance-none border focus:outline-none focus:shadow-outline w-2/4 h-12 text-gray-500 rounded m-8" />
      <ul className="list-disc grid grid-cols-3 w-2/4 list-inside">
        {data?.map(v => {
          return (
            <li className="text-blue-800 cursor-pointer hover:text-blue-500" key={v.name}>
              <Link href={`/sheet/${v.name}`}>{v.name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const data = await api.github.labels()
  return { data }
}

export default IndexPage
