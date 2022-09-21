import Head from 'next/head'
import Layout from '../components/Layout'
import RegistrationForm from '../components/auth/RegistrationForm'
import Page from '../components/Page'

export default function LoginPage() {
  return (
    <Page>
      <Head>
        <title>Registration</title>
      </Head>

      <Layout type="auth">
        <RegistrationForm />
      </Layout>
    </Page>
  )
}
