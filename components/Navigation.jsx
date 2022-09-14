import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Spacer, Box, Icon } from './common'
import { useState } from 'react'
import { useNoBodyScroll } from '../hooks'

const Navigation = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const links = [
    { name: 'Карта', path: '/map' },
    { name: 'Реєстр орендодавців', path: '/registry' },
    { name: 'Планер', path: '/planner' },
  ]
  useNoBodyScroll(open)
  return (
    <Wrapper>
      <Link href="/">
        <Box align="center">
          <Logo src="/logo.svg" alt="logo" />
          <LogoText>Львівский сад</LogoText>
        </Box>
      </Link>
      <Spacer size="auto" />
      <Links gap="60px" open={open} onClick={() => setOpen(false)}>
        <LinksCloseButton onClick={() => setOpen(false)}>
          <Icon icon="close" size="24px" />
        </LinksCloseButton>
        {links.map((link, i) => (
          <Link href={link.path} key={i}>
            <NavLink active={link.path === router.pathname}>
              {link.name}
            </NavLink>
          </Link>
        ))}
      </Links>
      <Spacer size="60px" />
      <MenuButton onClick={() => router.push('/')}>
        <Icon icon="menu" size="21px" />
      </MenuButton>
      <MobileMenuButton onClick={() => setOpen(true)}>
        <Icon icon="menu" size="21px" />
      </MobileMenuButton>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 80px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 20px 30px rgba(197, 206, 231, 0.25);
`

const Logo = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 10px;
  cursor: pointer;
`

const LogoText = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-transform: uppercase;
  color: #464f60;
  cursor: pointer;
`

const Links = styled(Box)`
  @media (max-width: 800px) {
    display: ${(props) => (props.open ? 'flex' : 'none')};
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #2e3548;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }
`

const LinksCloseButton = styled.button`
  position: absolute;
  display: none;
  background: none;
  border: none;
  padding: 0;
  top: 30px;
  right: 30px;
  cursor: pointer;

  @media (max-width: 800px) {
    display: block;
  }
`

const MenuButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  @media (max-width: 800px) {
    display: none;
  }
`

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  display: none;

  @media (max-width: 800px) {
    display: block;
  }
`

const NavLink = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #464f60;
  cursor: pointer;
  position: relative;
  &::before {
    content: '';
    opacity: ${(props) => (props.active ? 1 : 0)};
    position: absolute;
    top: -31px;
    width: 100%;
    background: #94a5d0;
    border-radius: 0px 0px 30px 30px;
    height: 4px;
  }

  @media (max-width: 800px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
  }
`

export default Navigation
