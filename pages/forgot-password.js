import Head from 'next/head'
import Layout from '../components/Layout'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'
import Page from '../components/Page'

export default function ForgotPasswordPage() {
  return (
    <Page>
      <Head>
        <title>Forgot Password</title>
      </Head>

      <Layout type="auth">
        <ForgotPasswordForm />
      </Layout>
    </Page>
  )
}
