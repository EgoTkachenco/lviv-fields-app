import styled from 'styled-components'
import { Card, H5, Spacer, Box, Icon, Button, Input } from '../../common'
import { CardField, Column, FilesList } from './elements'

const ContactDetails = ({ data, isRead, onChange }) => {
  return (
    <ContactCard>
      <ContactCardHeader>
        <H5>Інформація про договiр:</H5>
        <FilesList
          files={data.contract_files}
          onCreate={(file) => onChange('contract-file-new', file)}
          onDelete={(i) => onChange('contract-file-delete', i)}
          isRead={isRead}
        />
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
              type="date"
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
              type="date"
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
      <FilesList
        isMobile
        files={data.contract_files}
        onCreate={(file) => onChange('contract-file-new', file)}
        onDelete={(i) => onChange('contract-file-delete', i)}
        isRead={isRead}
      />
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
