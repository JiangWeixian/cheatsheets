import React from 'react'
import useSWRInfinite from 'swr/infinite'
import Link from 'next/link'
import { Spinner, Hashtag } from 'styled-cssgg'
import { Label } from '@omcs/request/types'
import InfiniteScroll from 'react-infinite-scroller'
import { Layout, Menu } from 'granen'
import styled from 'styled-components'

import { api } from '~/request/client'
import { PAGE_SIZE } from '~/utils/constants'

const Item = styled.span`
  @apply flex items-center gap-4;

  --ggs: 0.75;
`

const SpinnerContainer = styled.div`
  @apply w-full flex items-center justify-center;
`

const getKey = (pageIndex: number, previousPageData: Label[] | null) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  return ['labels', pageIndex]
}

export const SideBar = ({ open = true, ...props }: { open?: boolean; className?: string }) => {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    async (_: string, index: number) => api.github.labels(index),
    {},
  )
  const isRefreshing = isValidating && data && data.length === size
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  return (
    <Layout.Aside open={open} className={props.className}>
      <InfiniteScroll
        hasMore={!!data && !isReachingEnd}
        style={{ width: '100%' }}
        useWindow={false}
        loadMore={() => setSize(size + 1)}
        loader={
          isRefreshing && !isReachingEnd ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : (
            <>~</>
          )
        }
      >
        <Menu menuTheme="dark" size="lg">
          {data?.map(page => {
            return (
              <>
                {page?.map(v => (
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
