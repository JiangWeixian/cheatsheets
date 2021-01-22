import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import cx from 'classnames'
import Link from 'next/link'
import { Spinner, PushChevronLeft, PushChevronRight } from 'styled-cssgg'
import { animated, useSpring, useTransition } from 'react-spring'
import InfiniteScroll from 'react-infinite-scroller'

import { api } from '~/request/client'
import { useCreateIssue } from '~/hooks/use-create-issue'

const AnimatedPushChevronLeft = animated(PushChevronLeft)
const AnimatedPushChevronRight = animated(PushChevronRight)

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
  const { handleCreateIssue } = useCreateIssue()
  useEffect(() => {
    fetchMore()
  }, [])
  const collapsedSpring = useSpring({
    width: collapsed ? 64 : 300,
    opacity: collapsed ? 0 : 1,
  })
  const collapsedTransitions = useTransition(collapsed, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return (
    <animated.div
      data-role="side-bar"
      style={{ width: collapsedSpring.width }}
      className={cx(
        'bg-gray-900 h-full p-2 box-border border-gray-300 border-r-2 flex flex-col relative',
        props.className,
      )}
    >
      <animated.ul
        className="flex-1 flex-grow overflow-scroll"
        style={{ opacity: collapsedSpring.opacity, flexBasis: 0 }}
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
          <li className="w-full flex justify-center">
            <button
              onClick={handleCreateIssue}
              className="rounded p-2 my-2 w-11/12 m-auto text-gray-300 bg-indigo-600"
            >
              Create New Cheatsheet
            </button>
          </li>
          {data?.map(page => {
            return (
              <>
                {page.data?.map(v => (
                  <Link href="/sheet/[id]" as={`/sheet/${v.name}`}>
                    <li
                      title={v.description}
                      className="text-gray-300 rounded-lg text-base cursor-pointer py-2 px-4 my-4 hover:bg-black hover:text-white"
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
        className="relative right-0 bottom-0 w-full h-10 flex flex-grow-0 justify-center items-center opacity-75 hover:opacity-100 text-white cursor-pointer"
      >
        {collapsedTransitions.map(({ item, props }) => {
          return item ? (
            <AnimatedPushChevronRight style={props} />
          ) : (
            <AnimatedPushChevronLeft style={props} />
          )
        })}
      </div>
    </animated.div>
  )
}
