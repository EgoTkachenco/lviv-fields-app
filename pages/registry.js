import Head from 'next/head'
import Layout from '../components/Layout'
import Registry from '../components/registry'

export default function RegistryPage() {
  return (
    <>
      <Head>
        <title>Registry</title>
      </Head>

      <Layout>
        <Registry />
      </Layout>
    </>
  )
}
