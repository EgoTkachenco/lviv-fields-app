import { H4, Box, Spacer, Button, Input, Caption } from '../common'
import { AuthCard, ButtonText } from './elements'

export default function RegistationForm() {
  return (
    <AuthCard>
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
      <Input placeholder="Логiн*" />
      <Spacer vertical size="10px" />
      <Input placeholder="Електронна пошта*" />
      <Spacer vertical size="10px" />
      <Input placeholder="Пароль*" />
      <Spacer vertical size="10px" />
      <Input placeholder="Повторити пароль*" />
      <Spacer vertical size="18px" />

      <Button type="success">Зареєструватись</Button>
      <ButtonText color="gray">або</ButtonText>
      <Button type="primary">Увійти</Button>
    </AuthCard>
  )
}
