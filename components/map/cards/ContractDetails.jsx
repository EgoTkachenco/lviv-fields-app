import styled from 'styled-components'
import { Card, H5, Spacer, Box, Icon, Button, Input } from '../../common'
import { CardField, Column } from './elements'

const ContactDetails = ({ data, isRead, onChange }) => {
  return (
    <ContactCard>
      <ContactCardHeader>
        <H5>Інформація про договiр:</H5>
        <Files gap="32px" align="center">
          <Icon icon="file-doc" size="32px" />
          <Icon icon="file-pdf" size="32px" />
          <Button variant="primary">Додати ФАЙЛ</Button>
        </Files>
      </ContactCardHeader>
      {/* <Spacer vertical size="25px" /> */}
      <Spacer vertical size="20px" />
      <Box gap="20px" direction="column" width="100%">
        <CardField
          styledBox={Column}
          isRead={isRead}
          label="Договір"
          value={data.contract_name}
          editableSlot={
            <Input
              value={data.contract_name}
              onChange={(value) => onChange('contract_name', value)}
            />
          }
        />
        <CardField
          styledBox={Column}
          isRead={isRead}
          label="Дата укладання"
          value={data.contract_start}
          editableSlot={
            <Input
              value={data.contract_start}
              onChange={(value) => onChange('contract_start', value)}
            />
          }
        />
        <CardField
          styledBox={Column}
          isRead={isRead}
          label="Дійсний до"
          value={data.contract_due}
          editableSlot={
            <Input
              value={data.contract_due}
              onChange={(value) => onChange('contract_due', value)}
            />
          }
        />
        <CardField
          styledBox={Column}
          isRead={isRead}
          label="Примiтки"
          value={data.contract_note}
          editableSlot={
            <Input
              value={data.contract_note}
              onChange={(value) => onChange('contract_note', value)}
            />
          }
        />
      </Box>
      <FilesMobile gap="32px" align="center">
        <Button type="primary">Додати ФАЙЛ</Button>
        <Icon icon="file-doc" size="32px" />
        <Icon icon="file-pdf" size="32px" />
      </FilesMobile>
    </ContactCard>
  )
}

export default ContactDetails

const ContactCard = styled(Card)`
  min-width: 650px;
  @media (max-width: 800px) {
    min-width: unset;
  }
`

const ContactCardHeader = styled(Box)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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
