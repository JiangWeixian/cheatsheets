/**
 * @fileoverview display search results
 */

import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { Label } from '@omcs/request/types'
import { useRouter } from 'next/router'
import { animated, useTrail } from '@react-spring/web'
import { Typography, Box, Description } from 'granen'
import styled from 'styled-components'

import Layout from '~/components/Layout'
import { Sheet } from '~/components/Sheet'
import { SEARCH_LABELS_INDEX_NAME, SEARCH_CHEATSHEET_INDEX_NAME } from '~/utils/constants'
import { api } from '~/utils/middlewares'

const Container = styled.div`
  @apply px-12 py-6;

  [data-role='title'] {
    @apply mt-0;
  }

  .cheatSheetSearchItem {
    @apply mb-4 w-full float-left;
  }

  .label-search-results {
    @apply flex flex-wrap;
  }

  .label {
    @apply p-2 cursor-pointer;
  }
`

type LabelProps = {
  v: Label
}

const LabelItem = (props: LabelProps) => {
  const router = useRouter()
  return (
    <Box
      className="label"
      onClick={() => router.push('/sheet/label/[id]', `/sheet/label/${props.v.id}`)}
    >
      <Description title={props.v.name} content={props.v.description} />
    </Box>
  )
}

const LabelSearchResults = ({ issues = {} }: { issues?: any }) => {
  const hits = issues.hits || []
  const transitions = useTrail<{ opacity: number }>(hits.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  return (
    <div className="label-search-results">
      {hits?.length !== 0
        ? transitions.map((props, index) => {
            return (
              <animated.div key={index} className="searchItem" style={props}>
                <LabelItem v={hits?.[index]} />
              </animated.div>
            )
          })
        : null}
    </div>
  )
}

const CheatSheetSearchResults = ({
  issues = {},
  highlight,
}: {
  issues?: any
  highlight?: string
}) => {
  const hits = issues.hits || []
  const router = useRouter()
  const transitions = useTrail<{ opacity: number }>(hits.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  if (hits.length === 0) {
    return null
  }
  return (
    <>
      {transitions.map((props, index) => {
        return (
          <animated.div key={index} className="cheatSheetSearchItem" style={props}>
            <Sheet
              onClickTitle={() => router.push('/sheet/id/[id]', `/sheet/id/${hits?.[index].id}`)}
              highlight={highlight}
              v={hits?.[index]}
            />
          </animated.div>
        )
      })}
    </>
  )
}

const SearchPage: NextPage<{ hits: any }> = props => {
  const keyword = useRouter().query.q as string
  return (
    <Layout>
      <Container>
        <Typography.Title h1={true}>Search Results</Typography.Title>
        <CheatSheetSearchResults
          highlight={keyword}
          issues={props.hits[SEARCH_CHEATSHEET_INDEX_NAME]}
        />
        <LabelSearchResults issues={props.hits[SEARCH_LABELS_INDEX_NAME]} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const search = await api.multipleSearch({ query: ctx.query.q as string })
  return { props: { hits: search } }
}

export default SearchPage
