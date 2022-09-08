import Head from 'next/head'
import Layout from '../components/Layout'
import RegistrationForm from '../components/auth/RegistrationForm'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>

      <Layout type="auth">
        <RegistrationForm />
      </Layout>
    </>
  )
}
