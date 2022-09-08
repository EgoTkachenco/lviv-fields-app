import { H4, Box, Text, Spacer, Button, Input, Caption } from '../common'
import { AuthCard, ButtonText } from './elements'

export default function ResetPasswordForm() {
  return (
    <AuthCard>
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
      <Input placeholder="Пароль*" />
      <Spacer vertical size="10px" />
      <Input placeholder="Повторити пароль*" />
      <Spacer vertical size="20px" />
      <Button type="primary">відновити пароль</Button>
    </AuthCard>
  )
}
