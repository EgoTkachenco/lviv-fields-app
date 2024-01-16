import { H4, Spacer, Button, Input, Text, Icon } from '../common'
import { AuthCard } from './elements'
import { observer } from 'mobx-react-lite'
import { Auth as store } from '../../store'
import { useForm } from '../../hooks'
import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const ForgotPasswordForm = observer(() => {
  const [sended, setSended] = useState(false)
  const form = useForm({
    email: {
      required: true,
      value: '',
    },
  })
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
      <AuthCard
        onSubmit={onSubmit}
        loading={store.isFetch}
        style={{ paddingBottom: '16px' }}
      >
        <div className="expand-icon" />
        <H4>Відновлення паролю</H4>
        <Spacer vertical size="24px" />
        <Text color="gray">* - поля обов{"'"}язкові до заповнення</Text>
        <Spacer vertical size="24px" />
        <Input
          placeholder="Електронна пошта*"
          {...form.getFieldProps('email')}
        />
        <Spacer vertical size="20px" />
        <Text>
          {!sended
            ? 'Введіть e-mail, до якого прив`язаний Ваш обліковий запис'
            : 'Лист відправлено, перевірте пошту'}
        </Text>
        <Spacer vertical size="20px" />
        <Button variant="success" type="submit">
          Надіслати пароль
        </Button>
        <Spacer vertical size="12px" />
        <Link href="/login">
          <BackLink>
            <Icon icon="chevron" size="10px" />
            Повернутися назад
          </BackLink>
        </Link>
      </AuthCard>
    </>
  )
})

export default ForgotPasswordForm

const BackLink = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
