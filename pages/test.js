import { useState } from 'react'
import { ConfirmationModal, Button, Autocomplete } from '../components/common'
import styled from 'styled-components'
import { VARIETIES_API } from '../store/help/api'

export default function Test() {
  const [state, setState] = useState(null)
  return (
    <Autocomplete
      getVariants={(search) => VARIETIES_API.getVarieties(search)}
      renderVariant={(variant) => <Label>{variant.name}</Label>}
      inputComponent={(props) => <LabelInput {...props} />}
      buttonComponent={(props) => <LabelButton {...props} />}
      value={state}
      onChange={(value) => setState(value)}
      onNewVariant={(name) => VARIETIES_API.createVariety(name)}
      getValue={(value) => value?.name || ''}
    />
  )
}
const LabelStyles = `
	width: 100%;
	padding: 11px 15px;
	background: #EDF1F8;
	border-radius: 0;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #464f60;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	@media (max-width: 800px) {
		font-size: 12px;
		line-height: 16px;
	}
`

const Label = styled.div`
  ${LabelStyles}
  background: '#EDF1F8';
`

const LabelButton = styled.button`
  ${LabelStyles}
  flex: 0 1 100%;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  outline: none;
  &:hover {
    background: #ccd1e0;
  }
`
const LabelInput = styled.input`
  ${LabelStyles}
  outline: none;
  border: 1px solid #edf1f8;
  font-weight: 400;
  &:read-only {
    cursor: default;
    border-color: transparent;
    background: #edf1f8;
  }
`
