import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import { usePinch } from '@use-gesture/react'
import _ from 'lodash'
import { useNoBodyScroll } from '../../../hooks'
import { Icon } from '../../common'

export default function Viewer({ children, small }) {
  const [focus, setFocus] = useState(false)
  useNoBodyScroll(focus)
  const [state, setState] = useState({
    width: 0,
    height: 0,
    scroll: 0,
    isNoZoomMode: true,
  })
  useEffect(() => {
    setInitialScroll()
  }, [children])
  const handlePinch = ({ movement }) => {
    handleScroll({ deltaY: movement[1] < 0 ? 1 : -1 })
  }
  const bind = usePinch(handlePinch)
  const handleScroll = (e) => {
    const isZoomIn = e.deltaY < 0
    let new_scroll = 0
    if (isZoomIn && state.scroll < 3) {
      const differ = state.scroll < 1 ? 1 : 0.25
      new_scroll = state.scroll + differ
    }

    if (!isZoomIn && state.scroll > 1) {
      new_scroll = state.scroll - 0.25
    } else if (!isZoomIn && state.scroll > 0 && state.isNoZoomMode) {
      new_scroll = state.scroll - 1
    } else if (!isZoomIn && state.scroll > 0 && !state.isNoZoomMode) {
      return
    }
    setState({ ...state, scroll: new_scroll })
  }
  const setInitialScroll = () => {
    if (!children) return
    const svg = children.ref?.current
    if (!svg) return
    const { width, height } = svg.getBoundingClientRect()
    if (width > height) {
      setState((state) => ({ ...state, scroll: 0, isNoZoomMode: true }))
    } else {
      setState((state) => ({ ...state, scroll: 1, isNoZoomMode: false }))
    }
  }

  return (
    <ScrollContainer
      nativeMobileScroll={false}
      className={`map-viewer-scroll-container ${small ? 'small' : ''}`}
    >
      <ViewerWrapper
        {...bind()}
        // onMouseEnter={() => setFocus(true)}
        // onMouseLeave={() => setFocus(false)}
        zoom={state.scroll}
        isCentered={!small && !state.scroll}
        // onWheel={handleScroll}
      >
        {children}
      </ViewerWrapper>
      <Zoom>
        <Icon icon="zoom-plus" onClick={() => handleScroll({ deltaY: -1 })} />
        <Icon icon="zoom-minus" onClick={() => handleScroll({ deltaY: 1 })} />
      </Zoom>
    </ScrollContainer>
  )
}

const ViewerWrapper = styled.div`
  height: ${(props) => (props.zoom ? props.zoom * 100 + '%' : '100%')};
  max-width: ${(props) => (props.zoom ? 'unset' : '100%')};
  width: ${(props) => (props.zoom ? 'auto' : '100%')};

  display: ${(props) => (props.isCentered ? 'flex' : 'block')};
  justify-content: center;
  align-items: center;

  svg {
    max-width: ${(props) => (props.zoom ? 'unset' : '100%')};
    max-height: ${(props) => (props.zoom ? 'unset' : '100%')};
    height: ${(props) => (props.zoom ? '100%' : '100%')};
    width: ${(props) => (props.zoom ? 'auto' : '100%')};
  }

  path {
    cursor: pointer;
    transition: all 0.3s;
  }

  max-width: 100%;
`

const Zoom = styled.div`
  position: absolute;
  bottom: 26px;
  right: 26px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;
  background: #ffffff;
  border-radius: 36px;
  border: 1px solid #000;

  & > * {
    max-width: 55px;
    min-width: 55px;
    max-height: 55px;
    min-height: 55px;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(1);
    }
  }

  @media (max-width: 1200px) {
    bottom: 16px;
    right: 16px;

    & > * {
      max-width: 32px;
      min-width: 32px;
      max-height: 32px;
      min-height: 32px;
    }
  }
`
