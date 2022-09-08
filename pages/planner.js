import Head from 'next/head'
import Layout from '../components/Layout'
import Planner from '../components/planner'

export default function PlannerPage() {
  return (
    <>
      <Head>
        <title>Planner</title>
      </Head>

      <Layout>
        <Planner />
      </Layout>
    </>
  )
}
