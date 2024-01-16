import { H4, Box, Text, Spacer, Button, Input, Caption } from '../common'
import { AuthCard, ButtonText } from './elements'

export default function ResetPasswordForm() {
  return (
    <AuthCard>
      <div className="expand-icon" />

      <H4>Відновлення паролю</H4>
      <Spacer vertical size="24px" />
      <Text color="gray">* - обов`язкове поле</Text>
      <Spacer vertical size="24px" />

      <Input placeholder="Пароль*" />
      <Spacer vertical size="10px" />
      <Input placeholder="Повторити пароль*" />
      <Spacer vertical size="20px" />
      <Button type="primary">відновити пароль</Button>
    </AuthCard>
  )
}
