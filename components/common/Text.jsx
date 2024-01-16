import styled from 'styled-components'

const COLORS = {
  grey: '#94A5D0',
  gray: '#848890',
  black: '#313536',
  white: '#FFFFFF',
  primary: '#407CFF',
}

const getColor = (props) =>
  props.color && COLORS.hasOwnProperty(props.color)
    ? COLORS[props.color]
    : COLORS.black

export const H1 = styled.h1`
  font-size: 86px;
  font-style: normal;
  line-height: 120%;
  color: ${(props) => getColor(props)};
  font-weight: ${(props) => props.weight || '500'};

  @media (max-width: 1200px) {
    font-size: 48px;
    line-height: 60px;
  }
  @media (max-width: 1024px) {
    font-size: 48px;
    line-height: 44px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
    line-height: 48px;
  }
`
export const H2 = styled.h2`
  font-size: 68px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  color: ${(props) => getColor(props)};
  font-weight: ${(props) => props.weight || '500'};
  text-align: ${(props) => props.align || 'initial'};

  @media (max-width: 1200px) {
    font-size: 40px;
  }
  @media (max-width: 1024px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
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
  font-size: 32px;
  line-height: 120%;
  font-weight: ${(props) => props.weight || '500'};
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
  font-style: normal;
  line-height: 145.5%;
  color: ${(props) => getColor(props)};
  font-weight: ${(props) => props.weight || '500'};
  text-align: ${(props) => props.align || 'initial'};
  /* opacity: 0.7; */
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
  font-size: 14px;
  line-height: normal;
  font-weight: ${(props) => props.weight || '400'};
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
