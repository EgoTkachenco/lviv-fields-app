import styled from 'styled-components'
import { Card, Text, H5, Spacer, Box, Icon, Button } from '../../common'

const OwnerDetails = () => {
  return (
    <Card>
      <Box justify="space-between" align="center">
        <H5>Інформація про власника земельної ділянки:</H5>
        <Files gap="32px" align="center">
          <Icon icon="file-doc" size="32px" />
          <Icon icon="file-pdf" size="32px" />
          <Button type="primary">Додати ФАЙЛ</Button>
        </Files>
      </Box>
      <Spacer vertical size="25px" />
      <Box gap="40px" direction-sm="column">
        <Avatar src="/avatar.png" />
        <Box wrap="true" gap="20px" direction-sm="column">
          <Column gap="4px">
            <Text>ПІБ:</Text>
            <Text color="grey">Василенко Галина Павлівна</Text>
          </Column>
          <Column gap="4px">
            <Text>Контактний телефон: </Text>
            <Text color="grey">+380675847511</Text>
          </Column>
          <Column gap="4px">
            <Text>Дата народження: </Text>
            <Text color="grey">12.05.1962</Text>
          </Column>
          <Column gap="4px">
            <Text>Електронна пошта: </Text>
            <Text color="grey">fhdks@gmail.com</Text>
          </Column>
          <Box gap="4px" width="100%" wrap="true">
            <Text>Адреса:</Text>
            <Text color="grey">
              Львівська обл., Червоноградський р-н., с. Соснина, вул. Центральна
              буд. 17
            </Text>
          </Box>
          <Box gap="4px" width="100%" wrap="true">
            <Text>Примітка: </Text>
            <Text color="grey">
              Контактна особа син Василенко Іван Іванович тел. 0675366544
            </Text>
          </Box>
        </Box>
      </Box>
      <FilesMobile gap="32px" align="center">
        <Button type="primary">Додати ФАЙЛ</Button>
        <Icon icon="file-doc" size="32px" />
        <Icon icon="file-pdf" size="32px" />
      </FilesMobile>
    </Card>
  )
}

export default OwnerDetails

const Column = styled(Box)`
  width: 35%;
  @media (max-width: 1200px) {
    width: calc(50% - 16px);
  }
  @media (max-width: 800px) {
    width: 100%;
    flex-wrap: wrap;
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
