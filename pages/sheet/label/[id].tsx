/**
 * @fileoverview display issues list by label
 */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { api } from '@omcs/request/node'
import { Issue, Label } from '@omcs/request/types'
import { Typography, Divider } from 'granen'
import styled from 'styled-components'

import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'

const Container = styled.div`
  @apply px-12 pt-6 pb-1;

  [data-role='title'] {
    @apply m-0;
  }

  [data-role='paragraph'] {
    @apply mt-3;
  }
`

const CheetsheetByLabel: NextPage<{ data: Issue[]; label: Label }> = props => {
  const router = useRouter()
  const data = props.data
  return (
    <Layout>
      <Meta title={props.label?.name} description={props.label?.description} />
      <Container>
        <Typography.Title h1={true}>{props.label.name}</Typography.Title>
        <Typography.Paragraph type="secondary">{props.label.description}</Typography.Paragraph>
      </Container>
      <Divider type="horizontal" />
      <Container>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
          <Masonry gutter="16px">
            {data?.map(v => {
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
