import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Masonry from 'react-responsive-masonry'

import { Github } from '~/interface/github'
import { api as server } from '~/request/server'
import { api as client } from '~/request/client'
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
      return client.github.issues({ labels: id })
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
      <div className="p-12">
        <Masonry columnsCount={2} gutter="16px">
          {data?.map(v => {
            return <Sheet key={v.id} label={router.query.id as string} className="w-1/2" v={v} />
          })}
        </Masonry>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const data = await server.github.issues({ labels: ctx?.params?.id as string, sort: 'updated' })
  return { props: { data } }
}

export default Cheetsheet
