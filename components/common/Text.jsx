import styled from 'styled-components'

const COLORS = {
  grey: '#94A5D0',
  gray: '#A7BAD2',
  black: '#464F60',
  white: '#FFFFFF',
  primary: '#407CFF',
}

const getColor = (props) =>
  props.color && COLORS.hasOwnProperty(props.color)
    ? COLORS[props.color]
    : COLORS.black

export const H1 = styled.h1`
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -2px;
  color: ${(props) => getColor(props)};
  font-weight: ${(props) => props.weight || 'initial'};

  @media (max-width: 1200px) {
    font-size: 48px;
    line-height: 60px;
  }
  @media (max-width: 1024px) {
    font-size: 32px;
    line-height: 44px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -1px;
  }
`
export const H2 = styled.h2`
  font-size: 40px;
  line-height: 44px;
  letter-spacing: -1.5px;
  color: ${(props) => getColor(props)};
  font-weight: ${(props) => props.weight || 'initial'};
  text-align: ${(props) => props.align || 'initial'};

  /* @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -1px;
  } */
`

export const H3 = styled.h3`
  font-size: 36px;
  line-height: 43px;
  color: ${(props) => getColor(props)};
  font-weight: ${(props) => props.weight || 'initial'};
  text-align: ${(props) => props.align || 'initial'};

  @media (max-width: 1024px) {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -1px;
  }
`

export const H4 = styled.h4`
  font-size: 24px;
  line-height: 29px;
  font-weight: ${(props) => props.weight || '600'};
  color: ${(props) => getColor(props)};
  text-align: ${(props) => props.align || 'initial'};

  /* @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 28px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  } */
`

export const H5 = styled.h5`
  font-size: 22px;
  line-height: 26px;
  color: ${(props) => getColor(props)};
  font-weight: ${(props) => props.weight || '600'};
  text-align: ${(props) => props.align || 'initial'};

  /* @media (max-width: 1200px) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.8px;
  } */
`

export const H6 = styled.h6`
  font-size: 18px;
  line-height: 22px;
  font-weight: ${(props) => props.weight || 'initial'};
  color: ${(props) => getColor(props)};
  text-align: ${(props) => props.align || 'initial'};
`

export const Text = styled.p`
  font-size: 16px;
  line-height: 19px;
  font-weight: ${(props) => props.weight || 'initial'};
  color: ${(props) => getColor(props)};
  text-align: ${(props) => props.align || 'initial'};
`

export const Caption = styled.p`
  font-size: 13px;
  line-height: 16px;
  font-weight: ${(props) => props.weight || 'initial'};
  color: ${(props) => getColor(props)};
  text-align: ${(props) => props.align || 'initial'};
`
