import Head from 'next/head'
import Layout from '../components/Layout'
import LoginForm from '../components/auth/LoginForm'
import Page from '../components/Page'

export default function LoginPage() {
  return (
    <Page>
      <Head>
        <title>Login</title>
      </Head>

      <Layout type="auth">
        <LoginForm />
      </Layout>
    </Page>
  )
}
