import styled from 'styled-components'
import { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import Input from './Input'

const Autocomplete = ({
  getVariants,
  renderVariant,
  inputComponent,
  buttonComponent,
  value,
  onChange,
  onNewVariant,
  getValue,
  newElement = true,
}) => {
  const [state, setState] = useState({
    value: getValue(value),
    variants: null,
  })
  const InputComponent = inputComponent
  const ButtonComponent = buttonComponent

  const fetchVariants = _.debounce((search) => {
    if (search.length < 3) {
      setState((state) => ({ ...state, variants: null }))
    } else {
      getVariants(search).then((res) => {
        setState((state) => ({ ...state, variants: res }))
      })
    }
  }, 100)

  useEffect(() => {
    debugger
    if (state.value === getValue(value)) return
    fetchVariants(state.value)
  }, [state.value])

  return (
    <Container>
      <Input
        value={state.value}
        onChange={(value) => setState({ ...state, value })}
      />
      <Menu show={state.variants}>
        {state.variants &&
          state.variants.map((variant) => (
            <Fragment key={variant.id}>{renderVariant(variant)}</Fragment>
          ))}
        {newElement && (
          <ButtonComponent onClick={() => onNewVariant(state.value)}>
            Додати до списку
          </ButtonComponent>
        )}
      </Menu>
    </Container>
  )
}

export default Autocomplete

const Container = styled.div`
  position: relative;
  display: flex;
  width: 300px;
`

const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
`
