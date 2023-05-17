import {
  Modal,
  Button,
  Box,
  Text,
  Spacer,
  Input,
  Autocomplete,
  Label,
  LabelInput,
  Checkbox,
} from '../common'
import { useForm } from '@mantine/form'
import styled from 'styled-components'

const OwnerModal = ({ children, onConfirm, onCancel = () => {}, data }) => {
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
            <Input placeholder="ПІБ" {...form.getInputProps('full_name')} />
            <Input
              type="date"
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
            <Input placeholder="Телефон" {...form.getInputProps('phone')} />
            <Input placeholder="Пошта" {...form.getInputProps('email')} />
          </Row>
          <Row>
            <Input placeholder="Нотатка" {...form.getInputProps('note')} />
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
            <Input
              type="date"
              placeholder="Коли видано паспорт"
              {...form.getInputProps('passport_date')}
            />
          </Row>
          <Row>
            <Input placeholder="ІІН" {...form.getInputProps('iin')} />
          </Row>
          <Row>
            <Checkbox
              label="Теперішній власник"
              {...form.getInputProps('isCurrentOwner')}
            />
          </Row>
          <Row>
            <Button
              variant="outline"
              onClick={() => {
                onCancel()
              }}
            >
              Закрити
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
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
