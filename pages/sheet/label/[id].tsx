/**
 * @fileoverview display issues list by label
 */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { api } from '@omcs/request/node'
import { Typography, Divider } from 'granen'
import styled from 'styled-components'

import { Github } from '~/interface/github'
import { api as client } from '~/request/client'
import { getId } from '~/utils/sheet'
import Layout from '~/components/Layout'
import pkg from 'package.json'
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

/**
 * @todo rm sheet search part into island search page
 * @todo better ts typo
 */
const CheetsheetByLabel: NextPage<{ data: Github.Issue[]; label: Github.Label }> = props => {
  const router = useRouter()
  // const { data } = useQuery(
  //   [`${pkg.author.name}-${pkg.name}-${router.query.id}-sheet`, router.query.id as string],
  //   (_key, id: string) => {
  //     return client.github.issues({ labels: id })
  //   },
  //   { initialData: props.data },
  // )
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
  const label = await api.getLabel(ctx?.params?.id)
  return { props: { data: issuesByLabel.hits, label } }
}

export default CheetsheetByLabel
