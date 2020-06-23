import React from 'react'
import { useInfiniteQuery } from 'react-query'
import styled from 'styled-components'
import { useRematch } from '@use-rematch/core'
import { useRouter } from 'next/router'
import cx from 'classnames'

import { api } from '~/api/client'

const unShipProps: any = {
  enterkeyhint: 'search',
}

export const SideBar = (props: { className?: string }) => {
  const { data } = useInfiniteQuery(
    'labels',
    async (_key, page: number = 1) => {
      const data = await api.github.labels()
      return { data, page }
    },
    {
      getFetchMore: last => last.page + 1,
    },
  )
  const searchTerms = useRouter().query.q as string
  const { state, dispatch } = useRematch({
    name: 'homepage',
    state: {
      keyword: searchTerms ?? '',
      status: 'init',
    } as {
      keyword: string
      status: 'loading' | 'loaded' | 'init'
    },
    reducers: {
      setKeyword(state, keyword: string) {
        return {
          ...state,
          keyword,
        }
      },
      setStatus(state, status: 'loading' | 'loaded' | 'init') {
        return {
          ...state,
          status,
        }
      },
    },
  })
  return (
    <StyledSideBar
      data-role="side-bar"
      className={cx('bg-black h-full p-4 box-border', props.className)}
    >
      <input
        value={state.keyword}
        {...unShipProps}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            // search issues
          }
        }}
        onChange={e => dispatch.setKeyword(e.target.value)}
        className="shadow appearance-none border focus:outline-none focus:shadow-outline w-full flex-0 h-12 text-gray-500 rounded"
      />
      <ul className="flex-1 overflow-scroll">
        {data?.map(page => {
          return (
            <>
              {page.data
                .filter(v => v.name.includes(state.keyword))
                .map(v => (
                  <li className="text-white rounded cursor-pointer p-4 hover:bg-indigo-900">
                    {v.name}
                  </li>
                ))}
            </>
          )
        })}
      </ul>
    </StyledSideBar>
  )
}

const StyledSideBar = styled.div`
  /* position: fixed; */
  /* top: 0px; */
  /* left: 0px; */
  display: flex;
  flex-direction: column;
`
