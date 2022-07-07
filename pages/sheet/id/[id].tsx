/**
 * @fileoverview display issue detail
 */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { api } from '~/utils/middlewares'
import { Issue } from '@omcs/request/types'
import { styled } from 'mayumi/theme'
import { Text } from 'mayumi/text'
import dayjs from 'dayjs'
import { Icon } from 'mayumi/icons'

import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Label } from '~/components/Label'
import { renderer } from '~/utils/md'
import PenSvg from '../../../assets/pen.svg'

const Pen: any = PenSvg

const Container = styled('div', {
  h: '$full',
  w: '$full',
  overflowY: 'auto',
  '.markdown-body': {
    backgroundColor: 'transparent',
    w: '$full',
    color: '$secondaryLabelColor',
  },
  '.omcs-issue-nav': {
    position: 'sticky',
    top: '0',
    glass: '8px',
    zIndex: '$20',
    py: '$2',
    px: '$6',
    w: '$full',
    fontWeight: '$semibold',
    borderBottom: '1px solid $quaternaryLabelColor',
    display: 'flex',
    justifyContent: 'space-between',
  },
  '.omcs-issue-title': {
    my: '$4',
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
  '.omcs-issue-content': {
    pt: '$12',
    px: '$6',
    w: '$full',
    m: 'auto',
    maxWidth: '$3xl',
  },
  '.omcs-issue-labels': {
    display: 'flex',
    color: '$primary',
    gap: '$2',
  },
})

const CheatSheetById: NextPage<{ issue: Issue }> = (props) => {
  return (
    <Layout>
      <Meta title={props.issue?.title} description={props.issue?.body} />
      <Container>
        <div className="omcs-issue-nav">
          <Text p={true}>
            <time>{props.issue.title}</time>
          </Text>
          <Icon
            onClick={() => {
              window.open(
                `https://github.com/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/${props.issue.number}`,
              )
            }}
          >
            <Pen width={14} />
          </Icon>
        </div>
        <div className="omcs-issue-content">
          <div className="omcs-issue-labels">
            {props.issue.labels.map((label) => {
              return <Label key={label.id} {...label} />
            })}
          </div>
          <div className="omcs-issue-title">
            <Text h2={true}>{props.issue.title}</Text>
            <Text type="quaternary" p={true}>
              {dayjs(props.issue.createdAt).format('YYYY-MM-DD hh:mm:ss')}
            </Text>
          </div>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: renderer.render(props.issue.body),
            }}
          />
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const issue = await api.getIssue(ctx?.params?.id as string)
  return { props: { issue } }
}

export default CheatSheetById
