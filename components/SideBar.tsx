import React, { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import Link from 'next/link'
import { Spinner, Hashtag } from 'styled-cssgg'
import InfiniteScroll from 'react-infinite-scroller'
import { Layout, Menu } from 'granen'
import styled from 'styled-components'

import { api } from '~/request/client'

const Item = styled.span`
  @apply flex items-center gap-4;

  --ggs: 0.75;
`

const SpinnerContainer = styled.div`
  @apply w-full flex items-center justify-center;
`

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
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
      >
        <Menu menuTheme="dark" size="lg">
          {data?.map(page => {
            return (
              <>
                {page.data?.map(v => (
                  <Menu.Item key={v.id}>
                    <Link href="/sheet/label/[id]" as={`/sheet/label/${v.id}`}>
                      <Item>
                        <Hashtag />
                        {v.name}
                      </Item>
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
