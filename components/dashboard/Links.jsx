import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box } from '../common'
import { useRouter } from 'next/router'

const Links = () => {
  // get links from public folder
  const [links, setLinks] = useState({
    email: '',
    telegram: '',
    viber: '',
    video: '',
    site: '',
  })
  useEffect(() => {
    fetch('/links.json')
      .then((res) => res.json())
      .then((res) => setLinks({ ...links, ...res }))
  }, [])

  const router = useRouter()
  const admin = process.env.NEXT_PUBLIC_ADMIN_URL

  return (
    <Wrapper wrap="true">
      <Link
        text="карта полiв"
        redirect={() => router.push('/map')}
        icon="/icons/marker.svg"
        index={0}
      />
      <Link
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
      />
      <Link text="crm система" link={admin} icon="/icons/crm.svg" index={3} />
      <Link text="сайт" link={links.site} icon="/icons/web.svg" index={4} />
      <Link
        text="корпоративна пошта"
        link={'mailto:' + links.email}
        icon="/icons/mail.svg"
        index={5}
      />
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
    <LinkIcon src={icon} alt={text} />
    {text && <LinkText>{text}</LinkText>}
  </LinkCard>
)

export default Links

const Wrapper = styled(Box)`
  justify-content: space-between;
  gap: 30px;
  @media (max-width: 1200px) {
    gap: 20px;
  }
`

const LinkCard = styled.a`
  width: calc((100% - 30px * 5) / 6);
  /* height: ${(props) => (props.size === 'small' ? '121px' : '285px')}; */
  /* width: ${(props) =>
    props.size === 'small'
      ? '125px'
      : props.size === 'medium'
      ? 'calc(100% - 125px - 13px)'
      : 'calc((100% - 30px * 5) / 6)'}; */
  background: #407cff;
  transition: all 0.3s;
  border-radius: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  cursor: pointer;
  gap: 20px 20px;

  &:hover {
    background: rgba(64, 124, 255, 0.8);
  }

  @media (max-width: 1200px) {
    width: calc((100% - 30px * 2) / 3);
  }

  @media (max-width: 900px) {
    flex-direction: row;
    gap: 0;
    width: 100%;
    height: 46px;
    padding: 0;
    background: #407cff;
  }
`

const LinkText = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  width: 100%;
  min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1700px) {
    font-size: 14px;
    line-height: 16px;
    min-height: 28px;
  }

  @media (max-width: 1200px) {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    min-height: unset;
    width: auto;
  }
`

const LinkIcon = styled.img`
  height: 100px;

  @media (max-width: 1700px) {
    height: 80px;
  }

  @media (max-width: 900px) {
    height: 16px;
    margin-right: 6px;
  }
`

const LinkCardsWrapper = styled(Box)`
  width: calc((100% - 80px) / 3);

  @media (max-width: 1200px) {
    /* width: 100%; */
    width: calc((100% - 20px) / 2);
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

const SocialBox = styled(Box)`
  @media (max-width: 1200px) {
    display: none;
  }
`
