import Head from 'next/head'
import Layout from '../components/Layout'
import Map from '../components/map'
import Page from '../components/Page'

export default function MapPage() {
  return (
    <Page isProtected="true">
      <Head>
        <title>Map</title>
      </Head>
      <Layout type="map">
        <Map />
      </Layout>
    </Page>
  )
}
