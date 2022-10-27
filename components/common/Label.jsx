import styled from 'styled-components'

const LabelStyles = `
	padding: 11px 15px;
	background: #EDF1F8;
	border-radius: 0;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #464f60;
	text-overflow: ellipsis;
	white-space: nowrap;

	@media (max-width: 800px) {
		font-size: 12px;
		line-height: 16px;
	}
`

export const Label = styled.div`
  ${LabelStyles}
  background: #EDF1F8;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  min-height: 40px;
  width: 100%;

  &:hover {
    background: #ccd1e0;
  }
`

export const InputLabel = styled.input`
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
