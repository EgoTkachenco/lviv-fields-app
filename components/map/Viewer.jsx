import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import { usePinch } from '@use-gesture/react'
import _ from 'lodash'
import { useNoBodyScroll } from '../../hooks'
export default function Viewer({ children, small }) {
  const [focus, setFocus] = useState(false)
  useNoBodyScroll(focus)
  const [state, setState] = useState({
    width: 0,
    height: 0,
    scroll: 1,
  })
  const handlePinch = ({ movement }) => {
    handleScroll({ deltaY: movement[1] < 0 ? 1 : -1 })
  }
  const bind = usePinch(handlePinch)
  const handleScroll = (e) => {
    const isZoomIn = e.deltaY < 0
    if (isZoomIn && state.scroll < 3)
      setState({ ...state, scroll: state.scroll + 0.25 })

    if (!isZoomIn && state.scroll > 1)
      setState({ ...state, scroll: state.scroll - 0.25 })
  }

  return (
    <ScrollContainer
      nativeMobileScroll={false}
      className={`map-viewer-scroll-container ${small ? 'small' : ''}`}
    >
      <ViewerWrapper
        {...bind()}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        height={state.scroll * 100 + '%'}
        onWheel={handleScroll}
      >
        {children}
      </ViewerWrapper>
      <Zoom>
        <ZoomBtn onClick={() => handleScroll({ deltaY: -1 })}>
          <span />
          <span />
        </ZoomBtn>
        <ZoomBtn onClick={() => handleScroll({ deltaY: 1 })}>
          <span />
        </ZoomBtn>
      </Zoom>
    </ScrollContainer>
  )
}

const ViewerWrapper = styled.div`
  height: ${(props) => props.height};
  /* width: ${(props) => props.width}; */

  svg {
    height: 100%;
  }

  path {
    cursor: pointer;
    transition: all 0.3s;
  }

  max-width: 100%;
`

const Zoom = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ZoomBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  background: #407cff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    display: block;
    background: #ffffff;
    width: 18px;
    height: 2px;
    position: absolute;
  }

  &:first-child {
    border-radius: 30px 30px 0px 0px;
    & span:first-child {
      transform: rotate(90deg);
    }
  }
  &:last-child {
    border-radius: 0px 0px 30px 30px;
  }
`
