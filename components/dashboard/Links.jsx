import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box, Icon } from '../common'
import { useRouter } from 'next/router'
import config from '../../config/config.json'

const Links = () => {
  const router = useRouter()

  return (
    <Wrapper wrap="true">
      <Link
        text="Карта Полів"
        redirect={() => router.push('/map')}
        icon="map"
        index={0}
      />
      <Link text="CRM система" link={config.crm_site} icon="crm" index={1} />
      <Link text="Сайт" link={config.site} icon="site" index={4} />
      <Link
        text="Корпоративна пошта"
        link={'mailto:' + config.email}
        icon="corporate-mail"
        index={2}
      />
      {/* <Link
        text="Камери відеоспостереження"
        link={links.video}
        icon="/icons/video.svg"
        index={1}
      />
      <Link
        text="Органайзер"
        redirect={() => router.push('/planner')}
        icon="/icons/organize.svg"
        index={2}
      /> */}

      {/* <LinkCardsWrapper gap="13px">
        <SocialBox gap="13px" direction="column">
          <Link
            link={telegram}
            icon="/icons/telegram.svg"
            size="small"
            index={6}
          />
          <Link link={viber} icon="/icons/viber.svg" size="small" index={7} />
        </SocialBox>
      </LinkCardsWrapper> */}
    </Wrapper>
  )
}

const Link = ({ text, link, icon, size, redirect, index }) => (
  <LinkCard
    size={size}
    href={link}
    onClick={(e) => {
      if (redirect) {
        e.preventDefault()
        redirect()
      }
    }}
    target="_blank"
    data-aos="fade-in"
    data-aos-anchor-placement="top-bottom"
    data-aos-delay={50 * index}
  >
    <div className="expand-icon" />
    <LinkIcon>
      <Icon icon="polygon" size="14px" />
      <Icon icon={icon} size="32px" />
    </LinkIcon>
    {text && <LinkText>{text}</LinkText>}
  </LinkCard>
)

export default Links

const Wrapper = styled(Box)`
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  @media (max-width: 1200px) {
    gap: 20px;
  }
`

const LinkText = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 500;
  line-height: 120%;
  color: #313536;
  transition: all 0.3s;

  @media (max-width: 1200px) {
    /* font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    min-height: unset;
    width: auto; */
  }
`
const LinkCard = styled.a`
  width: 45%;
  height: 160px;
  flex-grow: 1;
  border: 1px solid #000;
  background: #fff;
  transition: all 0.3s;
  border-radius: 18px;
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 24px;
  cursor: pointer;
  gap: 24px;

  .expand-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 18px;
    height: 18px;
    background: url('/icons/expand.svg');
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    background: url('/link-card.svg');
    width: 337px;
    height: 158px;
  }

  &:hover {
    background: #748c8e;
    text-decoration: none;

    .expand-icon {
      background: url('/icons/expand-white.svg');
    }

    &::before {
      background: url('/link-card-white.svg');
    }

    ${LinkText} {
      color: #ffffff;
    }
  }
  @media (max-width: 1600px) {
    height: auto;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`
const LinkIcon = styled.div`
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

  & > :first-child {
    position: absolute;
    top: 3px;
    left: 3px;
    svg {
      fill: #313536;
    }
  }
`
