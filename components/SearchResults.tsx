/**
 * @fileoverview display search results
 */

import React from 'react'
import { Label } from '@omcs/request/types'
import { useRouter } from 'next/router'
import { animated, useTrail } from '@react-spring/web'
import { Box, Description } from 'granen'

import { Sheet } from '~/components/Sheet'

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

export const LabelSearchResults = ({ issues = {} }: { issues?: any }) => {
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

export const CheatSheetSearchResults = ({
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
