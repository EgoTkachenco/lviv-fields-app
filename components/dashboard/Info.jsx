import styled from 'styled-components'
import { H1, Text, Spacer, H2, H4, Button, Icon, H5 } from '../common'

const Info = () => (
  <Wrapper>
    <div>
      <H1>LAND-MAP</H1>
      <Spacer size="40px" vertical />
      <TextContainer>
        <H2 color="gray">корпоративна</H2>
        <H2>система управління</H2>
      </TextContainer>
    </div>
    <DetailsBlock>
      <H4>Як це працює?</H4>
      <Spacer size="32px" vertical />
      <H5>
        Ознамойтеся з функціоналом системи LAND-MAP. Завантажте інструкцію та
        отримайте всю необхідну інформацію та поради щодо використання.
      </H5>
      <Spacer size="24px" vertical />
      <Button variant="primary" width="auto">
        Завантажити
        <Icon icon="download" size="16px" />
      </Button>
    </DetailsBlock>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 64px;
  flex-wrap: wrap;
`
const TextContainer = styled.div`
  max-width: 800px;
  h2 {
    display: inline;
    margin-right: 16px;
  }
`
const DetailsBlock = styled.div`
  max-width: 580px;
`

export default Info
