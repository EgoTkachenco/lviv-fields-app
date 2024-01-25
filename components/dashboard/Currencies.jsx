import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Box, Icon, Spacer } from '../common'

const Currencies = () => {
  const [state, setState] = useState(null)
  useEffect(() => {
    const promises = [
      axios.get(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      ),
      axios.get('https://www.blockchain.com/ru/ticker'),
    ]
    Promise.all(promises).then((res) => {
      const usd = res[0].data.find((el) => el.cc === 'USD').rate.toFixed(2)
      const eur = res[0].data.find((el) => el.cc === 'EUR').rate.toFixed(2)
      const btc = res[1].data['USD'].last.toFixed(2)
      setState({ usd, eur, btc })
    })
  }, [])

  return (
    <Wrapper gap="30px 40px">
      <CurrencyBlock
        name="Долар"
        currency="USD"
        value={state?.usd}
        icon="dollar"
        index={0}
      />

      <CurrencyBlock
        name="Євро"
        currency="EUR"
        value={state?.eur}
        icon="euro"
        index={1}
      />

      <CurrencyBlock
        name="Біткоїн"
        currency="btc"
        value={state?.btc}
        icon="bitcoin"
        index={2}
      />
    </Wrapper>
  )
}

export default Currencies

const Wrapper = styled(Box)`
  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
`

const CurrencyBlock = ({ name, currency, value, icon, index }) => (
  <CurrencyCard data-aos="fade-in" data-aos-delay={100 * index}>
    <CurrencyCardIcon>
      <Icon icon="polygon" size="14px" />
      <Icon icon={icon} size="32px" />
    </CurrencyCardIcon>

    <CurrencyCardName>{name}</CurrencyCardName>

    <CurrencyCardContent align="baseline" value={value}>
      <CurrencyCardValue>{value}</CurrencyCardValue>
      <CurrencyCardCurrency>{currency}</CurrencyCardCurrency>
    </CurrencyCardContent>
  </CurrencyCard>
)

const CurrencyCardContent = styled(Box)`
  padding: 24px;

  @media (max-width: 1600px) {
    padding: 16px 24px;
  }
`

const CurrencyCardIcon = styled.div`
  border-radius: 5px;
  border: 1px solid #313536;
  background: #ffffff;
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s;

  svg {
    transition: all 0.3s;
    fill: #313536;
  }

  & > :first-child {
    position: absolute;
    top: 3px;
    left: 3px;
  }

  @media (max-width: 1600px) {
    height: 64px;
    width: 64px;
  }
`

const CurrencyCard = styled.div`
  border-radius: 8px;
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  &:hover {
    color: #fff;
    svg {
      fill: #fff;
    }

    ${CurrencyCardIcon} {
      background: #313536;
    }
  }
`

const CurrencyCardName = styled.div`
  margin-left: 16px;
  font-weight: 500;
  font-size: 24px;
  line-height: normal;
  color: #313536;
  flex-grow: 1;

  @media (max-width: 600px) {
    font-size: 18px;
    line-height: 150%;
    margin: 0 auto 0 16px;
  }
`
const CurrencyCardValue = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: normal;
  color: #313536;
  margin-right: 5px;

  @media (max-width: 600px) {
    font-size: 24px;
    line-height: 150%;
  }
`
const CurrencyCardCurrency = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #748c8e;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 150%;
  }
`
