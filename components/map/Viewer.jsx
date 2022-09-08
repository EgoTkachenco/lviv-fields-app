import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Viewer({ children }) {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      const w = ref.current.offsetWidth
      const h = ref.current.offsetHeight
      setState({ ...state, width: w, height: h })
    }
  }, [ref])
  const [state, setState] = useState({
    isGrab: false,
    x_s: null,
    y_s: null,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scroll: 1,
    scroll_text: [],
  })
  const handleStartGrab = (e) => {
    setState({
      ...state,
      isGrab: true,
      x_s: e.pageX - state.x,
      y_s: e.pageY - state.y,
      x_s: e.pageX,
      y_s: e.pageY,
    })
  }
  const handleEndGrab = (e) => setState({ ...state, isGrab: false })
  const handleGrab = (e) => {
    if (state.isGrab) {
      const x = e.pageX - state.x_s
      const y = e.pageY - state.y_s
      setState({ ...state, isGrab: true, x, y })
    }
  }
  const handleScroll = (e) => {
    const isZoomIn = e.deltaY < 0
    if (isZoomIn && state.scroll < 5)
      setState({ ...state, scroll: state.scroll + 0.25 })

    if (!isZoomIn && state.scroll > 0.5)
      setState({ ...state, scroll: state.scroll - 0.25 })
  }
  return (
    <ViewerWrapper
      ref={ref}
      onMouseDown={handleStartGrab}
      onMouseMove={handleGrab}
      onMouseUp={handleEndGrab}
      // onWheel={handleScroll}
      state={state}
    >
      {state.scroll_text}
      <div
        style={{
          transition: 'all 50ms',
          position: 'absolute',

          left: state.scroll * state.x,
          top: state.scroll * state.y,

          minHeight: state.scroll * state.height + 'px',
          minWidth: state.scroll * state.width + 'px',
          maxHeight: state.scroll * state.height + 'px',
          maxWidth: state.scroll * state.width + 'px',
          height: state.scroll * state.height + 'px',
          width: state.scroll * state.width + 'px',
        }}
      >
        {children}
      </div>
      <Zoom>
        <ZoomBtn onClick={() => handleScroll({ deltaY: -1 })}>
          <span />
          <span />
        </ZoomBtn>
        <ZoomBtn onClick={() => handleScroll({ deltaY: 1 })}>
          <span />
        </ZoomBtn>
      </Zoom>
    </ViewerWrapper>
  )
}

const ViewerWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  max-width: ${(props) =>
    props.state.width ? props.state.width + 'px' : '100%'};
  max-height: ${(props) =>
    props.state.height ? props.state.height + 'px' : '100%'};
  min-width: ${(props) =>
    props.state.width ? props.state.width + 'px' : '100%'};
  min-height: ${(props) =>
    props.state.height ? props.state.height + 'px' : '100%'};

  @media (max-width: 1200px) {
    min-height: 500px;
    max-height: 500px;
  }

  @media (max-width: 800px) {
    min-height: 320px;
    max-height: 320px;
  }

  svg {
    height: 100%;
  }

  path {
    transition: all 0.3s;
  }
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
