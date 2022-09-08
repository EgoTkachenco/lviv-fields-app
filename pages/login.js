import Head from 'next/head'
import Layout from '../components/Layout'
import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Layout type="auth">
        <LoginForm />
      </Layout>
    </>
  )
}
