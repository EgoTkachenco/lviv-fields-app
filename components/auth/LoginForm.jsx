import styled from 'styled-components'
import { Card, H4, Text, Spacer, Button, Input } from '../common'
import Link from 'next/Link'
import { AuthCard, ButtonText } from './elements'

export default function LoginForm() {
  return (
    <AuthCard>
      <H4>Вхід в особистий кабінет</H4>
      <Spacer vertical size="24px" />
      <Input placeholder="Логiн" />
      <Spacer vertical size="10px" />
      <Input
        type="password"
        placeholder="Пароль"
        tip={<Link href="/forgot-password">Забули пароль?</Link>}
      />
      <Spacer vertical size="18px" />

      <Button type="primary">Увійти</Button>
      <ButtonText color="gray">або</ButtonText>
      <Button type="success">Зареєструватись</Button>
    </AuthCard>
  )
}
