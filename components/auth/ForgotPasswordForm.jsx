import { H4, Box, Spacer, Button, Input, Caption } from '../common'
import { AuthCard } from './elements'

export default function ForgotPasswordForm() {
  return (
    <>
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
        <Input placeholder="Електронна пошта*" />
        <Spacer vertical size="20px" />
        <Caption>
          Введіть e-mail, до якого прив`язаний Ваш обліковий запис
        </Caption>
        <Spacer vertical size="20px" />
        <Button variant="primary">надіслати пароль</Button>
      </AuthCard>
      <Spacer vertical size="35px" />
      <Button variant="white-text">повернутись назад</Button>
    </>
  )
}
