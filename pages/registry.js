import Head from 'next/head'
import Layout from '../components/Layout'
import Registry from '../components/registry'
import Page from '../components/Page'

export default function RegistryPage() {
  return (
    <Page isProtected="true">
      <Head>
        <title>Registry</title>
      </Head>

      <Layout>
        <Registry />
      </Layout>
    </Page>
  )
}
