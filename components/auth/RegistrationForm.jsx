import { H4, Box, Spacer, Button, Input, Caption } from '../common'
import { AuthCard, ButtonText } from './elements'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Auth as store } from '../../store'
import { useForm } from '../../hooks'

const RegistationForm = observer(() => {
  const form = useForm({
    username: {
      required: true,
      value: '',
    },
    email: {
      required: true,
      value: '',
      type: 'email',
    },
    password: {
      required: true,
      value: '',
    },
    confirmPassword: {
      required: true,
      value: '',
    },
  })
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    const isValid = form.validate()
    if (!isValid) return
    if (form.state.password !== form.state.confirmPassword)
      return form.onError('password', 'Паролі не співпадають')

    store
      .signUp(form.state.username, form.state.email, form.state.password)
      .then(({ key, error }) => {
        !error ? router.push('/') : form.onError(key, error)
      })
  }
  return (
    <AuthCard onSubmit={onSubmit}>
      <Box
        align="center"
        justify="space-between"
        direction-sm="column"
        align-sm="flex-start"
        gap-sm="15px"
      >
        <H4>Реєстрація</H4>
        <Caption color="gray">* - обов`язкове поле</Caption>
      </Box>

      <Spacer vertical size="24px" />
      <Input placeholder="Логiн*" {...form.getFieldProps('username')} />
      <Spacer vertical size="10px" />
      <Input placeholder="Електронна пошта*" {...form.getFieldProps('email')} />
      <Spacer vertical size="10px" />
      <Input
        placeholder="Пароль*"
        type="password"
        {...form.getFieldProps('password')}
      />
      <Spacer vertical size="10px" />
      <Input
        placeholder="Повторити пароль*"
        type="password"
        {...form.getFieldProps('confirmPassword')}
      />
      <Spacer vertical size="18px" />

      <Button variant="success" type="submit">
        Зареєструватись
      </Button>
      <ButtonText color="gray">або</ButtonText>
      <Button variant="primary" onClick={() => router.push('/login')}>
        Увійти
      </Button>
    </AuthCard>
  )
})

export default RegistationForm
