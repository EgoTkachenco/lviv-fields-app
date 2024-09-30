import styled from 'styled-components'
import { Card, H5, Spacer, Box, Input, DateInput } from '../../common'
import { CardField, Column, FilesList } from './elements'
import { formatDate } from '../../../utils'

const ContactDetails = ({ data, isRead, onChange }) => {
  return (
    <ContactCard>
      <ContactCardHeader>
        <H5>Інформація про договiр:</H5>
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
          value={data.contract_start && formatDate(data.contract_start)}
          editableSlot={
            <DateInput
              value={data.contract_start}
              onChange={(value) => onChange('contract_start', value)}
            />
          }
        />
        <CardField
          styledBox={Column}
          isRead={isRead}
          label="Дійсний до"
          value={data.contract_due && formatDate(data.contract_due)}
          editableSlot={
            <DateInput
              value={data.contract_due}
              onChange={(value) => onChange('contract_due', value)}
            />
          }
        />
        <CardField
          styledBox={Column}
          isRead={isRead}
          label="Примiтка до договору"
          value={data.contract_note}
          editableSlot={
            <Input
              style={{ flexGrow: 1 }}
              value={data.contract_note}
              onChange={(value) => onChange('contract_note', value)}
            />
          }
        />
      </Box>
    </ContactCard>
  )
}

export default ContactDetails

const ContactCard = styled(Card)``

const ContactCardHeader = styled(Box)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`
