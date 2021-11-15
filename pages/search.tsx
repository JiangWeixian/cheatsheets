/**
 * @fileoverview display search results
 */

import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Typography } from 'granen'
import styled from 'styled-components'

import Layout from '~/components/Layout'
import { SEARCH_LABELS_INDEX_NAME, SEARCH_CHEATSHEET_INDEX_NAME } from '~/utils/constants'
import { api } from '~/utils/middlewares'
import { LabelSearchResults, CheatSheetSearchResults } from '~/components/SearchResults'

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

const SearchPage: NextPage<{ hits: any }> = (props) => {
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
  const search = await api.multipleSearch({
    query: ctx.query.q as string,
    limit: 10,
    mode: 'default',
  })
  return { props: { hits: search } }
}

export default SearchPage
