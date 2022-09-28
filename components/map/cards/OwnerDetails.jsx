import styled from 'styled-components'
import { Card, H5, Spacer, Box, Icon, Button, Input } from '../../common'
import { CardField, Column } from './elements'

const OwnerDetails = ({ data, isRead, onChange }) => {
  return (
    <Card>
      <Box justify="space-between" align="center">
        <H5>Інформація про власника земельної ділянки:</H5>
        <Files gap="32px" align="center">
          <Icon icon="file-doc" size="32px" />
          <Icon icon="file-pdf" size="32px" />
          <Button variant="primary">Додати ФАЙЛ</Button>
        </Files>
      </Box>

      <Spacer vertical size="25px" />

      <Box gap="40px" direction-sm="column">
        <Avatar src="/avatar.png" />
        <Box wrap="true" gap="20px" direction-sm="column">
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="ПІБ"
            value={data.owner_fullname}
            editableSlot={
              <Input
                placeholder="ПІБ"
                value={data.owner_fullname}
                onChange={(value) => onChange('owner_fullname', value)}
              />
            }
          />
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="Контактний телефон"
            value={data.owner_phone}
            editableSlot={
              <Input
                value={data.owner_phone}
                onChange={(value) => onChange('owner_phone', value)}
              />
            }
          />
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="Дата народження"
            value={data.owner_birthdate}
            editableSlot={
              <Input
                type="date"
                value={data.owner_birthdate}
                onChange={(value) => onChange('owner_birthdate', value)}
              />
            }
          />
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="Електронна пошта"
            value={data.owner_mail}
            editableSlot={
              <Input
                value={data.owner_mail}
                onChange={(value) => onChange('owner_mail', value)}
              />
            }
          />
          <CardField
            styledBox={FullBox}
            isRead={isRead}
            label="Адреса"
            value={data.owner_address}
            editableSlot={
              <Input
                value={data.owner_address}
                onChange={(value) => onChange('owner_address', value)}
              />
            }
          />
          <CardField
            styledBox={FullBox}
            isRead={isRead}
            label="Примітка"
            value={data.owner_note}
            editableSlot={
              <Input
                value={data.owner_note}
                onChange={(value) => onChange('owner_note', value)}
              />
            }
          />
        </Box>
      </Box>
      <FilesMobile gap="32px" align="center">
        <Button variant="primary">Додати ФАЙЛ</Button>
        <Icon icon="file-doc" size="32px" />
        <Icon icon="file-pdf" size="32px" />
      </FilesMobile>
    </Card>
  )
}

export default OwnerDetails

const FullBox = styled(Box)`
  width: 100%;
  gap: 16px;
  & :nth-child(2) {
    flex-grow: 1;
  }
`
const Avatar = styled.img`
  min-width: 160px;
  min-height: 160px;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: 1600px) {
    min-width: 120px;
    min-height: 120px;
  }
  @media (max-width: 1200px) {
    min-width: 100px;
    min-height: 100px;
  }
`

const Files = styled(Box)`
  @media (max-width: 800px) {
    display: none;
  }
`
const FilesMobile = styled(Box)`
  display: none;

  @media (max-width: 800px) {
    margin-top: 20px;
    display: flex;
  }
`
