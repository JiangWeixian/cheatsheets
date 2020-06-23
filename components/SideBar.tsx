import React from 'react'
import { useInfiniteQuery } from 'react-query'
import styled from 'styled-components'

import { api } from '~/api/client'

export const SideBar = () => {
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
  return (
    <StyledSideBar data-role="side-bar" className="bg-black w-4/12 h-full p-4 box-border">
      <input className="flex-0 h-4 bg-white" />
      <ul className="flex-1 overflow-scroll">
        {data?.map(page => {
          return (
            <>
              {page.data.map(v => (
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
