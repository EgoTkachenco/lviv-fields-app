import Head from 'next/head'
import Layout from '../components/Layout'
import Planner from '../components/planner'
import Page from '../components/Page'

export default function PlannerPage() {
  return (
    <Page isProtected="true">
      <Head>
        <title>Planner</title>
      </Head>

      <Layout>
        <Planner />
      </Layout>
    </Page>
  )
}
