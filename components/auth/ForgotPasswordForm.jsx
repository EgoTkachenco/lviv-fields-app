import { H4, Box, Spacer, Button, Input, Caption } from '../common'
import { AuthCard } from './elements'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { Auth as store } from '../../store'
import { useForm } from '../../hooks'
import { useState } from 'react'

const ForgotPasswordForm = observer(() => {
  const [sended, setSended] = useState(false)
  const form = useForm({
    email: {
      required: true,
      value: '',
    },
  })
  const router = useRouter()
  const onSubmit = (e) => {
    e.preventDefault()
    const isValid = form.validate()
    if (!isValid) return
    store.forgotPassword(form.state.email).then(({ key, error }) => {
      !error ? setSended(true) : form.onError(key, error)
    })
  }
  return (
    <>
      <AuthCard onSubmit={onSubmit} loading={store.isFetch}>
        <Box
          align="center"
          justify="space-between"
          direction-sm="column"
          align-sm="flex-start"
          gap-sm="15px"
        >
          <H4>Відновлення паролю</H4>
          <Caption color="gray">* - обов`язкове поле</Caption>
        </Box>

        <Spacer vertical size="24px" />
        <Input
          placeholder="Електронна пошта*"
          {...form.getFieldProps('email')}
        />
        <Spacer vertical size="20px" />
        <Caption>
          {!sended
            ? 'Введіть e-mail, до якого прив`язаний Ваш обліковий запис'
            : 'Лист відправлено, перевірте пошту'}
        </Caption>
        <Spacer vertical size="20px" />
        <Button variant="primary" type="submit">
          надіслати пароль
        </Button>
      </AuthCard>
      <Spacer vertical size="35px" />
      <Button variant="white-text" onClick={() => router.push('/login')}>
        повернутись назад
      </Button>
    </>
  )
})

export default ForgotPasswordForm
