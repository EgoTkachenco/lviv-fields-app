import styled from 'styled-components'
import { Card, Text, H5, Spacer, Box } from '../common'

const FieldDetails = () => {
  return (
    <>
      <Card>
        <H5>Параметри земельної ділянки:</H5>
        <Spacer vertical size="20px" />
        <Box gap="4px" wrap>
          <Text>Кадастровий номер:</Text>
          <Text color="grey">4623087600:10:000:0114</Text>
        </Box>
        <Spacer vertical size="20px" />

        <Box gap="4px" wrap>
          <Text>Площа: </Text>
          <Text color="grey">0,257га</Text>
        </Box>
        <Spacer vertical size="20px" />
        <Box gap="4px" wrap>
          <Text>Розташування:</Text>
          <Text color="grey">поле №7, ряди 10 - 13</Text>
        </Box>
      </Card>
      <Spacer vertical size="40px" />
      <Card>
        <H5>Інформація про насадження:</H5>
        <Spacer vertical size="20px" />
        <Box gap="4px 4px" wrap>
          <Label type="header">Сорт</Label>
          <Label type="header">Кількість насаджень</Label>
          <Label>Ред Джонапринца</Label>
          <Label>278</Label>
          <Label>Гала</Label>
          <Label>156</Label>
        </Box>
      </Card>
    </>
  )
}

export default FieldDetails

const Label = styled(Card)`
  flex: 0 1 calc(50% - 2px);
  padding: 11px 15px;
  background: ${(props) => (props.type === 'header' ? '#CCD1E0' : '#EDF1F8')};
  border-radius: 0;
  font-weight: ${(props) => (props.type === 'header' ? '600' : '400')};
  font-size: 16px;
  line-height: 19px;
  color: #464f60;

  @media (max-width: 800px) {
    font-size: 12px;
    line-height: 16px;
  }
`
