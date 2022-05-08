/**
 * @fileoverview display search results
 */

import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Text } from 'mayumi/text'
import { styled } from 'mayumi/theme'

import Layout from '~/components/Layout'
import { SEARCH_LABELS_INDEX_NAME, SEARCH_CHEATSHEET_INDEX_NAME } from '~/utils/constants'
import { api } from '~/utils/middlewares'
import { LabelSearchResults, CheatSheetSearchResults } from '~/components/SearchResults'

const Container = styled('div', {
  w: '$full',
  h: '$full',
  overflow: 'auto',
  '.mayumi-text': {
    mt: '$0',
  },
  '.omcs-search-title': {
    position: 'sticky',
    top: '0',
    glass: '8px',
    zIndex: '$20',
    py: '$4',
    px: '$6',
    borderBottom: '1px solid $quaternaryLabelColor',
  },
  '.omcs-search-results': {
    p: '$6',
    gap: '$4',
    display: 'flex',
    flexDirection: 'column',
  },
  '.omcs-label-search-results': {
    display: 'flex',
    flexWrap: 'wrap',
  },
  '.omcs-label-search-item': {
    p: '$2',
    cursor: 'pointer',
  },
})

const SearchPage: NextPage<{ hits: any }> = (props) => {
  const keyword = useRouter().query.q as string
  return (
    <Layout>
      <Container>
        <div className="omcs-search-title">
          <Text h2={true}>Search Results</Text>
          <Text p={true} type="quaternary">
            Keyword: {keyword}
          </Text>
        </div>
        <div className="omcs-search-results">
          <CheatSheetSearchResults
            highlight={keyword}
            issues={props.hits[SEARCH_CHEATSHEET_INDEX_NAME]}
          />
          <LabelSearchResults issues={props.hits[SEARCH_LABELS_INDEX_NAME]} />
        </div>
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
