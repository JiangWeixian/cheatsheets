import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { api, Github } from '~/api'

const Cheetsheet: NextPage<{ data: Github.Issue[] }> = ({ data }) => {
  console.log(data)
  return <div>1</div>
}

Cheetsheet.getInitialProps = async (ctx: NextPageContext) => {
  const data = await api.github.issues(
    typeof ctx.query.id === 'string' ? [ctx.query.id] : ctx.query.id,
  )
  return { data }
}

export default Cheetsheet
