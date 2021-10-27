/**
 * @fileoverview display issues list by label
 */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { api } from '~/utils/middlewares'
import { Issue, Label } from '@omcs/request/types'
import { Typography, Divider } from 'granen'
import styled from 'styled-components'
import { api as client } from '~/request/client'
import InfiniteScroll from 'react-infinite-scroller'
import useSWRInfinite from 'swr/infinite'
import compact from 'lodash.compact'

import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'
import { PAGE_SIZE } from '~/utils/constants'

const Container = styled.div`
  @apply px-12 pt-6 pb-1;

  [data-role='title'] {
    @apply m-0;
  }

  [data-role='paragraph'] {
    @apply mt-3 text-base mb-0;
  }

  &.issues-list {
    @apply flex-1 overflow-x-auto;
  }
`

const DividerLine = styled(Divider)`
  && {
    @apply -mx-4;
  }
`

const getKey = (
  pageIndex: number,
  previousPageData: { hits: Issue[] } | null,
  namespace: string,
) => {
  if (previousPageData && !previousPageData.hits.length) return null // reached the end
  return ['issues', namespace, pageIndex]
}

const CheetsheetByLabel: NextPage<{ data: Issue[]; label: Label }> = props => {
  const router = useRouter()
  const { data, setSize, isValidating } = useSWRInfinite(
    (...args: [any, any]) => getKey(...args, props.label.id),
    async (_: string, _namespace: string, index: number) => {
      return client.github.issues({ offset: (index || 0) * PAGE_SIZE, labelID: props.label.id })
    },
    { fallbackData: [{ hits: props.data }] },
  )
  const isEmpty = data?.[0]?.hits?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.hits?.length < PAGE_SIZE)
  const hasMore = !!data && !isReachingEnd && !isValidating
  const cheatsheets = compact(data?.reduce((acc, cur) => acc.concat(cur.hits), [] as Issue[]))
  return (
    <Layout>
      <Meta title={props.label?.name} description={props.label?.description} />
      <Container>
        <Typography.Title h1={true}>{props.label.name}</Typography.Title>
        <Typography.Paragraph type="secondary">{props.label.description}</Typography.Paragraph>
      </Container>
      <DividerLine type="horizontal" />
      <Container className="issues-list">
        <InfiniteScroll
          hasMore={hasMore}
          pageStart={0}
          useWindow={false}
          loadMore={page => setSize(page)}
          className="index"
        >
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
            <Masonry gutter="16px">
              {cheatsheets?.map(v => {
                return (
                  <Sheet
                    onClickTitle={() => router.push('/sheet/id/[id]', `/sheet/id/${v.id}`)}
                    key={v.id}
                    className="w-1/2"
                    v={v}
                  />
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const issuesByLabel = await api.listIssues({ labelID: ctx?.params?.id as string })
  const label = await api.getLabel(ctx?.params?.id as string)
  return { props: { data: issuesByLabel.hits, label } }
}

export default CheetsheetByLabel
