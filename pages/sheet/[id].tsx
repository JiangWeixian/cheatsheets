import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useQuery } from 'react-query'
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
  const { data } = useQuery(
    [`${pkg.author.name}-${pkg.name}-${router.query.id}-sheet`, router.query.id as string],
    (_key, id: string) => {
      return api.github.issues({ label: id })
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
      <div className="bg-gray-100 overflow-scroll px-12 pt-10">
        {data?.map(v => {
          return (
            <Sheet
              key={v.id}
              label={router.query.id as string}
              className="w-1/2 pr-4 pb-4 float-left"
              v={v}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const data = await api.github.issues({ label: ctx?.params?.id as string })
  return { props: { data } }
}

export default Cheetsheet
