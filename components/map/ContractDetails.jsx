import styled from 'styled-components'
import { Card, Text, H5, Spacer, Box, Icon, Button } from '../common'

const ContactDetails = () => {
  return (
    <ContactCard>
      <ContactCardHeader>
        <H5>Інформація про договiр:</H5>
        <Files gap="32px" align="center">
          <Icon icon="file-doc" size="32px" />
          <Icon icon="file-pdf" size="32px" />
          <Button type="primary">Додати ФАЙЛ</Button>
        </Files>
      </ContactCardHeader>
      <Spacer vertical size="25px" />
      <Spacer vertical size="20px" />
      <Box gap="20px" direction="column">
        <Box gap="4px">
          <Text>Договір:</Text>
          <Text color="grey">№125/125/12</Text>
        </Box>
        <Box gap="4px">
          <Text>Дата укладання:</Text>
          <Text color="grey">12.05.2017</Text>
        </Box>
        <Box gap="4px">
          <Text>Дійсний до:</Text>
          <Text color="grey">12.05.2025</Text>
        </Box>
        <Box gap="4px">
          <Text>Примiтки:</Text>
          <Text color="grey">немає</Text>
        </Box>
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
