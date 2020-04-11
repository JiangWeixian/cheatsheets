import * as React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import pkg from 'package.json'

import { api, Github } from '~/api'
import Layout from '~/components/Layout'

const IndexPage: NextPage<{ data: Github.Label[] }> = ({ data }) => {
  return (
    <Layout>
      <div className="contianer flex flex-col items-center justify-center w-full h-full bg-gray-100">
        <h1 className="label text-5xl text-gray-700 mb-10">
          {pkg.author.name}'s <span className="text-gray-500">cheatsheets</span>
        </h1>
        <input
          placeholder="label name"
          className="shadow appearance-none border focus:outline-none focus:shadow-outline w-2/4 h-12 text-gray-500 rounded m-8 p-2"
        />
        <ul className="list-disc grid grid-cols-3 w-2/4 list-inside">
          {data
            ?.filter(v => !v.default)
            .map(v => {
              return (
                <li className="text-blue-800 cursor-pointer hover:text-blue-500" key={v.name}>
                  <Link href={`/sheet/${v.name}`}>{v.name}</Link>
                </li>
              )
            })}
        </ul>
      </div>
    </Layout>
  )
}

IndexPage.getInitialProps = async () => {
  // await api.github.login()
  const data = await api.github.labels()
  return { data }
}

export default IndexPage
