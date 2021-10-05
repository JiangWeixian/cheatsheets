/**
 * @fileoverview display issue detail
 */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { api } from '@omcs/request/node'

import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'

const CheatSheetById: NextPage<{ issue: Github.Issue }> = props => {
  return (
    <Layout>
      <Meta title={props.issue?.title} description={props.issue?.body} />
      <div className="p-6 sm:p-12">
        <Sheet className="w-1/2" v={props.issue} />
      </div>
    </Layout>
  )
}

// TODO: implement get issue api
export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const issue = await api.getIssue(ctx?.params?.id)
  return { props: { issue } }
}

export default CheatSheetById
