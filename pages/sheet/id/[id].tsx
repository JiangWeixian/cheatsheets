/**
 * @fileoverview display issue detail
 */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { api } from '@omcs/request/node'
import styled from 'styled-components'

import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'

const Container = styled.div`
  @apply p-12 flex items-center justify-center h-full w-full box-border;
`

// TODO: just like raycast
const CheatSheetById: NextPage<{ issue: Github.Issue }> = props => {
  return (
    <Layout>
      <Meta title={props.issue?.title} description={props.issue?.body} />
      <Container>
        <Sheet className="w-1/2" v={props.issue} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const issue = await api.getIssue(ctx?.params?.id)
  return { props: { issue } }
}

export default CheatSheetById
