import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import { Github } from '~/interface/github'
import { api } from '~/api/client'
import { getId } from '~/utils/sheet'
import Layout from '~/components/Layout'
import pkg from 'package.json'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'

const Cheetsheet: NextPage<{ data: Github.Issue[] }> = props => {
  const router = useRouter()
  const { data } = useSWR(
    [`${pkg.author.name}-${pkg.name}-${router.query.id}-sheet`, router.query.id],
    (_name, id: string) => {
      return api.github.issues(id)
    },
    { initialData: props.data },
  )
  const id = router.query._id
  const issue = data?.find(v => getId(router.query.id as string, v) === id)
  useEffect(() => {
    const selected = document.querySelector(`#${id}`)
    if (selected) {
      selected.scrollIntoView({ behavior: 'smooth' })
    }
  }, [id])
  return (
    <Layout>
      <Meta title={issue?.title} description={issue?.body} />
      <div className="flex flex-col h-full w-full contianer items-center bg-gray-100 overflow-scroll">
        <h3 className="label lg:text-4xl text-xl text-gray-700 lg:my-20 my-5 mt-20">
          {router.query.id} <span className="text-gray-500">{'cheatsheet'}</span>
        </h3>
        <div className="lg:w-3/4 w-11/12">
          {data?.map(v => {
            return <Sheet className={'lg:mr-4 mb-4 lg:w-2/4 w-full'} v={v} />
          })}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const data = await api.github.issues(ctx?.params?.id as string)
  return { props: { data } }
}

export default Cheetsheet
