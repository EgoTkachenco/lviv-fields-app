import { useEffect } from 'react'
import styled from 'styled-components'
import { H5, Icon, Spacer } from './index'

export default function Modal({ title, children, close, show }) {
  // useEffect(() => {
  //   if (process.browser) {
  //     window.document.body.style.maxHeight = show ? '100vh' : 'unset'
  //     window.document.body.style.overflow = show ? 'hidden' : 'unset'
  //   }
  // }, [show])
  if (!show) return null
  return (
    <ModalWrapper>
      <Card data-aos="fade-up">
        <CloseButton onClick={close}>
          <Icon icon="close" size="73px" />
        </CloseButton>
        <H5 weight="500">{title}</H5>
        <Spacer vertical size="24px" />
        <CardBody>{children}</CardBody>
      </Card>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgb(116, 140, 142, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`

const Card = styled.div`
  position: relative;
  min-width: 550px;
  max-width: 950px;
  max-height: calc(100vh - 64px);
  overflow: visible;
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(197, 206, 231, 0.2);
  border-radius: 30px;
  padding: 32px 40px;

  @media (max-width: 1280pxg) {
    width: 560px;
  }
  @media (max-width: 768px) {
    max-height: calc(100vh - 16px);
    width: 100%;
    min-width: unset;
    max-width: unset;
  }
`

const CardBody = styled.div`
  /* padding: 24px 48px;

  @media (max-width: 768px) {
    padding: 24px;
  } */
`

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  border: none;
  background: none;
  cursor: pointer;
  width: 73px;
  height: 73px;
  /* background: #fff; */
  /* border: 2px solid #748c8e; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(50%, -50%);
`
