import React, { useState, useCallback, useMemo } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { Spinner } from 'styled-cssgg'

import { api, Github } from '~/api'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import pkg from 'package.json'
import { Sheet } from '~/components/Sheet'

const IndexPage: NextPage<{ data: Github.Label[] }> = props => {
  const { data } = useSWR(`${pkg.author.name}-${pkg.name}-labels`, api.github.client.labels, {
    initialData: props.data,
  })
  const [keyword, setKeyword] = useState<string>()
  const [issues, setIssues] = useState<Github.Issue[]>()
  const [loading, setLoading] = useState<boolean>()
  const [label, setLabel] = useState<string>('')
  const handleSearch = useCallback(async value => {
    setLoading(true)
    setIssues(undefined)
    const data = await api.github.client.search(value)
    setLoading(false)
    setIssues(data.items)
  }, [])
  const renderContent = useCallback((issues?: Github.Issue[], loading?: boolean) => {
    if (loading) {
      return null
    }
    if (issues) {
      return issues.map(v => {
        return <Sheet v={v} />
      })
    }
    return (
      <ul className="list-disc grid lg:grid-cols-3 lg:w-2/4 grid-cols-2 w-8/12 list-inside">
        {data
          ?.filter(v => !v.default)
          .map(v => {
            return (
              <li className="text-blue-800 cursor-pointer hover:text-blue-500" key={v.name}>
                <Link href="/sheet/[id]" as={`/sheet/${v.name}`}>
                  {v.name}
                </Link>
              </li>
            )
          })}
      </ul>
    )
  }, [])
  return (
    <Layout>
      <Meta />
      <div className="contianer flex flex-col items-center justify-center w-full h-full bg-gray-100">
        <h1 className="label lg:text-5xl text-xl text-gray-700 lg:mb-10 mb-0">
          {pkg.author.name}'s <span className="text-gray-500">cheatsheets</span>
        </h1>
        <input
          placeholder="请输入关键词"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch(keyword)
            }
          }}
          onChange={async e => {
            if (!e.target.value) {
              setIssues(undefined)
              return
            }
            setKeyword(e.target.value)
          }}
          className="shadow appearance-none border focus:outline-none focus:shadow-outline md:w-2/4 lg:w-2/4 w-11/12 h-12 text-gray-500 rounded m-8 p-2"
        />
        {loading ? <Spinner /> : null}
        {renderContent(issues, loading)}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  const data = await api.github.client.labels()
  return { props: { data } }
}

export default IndexPage
