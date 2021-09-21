import React, { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import Link from 'next/link'
import { Spinner } from 'styled-cssgg'
import InfiniteScroll from 'react-infinite-scroller'
import { Layout, Menu } from 'granen'

import { api } from '~/request/client'

export const SideBar = ({ open = true, ...props }: { open?: boolean; className?: string }) => {
  const { data, fetchMore, canFetchMore, isFetching } = useInfiniteQuery(
    'labels',
    async (_key, page = 1) => {
      const data = await api.github.labels(page)
      return { data, page }
    },
    {
      getFetchMore: last => (last?.data?.length === 10 ? last.page + 1 : undefined),
    },
  )
  useEffect(() => {
    fetchMore()
  }, [fetchMore])
  return (
    <Layout.Aside open={open} className={props.className}>
      <InfiniteScroll
        hasMore={!isFetching && canFetchMore}
        style={{ width: '100%' }}
        useWindow={false}
        loadMore={() => fetchMore()}
        loader={
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Menu menuTheme="dark" size="lg">
          {data?.map(page => {
            return (
              <>
                {page.data?.map(v => (
                  <Menu.Item key={v.name}>
                    <Link href="/sheet/[id]" as={`/sheet/${v.name}`}>
                      {v.name}
                    </Link>
                  </Menu.Item>
                ))}
              </>
            )
          })}
        </Menu>
      </InfiniteScroll>
    </Layout.Aside>
  )
}
