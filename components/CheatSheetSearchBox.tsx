import React, { useState, useCallback, useRef } from 'react'
import { api } from '@omcs/request/node'
import { Input, Dropdown, Typography } from 'granen'
import { Search } from 'styled-cssgg'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import type { Hit } from 'react-instantsearch-core'
import type { SearchClient } from 'algoliasearch'

import { SEARCH_CHEATSHEET_INDEX_NAME, SEARCH_LABELS_INDEX_NAME } from '~/utils/constants'

const searchClient: SearchClient = api.getSearchClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
)

const unShipProps: any = {
  enterkeyhint: 'search',
}


const Item = styled(Dropdown.Item)`
  && {
    @apply flex-col items-start;
  }

  p,
  h3 {
    @apply m-0;
  }
`

type HitsProps = {
  value: {
    hits: Hit[]
    index: typeof SEARCH_CHEATSHEET_INDEX_NAME | typeof SEARCH_LABELS_INDEX_NAME
  }[]
}

const Hits = (props: HitsProps) => {
  if (props.value.length === 0) {
    return (
      <Dropdown.Menu>
        <Item>
          No Results
        </Item>
      </Dropdown.Menu>
    )
  }
  return (
    <Dropdown.Menu>
      {
        props.value.map(item => {
          return <Dropdown.SubMenu key={item.index} title={item.index}>
            {item.hits.map(item => {
              return (
                <Item key={item.objectID}>
                  <Typography.Title h3={true}>
                    {item.index === SEARCH_CHEATSHEET_INDEX_NAME ? <p
                      dangerouslySetInnerHTML={{
                        __html: item._highlightResult.title?.value || '',
                      }}
                    /> : <p
                    dangerouslySetInnerHTML={{
                      __html: item._highlightResult.name?.value || '',
                    }}
                  />}
                  </Typography.Title>
                  <Typography.Paragraph>
                    {item.index === SEARCH_CHEATSHEET_INDEX_NAME ? <p
                      dangerouslySetInnerHTML={{
                        __html: item._highlightResult.body?.value || '',
                      }}
                    /> : (
                      <p
                      dangerouslySetInnerHTML={{
                        __html: item._highlightResult.description?.value || '',
                      }}
                    />
                    )}
                  </Typography.Paragraph>
                </Item>
              )
            })}
          </Dropdown.SubMenu>
        })
      }
      
      
    </Dropdown.Menu>
  )
}

export const CheatSheetSearchBox = () => {
  const [input, setInput] = useState("")
  const [value, setValue] = useState<HitsProps['value']>([])
  const searchApi = useRef(debounce((query: string = '') => {
    const queries = [{
      indexName: SEARCH_CHEATSHEET_INDEX_NAME,
      query,
      params: {
        hitsPerPage: 3
      }
    }, {
      indexName: SEARCH_LABELS_INDEX_NAME,
      query,
      params: {
        hitsPerPage: 3,
      }
    }];
    searchClient.multipleQueries(queries, { strategy: 'stopIfEnoughMatches', highlightPreTag:'<mark class="search-highlight">',
    highlightPostTag: "</mark>" }).then(({ results }: { results: any }) => {
      setValue(results as HitsProps['value'])
    });
  }, 500))
  const handleChange = useCallback((e) => {
    setInput(e.currentTarget.value)
    searchApi.current(e.currentTarget.value)
  }, [])
  return (
    <Dropdown
      trigger="click"
      getPopupContainer={() => document.querySelector('#SEARCH_CONTAINER')!}
      content={<Hits value={value} />}
      placement="bottomStart"
      id="SEARCH_CONTAINER"
    >
      <Input
        prefix={<Search />}
        borderless={true}
        {...unShipProps}
        type="input"
        size="lg"
        value={input}
        onChange={handleChange}
      />
    </Dropdown>
    
  )
}
