import React, { useState, useCallback, useRef, useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { Spinner } from 'styled-cssgg'
import { animated, useTrail } from 'react-spring'

import { api, Github } from '~/api'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import pkg from 'package.json'
import { Sheet } from '~/components/Sheet'

const Content = ({
  issues = [],
  labels,
  loading,
  highlight,
}: {
  issues?: Github.Issue[]
  labels?: Github.Label[]
  loading?: boolean
  highlight?: string
}) => {
  const transitions = useTrail<{ opacity: number }>(issues.length, {
    opacity: loading ? 0 : 1,
    from: { opacity: 0 },
  })
  if (loading) {
    return <Spinner />
  }
  if (issues && issues.length !== 0) {
    return (
      <>
        {transitions.map((props, index) => {
          return (
            <animated.div key={issues[index].id} style={props} className="lg:w-2/4 w-11/12">
              <Sheet highlight={highlight} className={'mb-4'} v={issues[index]} />
            </animated.div>
          )
        })}
      </>
    )
  }
  return (
    <ul className="list-disc grid lg:grid-cols-3 lg:w-2/4 grid-cols-2 w-8/12 list-inside">
      {labels
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
}

const IndexPage: NextPage<{ data: Github.Label[] }> = props => {
  const { data } = useSWR(`${pkg.author.name}-${pkg.name}-labels`, api.github.client.labels, {
    initialData: props.data,
  })
  const [keyword, setKeyword] = useState<string>()
  const [issues, setIssues] = useState<Github.Issue[]>()
  const [loading, setLoading] = useState<boolean>()
  const handleSearch = useCallback(async value => {
    setLoading(true)
    setIssues(undefined)
    const data = await api.github.client.search(value)
    setLoading(false)
    setIssues(data.items)
  }, [])
  return (
    <Layout>
      <Meta />
      <div className="contianer flex flex-col items-center w-full min-h-full bg-gray-100">
        <h1 className="label lg:text-5xl text-xl text-gray-700 mt-40 lg:mt-56 lg:mb-10 mb-0">
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
        <Content highlight={keyword} issues={issues} labels={data} loading={loading} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  const data = await api.github.client.labels()
  return { props: { data } }
}

export default IndexPage
