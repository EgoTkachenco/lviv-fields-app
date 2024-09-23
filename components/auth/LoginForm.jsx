import { H4, Spacer, Button, Input } from '../common'
import Link from 'next/link'
import { AuthCard, ButtonText } from './elements'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Auth as store } from '../../store'
import { useForm } from '../../hooks'

const LoginForm = observer(() => {
  const form = useForm({
    identifier: {
      required: true,
      value: '',
    },
    password: {
      required: true,
      value: '',
    },
  })
  const router = useRouter()
  const onSubmit = (e) => {
    e.preventDefault()
    const isValid = form.validate()
    if (!isValid) return
    store
      .signIn(form.state.identifier, form.state.password)
      .then(({ key, error }) => {
        !error ? router.push('/map') : form.onError(key, error)
      })
  }
  return (
    <AuthCard onSubmit={onSubmit} loading={store.isFetch || undefined}>
      <div className="expand-icon" />
      <H4>Вхід в особистий кабінет</H4>
      <Spacer vertical size="30px" />
      <Input placeholder="Логiн" {...form.getFieldProps('identifier')} />
      <Spacer vertical size="12px" />
      <Input
        type="password"
        placeholder="Пароль"
        tip={
          <Link href="/forgot-password" style={{ opacity: 0.5 }}>
            Забули пароль?
          </Link>
        }
        {...form.getFieldProps('password')}
      />
      <Spacer vertical size="25px" />

      <Button variant="primary" type="submit">
        Увійти
      </Button>
      <ButtonText>або</ButtonText>
      <Button variant="success" onClick={() => router.push('/registration')}>
        Зареєструватись
      </Button>
    </AuthCard>
  )
})

export default LoginForm
