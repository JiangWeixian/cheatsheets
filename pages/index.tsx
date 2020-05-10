import React, { useState, useCallback, useRef, useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { Spinner } from 'styled-cssgg'
import { animated, useTrail } from 'react-spring'
import { useRematch } from '@use-rematch/core'

import { api } from '~/api/client'
import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import pkg from 'package.json'
import { Sheet } from '~/components/Sheet'
import { useRouter } from 'next/router'

const unShipProps: any = {
  enterkeyhint: 'search',
}

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
  const { data } = useSWR(`${pkg.author.name}-${pkg.name}-labels`, api.github.labels, {
    initialData: props.data,
  })
  const searchTerms = useRouter().query.q as string
  const { state, dispatch } = useRematch({
    name: 'homepage',
    state: {
      issues: undefined,
      loading: false,
      keyword: searchTerms,
    } as {
      issues?: Github.Issue[]
      loading: boolean
      keyword: string
    },
    reducers: {
      setIssues(state, issues?: Github.Issue[]) {
        return {
          ...state,
          issues,
        }
      },
      setKeyword(state, keyword: string) {
        return {
          ...state,
          keyword,
        }
      },
      toggleLoading(state) {
        return {
          ...state,
          loading: !state.loading,
        }
      },
    },
    effects: {
      async searchIssues(payload: string) {
        if (!payload) {
          return
        }
        this.toggleLoading()
        const issues = await api.github.search(payload)
        this.setIssues(issues.items)
        this.toggleLoading()
      },
    },
  })
  useEffect(() => {
    handleSearch(searchTerms)
  }, [searchTerms])
  const handleSearch = useCallback(async value => {
    await dispatch.searchIssues(value)
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
          value={state.keyword}
          {...unShipProps}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch(state.keyword)
            }
          }}
          onChange={async e => {
            dispatch.setKeyword(e.target.value)
            if (!e.target.value) {
              dispatch.setIssues(undefined)
              return
            }
          }}
          className="shadow appearance-none border focus:outline-none focus:shadow-outline md:w-2/4 lg:w-2/4 w-11/12 h-12 text-gray-500 rounded m-8 p-2"
        />
        <Content
          highlight={state.keyword}
          issues={state.issues}
          labels={data}
          loading={state.loading}
        />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  const data = await api.github.labels()
  return { props: { data } }
}

export default IndexPage
