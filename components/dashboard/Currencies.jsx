import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Box, Spacer } from '../common'

const Currencies = ({ usd, eur, bitcoin }) => {
  const [state, setState] = useState({ usd: '', eur: '', btc: '' })
  useEffect(() => {
    const promises = [
      axios.get(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      ),
      axios.get('https://www.blockchain.com/ru/ticker'),
    ]
    Promise.all(promises).then((res) => {
      debugger
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
        value={state.usd}
        icon="/icons/dollar.svg"
      />

      <CurrencyBlock
        name="Євро"
        currency="EUR"
        value={state.eur}
        icon="/icons/euro.svg"
      />

      <CurrencyBlock
        name="Біткоїн"
        currency="btc"
        value={state.btc}
        icon="/icons/bitcoin.svg"
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

const CurrencyBlock = ({ name, currency, value, icon }) => (
  <CurrencyCard>
    <CurrencyCardIcon>
      <CurrencyCardImage src={icon} alt={name} />
    </CurrencyCardIcon>
    <CurrencyCardName>{name}</CurrencyCardName>
    <Box align="baseline">
      <CurrencyCardValue>{value}</CurrencyCardValue>
      <CurrencyCardCurrency>{currency}</CurrencyCardCurrency>
    </Box>
  </CurrencyCard>
)

const CurrencyCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(197, 206, 231, 0.25);
  border-radius: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 89px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 14px;
    right: -20px;
    background: url('/icons/back.svg');
    width: 210px;
    height: 100%;
    object-fit: fill;
    z-index: 0;
  }
`
const CurrencyCardImage = styled.img`
  width: 48px;
  height: 48px;
`
const CurrencyCardIcon = styled.div`
  background: radial-gradient(
    67.22% 67.22% at 87.17% 17.38%,
    #e69ef7 0%,
    #44c3f6 52.6%,
    #776aeb 100%
  );
  opacity: 0.8;
  border-radius: 30px 0px 0px 30px;
  height: 89px;
  width: 89px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CurrencyCardName = styled.div`
  margin: 0 auto 0 32px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #464f60;
  position: relative;

  @media (max-width: 600px) {
    font-size: 18px;
    line-height: 150%;
    margin: 0 auto 0 16px;
  }
`
const CurrencyCardValue = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #464f60;
  margin-right: 10px;
  position: relative;
  margin-left: 16px;

  @media (max-width: 600px) {
    font-size: 24px;
    margin-left: 12px;
    line-height: 150%;
  }
`
const CurrencyCardCurrency = styled.div`
  margin-right: 40px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #94a5d0;
  text-transform: uppercase;
  position: relative;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 150%;
    margin-right: 16px;
  }
`
