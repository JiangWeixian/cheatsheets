/**
 * @fileoverview display issue detail
 */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { api } from '~/utils/middlewares'
import { Issue } from '@omcs/request/types'
import styled from 'styled-components'

import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'

const Container = styled.div`
  transform: translateY(-50%);
  position: relative;
  top: 50%;
  @apply p-12 flex flex-col items-center justify-center max-h-full w-full box-border overflow-y-auto;

  .shared-sheet {
    @apply w-1/2 shadow-2xl flex-1 h-full overflow-y-auto;
  }
`

const CheatSheetById: NextPage<{ issue: Issue }> = (props) => {
  return (
    <Layout>
      <Meta title={props.issue?.title} description={props.issue?.body} />
      <Container>
        <Sheet isShared={true} className="shared-sheet" v={props.issue} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const issue = await api.getIssue(ctx?.params?.id as string)
  return { props: { issue } }
}

export default CheatSheetById
