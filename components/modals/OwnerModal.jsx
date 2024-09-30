import {
  Modal,
  Button,
  Box,
  Input,
  Checkbox,
  PhoneInput,
  DateInput,
} from '../common'
import { useForm } from '@mantine/form'
import styled from 'styled-components'

const OwnerModal = ({
  onConfirm,
  onCancel = () => {},
  data,
  isCurrentOwnerDisabled = false,
}) => {
  const form = useForm({
    initialValues: {
      full_name: data?.full_name || '',
      birth_date: data?.birth_date || null,
      address: data?.address || '',
      phone: data?.phone || '',
      email: data?.email || '',
      note: data?.note || '',
      passport: data?.passport || '',
      passport_who: data?.passport_who || '',
      passport_date: data?.passport_date || '',
      iin: data?.iin || '',
      registration_address: data?.registration_address || '',
      isCurrentOwner: data?.isCurrentOwner || false,
    },

    validate: {},
  })

  const handleSubmit = form.onSubmit((values) => {
    onConfirm({ ...data, ...values })
  })

  return (
    <Modal
      title={(data ? 'Редагування' : 'Створення') + ' Власника'}
      show={true}
      close={() => onCancel()}
    >
      <form onSubmit={handleSubmit}>
        <Box gap="16px" direction="column">
          <Row>
            <Input placeholder="Прізвище" {...form.getInputProps('surname')} />
            <Input placeholder="Імʼя" {...form.getInputProps('first_name')} />
          </Row>
          <Row>
            <Input
              placeholder="По-батькові"
              {...form.getInputProps('patronymic')}
            />
            <DateInput
              placeholder="Дата народження"
              {...form.getInputProps('birth_date')}
            />
          </Row>
          <Row>
            <Input
              placeholder="Місце проживання"
              {...form.getInputProps('address')}
            />
            {/* <Input
              placeholder="Примітка(родинний зв'язок, телефон)"
              {...form.getInputProps('note')}
            /> */}
          </Row>
          <Row>
            <PhoneInput
              placeholder="Телефон"
              {...form.getInputProps('phone')}
            />
            <Input placeholder="Пошта" {...form.getInputProps('email')} />
          </Row>
          <Row>
            <Input
              placeholder="Примітка до власника"
              {...form.getInputProps('note')}
            />
          </Row>
          <Row>
            <Input placeholder="Паспорт" {...form.getInputProps('passport')} />
            <Input
              placeholder="Місце реєстрації"
              {...form.getInputProps('registration_address')}
            />
          </Row>
          <Row>
            <Input
              placeholder="Ким видано паспорт"
              {...form.getInputProps('passport_who')}
            />
            <DateInput
              placeholder="Коли видано паспорт"
              {...form.getInputProps('passport_date')}
            />
          </Row>
          <Row>
            <Input placeholder="ІПН" {...form.getInputProps('iin')} />
          </Row>
          <Row>
            <Checkbox
              label="Теперішній власник"
              {...form.getInputProps('isCurrentOwner')}
              disabled={isCurrentOwnerDisabled}
            />
          </Row>
          <Row>
            <Button variant="outline" onClick={onCancel}>
              Закрити
            </Button>
            <Button variant="primary" type="submit">
              Підтвердити
            </Button>
          </Row>
        </Box>
      </form>
    </Modal>
  )
}

export default OwnerModal

const Row = styled(Box)`
  gap: 16px;
  width: 100%;
  & > * {
    flex: 1 1 50%;
  }
`
