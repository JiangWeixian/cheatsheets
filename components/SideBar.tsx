import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useRematch } from '@use-rematch/core'
import { useRouter } from 'next/router'
import cx from 'classnames'
import Link from 'next/link'
import { Search, Spinner, PushChevronLeft, PushChevronRight } from 'styled-cssgg'
import { animated, useSpring } from 'react-spring'
import InfiniteScroll from 'react-infinite-scroller'

import { api } from '~/request/client'
import { useSearchIssue } from '~/hooks/use-search-issue'
import { Github } from '~/interface/github'

const unShipProps: any = {
  enterkeyhint: 'search',
}

export const SideBar = (props: { className?: string }) => {
  const { data, fetchMore, canFetchMore, isFetching } = useInfiniteQuery(
    'labels',
    async (_key, page: number = 1) => {
      const data = await api.github.labels(page)
      return { data, page }
    },
    {
      getFetchMore: last => (last?.data?.length === 30 ? last.page + 1 : undefined),
    },
  )
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    fetchMore()
  }, [])
  const opacity = useSpring({
    opacity: data?.length === 0 ? 0 : 1,
  })
  const collapsedSpring = useSpring({
    width: collapsed ? 64 : 300,
    opacity: collapsed ? 0 : 1,
  })
  const searchTerms = useRouter().query.q as string
  const { handleSearch } = useSearchIssue()
  const { state, dispatch } = useRematch({
    name: 'homepage',
    state: {
      keyword: searchTerms ?? '',
      status: 'init',
    } as {
      keyword: string
      status: 'loading' | 'loaded' | 'init'
    },
    reducers: {
      setKeyword(state, keyword: string) {
        return {
          ...state,
          keyword,
        }
      },
      setStatus(state, status: 'loading' | 'loaded' | 'init') {
        return {
          ...state,
          status,
        }
      },
    },
  })
  return (
    <animated.div
      data-role="side-bar"
      style={{ width: collapsedSpring.width }}
      className={cx('bg-gray-800 h-full p-4 box-border flex flex-col relative', props.className)}
    >
      <div className="relative flex items-center justify-center">
        {!collapsed ? (
          <>
            <input
              value={state.keyword}
              placeholder="Search cheatsheets"
              {...unShipProps}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  // search issues
                  handleSearch((e.target as any).value)
                }
              }}
              onChange={e => dispatch.setKeyword(e.target.value)}
              className="shadow-xl appearance-none border focus:outline-none focus:shadow-outline w-full flex-0 h-12 p-2 text-gray-500 rounded"
            />
            <Search className="absolute text-gray-500" style={{ right: '2rem' }} />
          </>
        ) : (
          <Search onClick={() => setCollapsed(false)} className="text-gray-500 cursor-pointer" />
        )}
      </div>
      <animated.ul
        className="flex-1 overflow-scroll pt-4"
        style={{ opacity: collapsedSpring.opacity }}
      >
        <InfiniteScroll
          hasMore={!isFetching && canFetchMore}
          useWindow={false}
          loadMore={() => fetchMore()}
          loader={
            <div className="w-full flex items-center justify-center">
              <Spinner />
            </div>
          }
        >
          {data?.map(page => {
            return (
              <>
                {page.data
                  ?.filter(v => v.name.toLowerCase().includes(state.keyword))
                  ?.map(v => (
                    <Link href="/sheet/[id]" as={`/sheet/${v.name}`}>
                      <li
                        title={v.description}
                        className="text-gray-300 rounded cursor-pointer font-bold p-4 hover:bg-indigo-900"
                      >
                        {v.name}
                      </li>
                    </Link>
                  ))}
              </>
            )
          })}
        </InfiniteScroll>
      </animated.ul>
      <div
        onClick={() => setCollapsed(prev => !prev)}
        className="relative right-0 bottom-0 w-full flex justify-center text-white cursor-pointer"
      >
        {collapsed ? <PushChevronRight /> : <PushChevronLeft />}
      </div>
    </animated.div>
  )
}
