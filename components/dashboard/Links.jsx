import styled from 'styled-components'
import { Box } from '../common'
import { useRouter } from 'next/router'

const Links = () => {
  const router = useRouter()
  const email = process.env.NEXT_PUBLIC_EMAIL
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM
  const viber = process.env.NEXT_PUBLIC_VIBER
  const admin = process.env.NEXT_PUBLIC_ADMIN_URL
  const video = process.env.NEXT_PUBLIC_VIDEO_URL

  return (
    <Wrapper wrap="true">
      <Link
        text="карта полiв"
        redirect={() => router.push('/map')}
        icon="/icons/marker.svg"
      />
      <Link
        text="Камери відеоспостереження"
        link={video}
        icon="/icons/video.svg"
      />
      <Link
        text="Органайзер"
        redirect={() => router.push('/planner')}
        icon="/icons/organize.svg"
      />
      <Link text="crm система" link={admin} icon="/icons/crm.svg" />
      <Link text="сайт" link="/" icon="/icons/web.svg" />
      <LinkCardsWrapper gap="13px">
        <Link
          text="корпоративна пошта"
          link={'mailto:' + email}
          icon="/icons/mail.svg"
          size="medium"
        />
        <SocialBox gap="13px" direction="column">
          <Link link={telegram} icon="/icons/telegram.svg" size="small" />
          <Link link={viber} icon="/icons/viber.svg" size="small" />
        </SocialBox>
      </LinkCardsWrapper>
    </Wrapper>
  )
}

const Link = ({ text, link, icon, size, redirect }) => (
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
  >
    <LinkIcon src={icon} alt={text} />
    {text && <LinkText>{text}</LinkText>}
  </LinkCard>
)

export default Links

const Wrapper = styled(Box)`
  gap: 40px;
  @media (max-width: 1200px) {
    gap: 20px;
  }
`

const LinkCard = styled.a`
  height: ${(props) => (props.size === 'small' ? '121px' : '255px')};
  width: ${(props) =>
    props.size === 'small'
      ? '125px'
      : props.size === 'medium'
      ? 'calc(100% - 125px - 13px)'
      : 'calc((100% - 80px) / 3)'};
  background: radial-gradient(
    96.86% 382.9% at 97.29% 3.14%,
    #407cff 0%,
    #7073e6 50.52%,
    #b976fc 100%
  );
  transition: all 0.3s;
  border-radius: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  cursor: pointer;

  &:hover {
    background: radial-gradient(
      96.86% 382.9% at 97.29% 3.14%,
      #407cff 0%,
      #407cff 50.52%,
      #407cff 100%
    );
  }

  @media (max-width: 1200px) {
    width: ${(props) =>
      props.size === 'medium' ? '100%' : 'calc((100% - 20px) / 2)'};
    height: 46px;
    padding: 0;
    background: #407cff;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

const LinkText = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #ffffff;

  @media (max-width: 1200px) {
    position: relative;
    bottom: unset;
    left: unset;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
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
const LinkIcon = styled.img`
  width: 100px;
  height: 100px;

  @media (max-width: 1200px) {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
`
const SocialBox = styled(Box)`
  @media (max-width: 1200px) {
    display: none;
  }
`
