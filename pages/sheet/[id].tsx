import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import showdown from 'showdown'

import { api, Github } from '~/api'

const Convertor = new showdown.Converter()

const Cheetsheet: NextPage<{ data: Github.Issue[] }> = ({ data }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col contianer items-center justify-center bg-gray-100 overflow-scroll">
      <h3 className="text-6xl text-gray-800">{router.query.id}</h3>
      <div className="w-3/4">
        {data?.map(v => {
          return (
            <div className="w-2/4 pr-4 pb-4" style={{ float: 'left' }}>
              <p className="text-blue-600 mb-4">{v.title}</p>
              <div
                className="shadow p-4 w-full rounded overflow-hidden"
                key={v.title}
                dangerouslySetInnerHTML={{ __html: Convertor.makeHtml(v.body || '') }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

Cheetsheet.getInitialProps = async (ctx: NextPageContext) => {
  const data = await api.github.issues(
    typeof ctx.query.id === 'string' ? [ctx.query.id] : ctx.query.id,
  )
  return { data }
}

export default Cheetsheet
