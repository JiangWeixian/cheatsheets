import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { algolia } from '@omcs/request/algolia'
import { Input } from 'mayumi/input'
import { Menu as MayumiMenu } from 'mayumi/menu'
import { Text } from 'mayumi/text'
import { styled } from 'mayumi/theme'
import { Modal } from 'mayumi/modal'
import { Separator } from 'mayumi/separator'
import debounce from 'lodash.debounce'
import type { Hit } from 'react-instantsearch-core'
import scrollIntoView from 'scroll-into-view-if-needed'
import type { SearchClient } from 'algoliasearch'

import Search from '../assets/search.svg'

import {
  SEARCH_CHEATSHEET_INDEX_NAME,
  SEARCH_LABELS_INDEX_NAME,
  dictionary,
} from '~/utils/constants'
import { useRouter } from 'next/router'

const searchClient: SearchClient = algolia.getSearchClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
)

type Queries = Parameters<SearchClient['multipleQueries']>[0]

const unShipProps: any = {
  enterKeyHint: 'search',
}

const Item = styled(MayumiMenu.Item, {
  flexDirection: 'column',
  alignItems: 'flex-start',
})

type ListItem = {
  item: Hit
  index: typeof SEARCH_CHEATSHEET_INDEX_NAME | typeof SEARCH_LABELS_INDEX_NAME
}

type SearchResults = {
  hits: Hit[]
  index: typeof SEARCH_CHEATSHEET_INDEX_NAME | typeof SEARCH_LABELS_INDEX_NAME
}

type HitsProps = {
  list: ListItem[]
  loading: boolean
  selectedIndex: number
  onClickItem?: (
    index: typeof SEARCH_CHEATSHEET_INDEX_NAME | typeof SEARCH_LABELS_INDEX_NAME,
    id: string,
  ) => void
}

const Menu = styled(MayumiMenu, {
  '&&': {
    height: '300px',
    overflowY: 'auto',
  },
})

const HitItem = ({
  children,
  selected,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLLIElement> & { selected?: boolean }>) => {
  const ref = React.useCallback(
    (node) => {
      if (selected && node) {
        scrollIntoView(node, {
          scrollMode: 'if-needed',
          behavior: 'smooth',
          block: 'center',
          boundary: (parent) => {
            // All the parent elements of your target are checked until they
            // reach the #omcs-search-modal-menu. Prevents body and other parent
            // elements from being scrolled
            return parent.id !== 'omcs-search-modal-menu'
          },
        })
      }
    },
    [selected],
  )

  return (
    <Item selected={selected} ref={ref} {...props}>
      {children}
    </Item>
  )
}

const Hits = (props: HitsProps) => {
  if (props.loading) {
    return (
      <Menu>
        <Item>
          <i className="gg-spinner" />
        </Item>
      </Menu>
    )
  }
  if (props.list.length === 0) {
    return (
      <Menu>
        <Item>No Results</Item>
      </Menu>
    )
  }
  const hasLabels = props.list.filter((item) => item.index === SEARCH_LABELS_INDEX_NAME).length
  const hasIssues = props.list.filter((item) => item.index === SEARCH_CHEATSHEET_INDEX_NAME).length
  return (
    <Menu ghost={true} id="omcs-search-modal-menu" size="lg">
      {hasIssues && (
        <MayumiMenu.SubMenu title={dictionary[SEARCH_CHEATSHEET_INDEX_NAME]}>
          {props.list.map((item, index) => {
            if (item.index !== SEARCH_CHEATSHEET_INDEX_NAME) {
              return null
            }
            return (
              <HitItem
                selected={props.selectedIndex === index}
                onClick={() => props.onClickItem?.(item.index, item.item.objectID)}
                key={item.item.objectID}
              >
                <Text h3={true}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.item._highlightResult.title?.value || '',
                    }}
                  />
                </Text>
                <Text p={true} type="tertiary">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.item._highlightResult.body?.value || '',
                    }}
                  />
                </Text>
              </HitItem>
            )
          })}
        </MayumiMenu.SubMenu>
      )}
      {hasLabels && (
        <MayumiMenu.SubMenu title={dictionary[SEARCH_LABELS_INDEX_NAME]}>
          {props.list.map((item, index) => {
            if (item.index !== SEARCH_LABELS_INDEX_NAME) {
              return null
            }
            return (
              <HitItem
                selected={props.selectedIndex === index}
                onClick={() => props.onClickItem?.(item.index, item.item.objectID)}
                key={item.item.objectID}
              >
                <Text h3={true}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.item._highlightResult.name?.value || '',
                    }}
                  />
                </Text>
                <Text p={true} type="tertiary">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.item._highlightResult.description?.value || '',
                    }}
                  />
                </Text>
              </HitItem>
            )
          })}
        </MayumiMenu.SubMenu>
      )}
    </Menu>
  )
}

export const SearchModal = () => {
  const [input, setInput] = useState('')
  const [value, setValue] = useState<SearchResults[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedIndexRef = useRef(0)
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  visibleRef.current = visible
  const list = useMemo(() => {
    return value.reduce((prev: ListItem[], cur: SearchResults) => {
      return prev.concat(
        cur.hits.map((item: Hit) => ({
          item,
          index: cur.index,
        })),
      )
    }, [] as ListItem[])
  }, [value])
  const listRef = useRef<ListItem[]>([])
  const router = useRouter()
  listRef.current = list
  const handleClick = useCallback(
    (index: typeof SEARCH_CHEATSHEET_INDEX_NAME | typeof SEARCH_LABELS_INDEX_NAME, id: string) => {
      if (index === 'cheatsheets_issues') {
        router.push('/sheet/id/[id]', `/sheet/id/${id}`)
      }
      if (index === 'cheatsheets_labels') {
        router.push('/sheet/label/[id]', `/sheet/label/${id}`)
      }
    },
    [router],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!visibleRef.current) {
        return
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()

        const item = listRef.current[selectedIndexRef.current]

        if (item) {
          setVisible(false)
          setSelectedIndex(0)
          selectedIndexRef.current = 0
          handleClick(item.index, item.item.objectID)
        } else {
          setVisible(false)
          selectedIndexRef.current = 0
        }
      }

      // arrow up
      if (event.key === 'ArrowUp' || (event.ctrlKey && event.key === 'p')) {
        event.preventDefault()
        event.stopPropagation()

        if (listRef.current.length) {
          const prevIndex = selectedIndexRef.current - 1
          setSelectedIndex(Math.max(0, prevIndex))
          selectedIndexRef.current = Math.max(0, prevIndex)
        } else {
          setVisible(false)
          selectedIndexRef.current = 0
        }
      }

      // arrow down
      if (
        event.key === 'ArrowDown' ||
        event.key === 'Tab' ||
        (event.ctrlKey && event.key === 'n')
      ) {
        event.preventDefault()
        event.stopPropagation()

        if (listRef.current.length) {
          const total = listRef.current.length - 1
          const nextIndex = selectedIndexRef.current + 1
          setSelectedIndex(Math.min(nextIndex, total))
          selectedIndexRef.current = Math.min(nextIndex, total)
        } else {
          setVisible(false)
          selectedIndexRef.current = 0
        }
      }

      if (event.key === 'Escape') {
        selectedIndexRef.current = 0
      }
    }
    window.document.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const searchApi = useRef(
    debounce(async (query = '') => {
      const queries: Queries = [
        {
          indexName: SEARCH_CHEATSHEET_INDEX_NAME,
          query,
          params: {
            hitsPerPage: 3,
            highlightPreTag: '<mark class="search-highlight">',
            highlightPostTag: '</mark>',
            facetFilters: ['state:OPEN'],
          },
        },
        {
          indexName: SEARCH_LABELS_INDEX_NAME,
          query,
          params: {
            hitsPerPage: 3,
            highlightPreTag: '<mark class="search-highlight">',
            highlightPostTag: '</mark>',
          },
        },
      ]
      await searchClient.multipleQueries(queries).then(({ results }: { results: any }) => {
        setValue(results)
      })
      setLoading(false)
    }, 500),
  )
  const handleChange = useCallback(async (e) => {
    setInput(e.currentTarget.value)
    setLoading(true)
    await searchApi.current(e.currentTarget.value)
  }, [])
  return (
    <Modal
      onClose={() => setVisible(false)}
      onOpen={() => setVisible(true)}
      onClickMask={() => setVisible(false)}
      glassmorphism={true}
      closeIcon={false}
      visible={visible}
    >
      <Input
        prefix={<Search width={14} />}
        {...unShipProps}
        type="input"
        size="lg"
        value={input}
        onChange={handleChange}
        ghost={true}
        autoFocus={true}
      />
      {/* width overflow not working on flex box */}
      <div style={{ width: '100%' }}>
        <Separator css={{ mx: '-$4', w: 'auto' }} />
      </div>
      <Hits loading={loading} onClickItem={handleClick} selectedIndex={selectedIndex} list={list} />
    </Modal>
  )
}
