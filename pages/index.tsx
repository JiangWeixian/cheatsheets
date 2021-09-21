import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { Spinner, Search } from 'styled-cssgg'
import { animated, useTrail } from '@react-spring/web'
import { QueryStatus } from 'react-query'
import { algolia } from '@omcs/request'
import { Typography, Input, Dropdown } from 'granen'
import { InstantSearch, createConnector, connectHits, Configure } from 'react-instantsearch-dom'
import styled from 'styled-components'

import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'
import { useRouter } from 'next/router'
import { useSearchIssue } from '~/hooks/use-search-issue'
import { useRematch } from '@use-rematch/core'

const Recent = ({
  issues = [],
  status,
  highlight,
}: {
  issues?: Github.Issue[]
  status?: QueryStatus
  highlight?: string
}) => {
  const transitions = useTrail<{ opacity: number }>(issues.length, {
    opacity: status === 'loading' ? 0 : 1,
    from: { opacity: 0 },
  })
  if (status === 'loading') {
    return <Spinner className="m-auto pt-10" />
  }
  return (
    <div>
      {issues?.length !== 0 ? (
        <>
          <Typography.Title h1={true}>Recently</Typography.Title>
          {transitions.slice(0, 2).map((props, index) => {
            return (
              <animated.div key={index} className="mb-4 w-full float-left" style={props}>
                <Sheet highlight={highlight} v={issues?.[index]} />
              </animated.div>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

const Someday = ({
  issues = [],
  status,
  highlight,
}: {
  issues?: Github.Issue[]
  status?: QueryStatus
  highlight?: string
}) => {
  const transitions = useTrail<{ opacity: number }>(issues.length, {
    opacity: status === 'loading' ? 0 : 1,
    from: { opacity: 0 },
  })
  if (status === 'loading') {
    return <Spinner className="m-auto pt-10" />
  }
  return (
    <div>
      {issues?.length !== 0 ? (
        <>
          <Typography.Title>Someday, I learn</Typography.Title>
          {transitions.map((props, index) => {
            return (
              <animated.div key={index} className="mb-4 w-full float-left" style={props}>
                <Sheet highlight={highlight} v={issues?.[index]} />
              </animated.div>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

const unShipProps: any = {
  enterkeyhint: 'search',
}

// const MySearchBox = () => {
//   const { handleSearch } = useSearchIssue({ initialIssues: [] })
//   const { state, dispatch } = useRematch({
//     name: 'homepage',
//     state: {
//       keyword: '',
//       status: 'init',
//     } as {
//       keyword: string
//       status: 'loading' | 'loaded' | 'init'
//     },
//     reducers: {
//       setKeyword(state, keyword: string) {
//         return {
//           ...state,
//           keyword,
//         }
//       },
//       setStatus(state, status: 'loading' | 'loaded' | 'init') {
//         return {
//           ...state,
//           status,
//         }
//       },
//     },
//   })
//   return (
//     <Input
//       prefix={<Search />}
//       borderless={true}
//       {...unShipProps}
//       onKeyDown={e => {
//         if (e.key === 'Enter') {
//           // search issues
//           handleSearch((e.target as any).value)
//         }
//       }}
//       onChange={e => dispatch.setKeyword(e.target.value)}
//     />
//   )
// }

const connectWithQuery = createConnector({
  displayName: 'WidgetWithQuery',
  getProvidedProps(props, searchState) {
    // Since the `attributeForMyQuery` searchState entry isn't
    // necessarily defined, we need to default its value.
    const currentRefinement = searchState.attributeForMyQuery || ''

    // Connect the underlying component with the `currentRefinement`
    return { currentRefinement }
  },
  refine(props, searchState, nextRefinement) {
    // When the underlying component calls its `refine` prop,
    // we update the searchState with the provided refinement.
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their respective state.
      ...searchState,
      attributeForMyQuery: nextRefinement,
    }
  },
  getSearchParameters(searchParameters, props, searchState) {
    // When the `attributeForMyQuery` state entry changes, we update the query
    return searchParameters.setQuery(searchState.attributeForMyQuery || '')
  },
  cleanUp(props, searchState) {
    // When the widget is unmounted, we omit the entry `attributeForMyQuery`
    // from the `searchState`, then on the next request the query will
    // be empty
    const { attributeForMyQuery, ...nextSearchState } = searchState

    return nextSearchState
  },
})

const MySearchBox = ({ currentRefinement, refine }) => (
  <Input
    prefix={<Search />}
    borderless={true}
    {...unShipProps}
    type="input"
    size="lg"
    value={currentRefinement}
    onChange={e => refine(e.currentTarget.value)}
  />
)

const ConnectedSearchBox = connectWithQuery(MySearchBox)

const Item = styled(Dropdown.Item)`
  && {
    @apply flex-col items-start;
  }

  p,
  h3 {
    @apply m-0;
  }
`

const Hits = connectHits(props => {
  console.log(props.hits)
  return (
    <Dropdown.Menu>
      {props.hits.map(item => {
        return (
          <Item key={item.objectID}>
            <Typography.Title h3={true}>
              <p
                dangerouslySetInnerHTML={{
                  __html: item._highlightResult.title?.value || '',
                }}
              />
            </Typography.Title>
            <Typography.Paragraph>
              <p
                dangerouslySetInnerHTML={{
                  __html: item._highlightResult.body?.value || '',
                }}
              />
            </Typography.Paragraph>
          </Item>
        )
      })}
    </Dropdown.Menu>
  )
})

const searchClient = algolia.getSearchClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
)

const SearchContainer = styled.div`
  @apply mt-48 flex items-center justify-center w-full;

  [data-role='tooltip'] {
    @apply w-3/5 relative;
  }

  [data-role='input'] {
    @apply w-full shadow-2xl;
  }

  [data-role='tooltip-content'] {
    @apply w-full;
  }
`

const IndexPage: NextPage<{ recent: Github.Issue[]; someday: Github.Issue[] }> = props => {
  const keyword = useRouter().query.q as string
  const { data: issues, status } = useSearchIssue({ initialIssues: props.recent })
  return (
    <Layout>
      <Meta />
      {/* <SearchBox /> */}
      <SearchContainer>
        <InstantSearch
          indexName="actions_cheatsheet_issues"
          stalledSearchDelay={500}
          searchClient={searchClient}
        >
          <Dropdown
            trigger="click"
            getPopupContainer={() => document.querySelector('#SEARCH_CONTAINER')!}
            content={<Hits />}
            placement="bottomStart"
            id="SEARCH_CONTAINER"
          >
            <ConnectedSearchBox />
            <Configure
              highlightPreTag='<mark class="search-highlight">'
              highlightPostTag="</mark>"
            />
          </Dropdown>
        </InstantSearch>
      </SearchContainer>
      <div className="p-6 grid grid-cols-none gap-4 sm:grid-cols-2 sm:p-12">
        <Someday issues={props.someday} status={status} />
        <Recent highlight={keyword} issues={issues} status={status} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  const recent = await algolia.search({ content: _ctx.query.q as string })
  const someday = await algolia.someday()
  return { props: { recent: recent.hits, someday: someday.hits } }
}

export default IndexPage
