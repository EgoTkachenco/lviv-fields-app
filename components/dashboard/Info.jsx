import styled from 'styled-components'
import { H1, Text, Spacer, H2, H4, Button, Icon, H5 } from '../common'

const Info = () => (
  <Wrapper>
    <TextContainer>
      <H1>LAND-MAP</H1>
      <div>
        <H2>
          <span style={{ opacity: 0.5, marginRight: '4px' }}>корпоративна</span>{' '}
          система управління
        </H2>
      </div>
    </TextContainer>
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

  @media (max-width: 1600px) {
    gap: 32px;
  }
`
const TextContainer = styled.div`
  max-width: 700px;

  @media (max-width: 1600px) {
    max-width: calc(50% - 16px);

    h1 {
      font-size: 64px;
    }

    h2 {
      display: inline;
      font-size: 48px;
    }
  }
`
const DetailsBlock = styled.div`
  max-width: 580px;

  @media (max-width: 1600px) {
    h4 {
      font-size: 24px;
    }
    h5 {
      font-size: 18px;
    }
  }
`

export default Info
