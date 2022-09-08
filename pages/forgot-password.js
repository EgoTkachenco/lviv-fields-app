import Head from 'next/head'
import Layout from '../components/Layout'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>

      <Layout type="auth">
        <ForgotPasswordForm />
      </Layout>
    </>
  )
}
