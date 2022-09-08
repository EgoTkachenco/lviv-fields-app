import Head from 'next/head'
import Layout from '../components/Layout'
import ResetPasswordForm from '../components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>

      <Layout type="auth">
        <ResetPasswordForm />
      </Layout>
    </>
  )
}
