import React from 'react'
import useSWRInfinite from 'swr/infinite'
import Link from 'next/link'
import { Label } from '@omcs/request/types'
import InfiniteScroll from 'react-infinite-scroller'
import { Kbd } from 'mayumi/kbd'
import { Menu } from 'mayumi/menu'
import { Text } from 'mayumi/text'
import { Layout } from 'mayumi/layout'
import { styled } from 'mayumi/theme'

import { api } from '~/request/client'
import { PAGE_SIZE } from '~/utils/constants'
import { SearchModal } from '~/components/CheatSheetSearchModal'

const Aside = styled(Layout.Aside, {
  '.mayumi-menu-inner': {
    w: '$full',
    overflow: 'auto',
  },
  '.omcs-aside-header': {
    position: 'sticky',
    top: '0',
    glass: '8px',
    py: '$2',
    px: '$6',
    w: '$full',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '.omcs-label-item': {
    w: '$full',
  },
  '.omcs-label-title': {
    display: 'flex',
    alignItems: 'center',
    w: '$full',
    gap: '$4',
    color: 'inherit',
    fontWeight: '$medium',
  },
  '.spinner': {
    w: '$full',
    flexBox: 'center',
  },
})

const InfScroller = styled(InfiniteScroll, {
  h: '$full',
  w: '$full',
})

const getKey = (pageIndex: number, previousPageData: { hits: Label[] } | null) => {
  if (previousPageData && !previousPageData.hits.length) return null // reached the end
  return ['labels', pageIndex]
}

export const SideBar = ({ open = true, ...props }: { open?: boolean; className?: string }) => {
  const { data, setSize, isValidating } = useSWRInfinite(
    getKey,
    async (_: string, index: number) => {
      return api.github.labels((index || 0) * PAGE_SIZE)
    },
    {},
  )
  const isEmpty = data?.[0]?.hits?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.hits?.length < PAGE_SIZE)
  const hasMore = !!data && !isReachingEnd && !isValidating
  const hits = data?.reduce((acc, cur) => {
    return acc.concat(cur.hits)
  }, [] as Label[])
  return (
    <Aside open={open} className={props.className}>
      <div className="omcs-aside-header">
        <Text p={true}>
          <Kbd>⌘</Kbd> + <Kbd>k</Kbd>
        </Text>
      </div>
      <Menu ghost={true} size="lg" css={{ w: '$96' }}>
        <InfScroller
          hasMore={hasMore}
          pageStart={0}
          useWindow={false}
          loadMore={(page) => setSize(page)}
          loader={
            <div className="spinner">
              <i className="gg-spinner" />
            </div>
          }
        >
          {hits?.map((v) => {
            return (
              <Menu.Item key={v.objectID}>
                <Link href="/sheet/label/[id]" as={`/sheet/label/${v.objectID}`} passHref={true}>
                  <div className="omcs-label-item">
                    <p className="omcs-label-title">{v.name}</p>
                    <Text p={true} size="sm" type="secondary">
                      {v.description}
                    </Text>
                  </div>
                </Link>
              </Menu.Item>
            )
          }) || <></>}
        </InfScroller>
      </Menu>
      <SearchModal />
    </Aside>
  )
}
