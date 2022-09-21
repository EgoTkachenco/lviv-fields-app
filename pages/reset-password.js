import Head from 'next/head'
import Layout from '../components/Layout'
import ResetPasswordForm from '../components/auth/ResetPasswordForm'
import Page from '../components/Page'

export default function ResetPasswordPage() {
  return (
    <Page>
      <Head>
        <title>Reset Password</title>
      </Head>

      <Layout type="auth">
        <ResetPasswordForm />
      </Layout>
    </Page>
  )
}
