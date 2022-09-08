import React, { useRef } from 'react'
import { useMapFieldsHandlers } from './utils'

import Field1 from './fields/Field1'
import Field2 from './fields/Field2'
import Field3 from './fields/Field3'
import Field4 from './fields/Field4'
import Field5 from './fields/Field5'
import Field6 from './fields/Field6'
import Field7 from './fields/Field7'
import Field8 from './fields/Field8'
import Field9 from './fields/Field9'
import Field10 from './fields/Field10'
import Field11 from './fields/Field11'
import Field12 from './fields/Field12'

import { Spacer, H5, Button } from '../common'
import Viewer from './Viewer'
import styled from 'styled-components'

export default function AreaMap({ id, onOpen, field, onClose }) {
  const ref = useRef()
  useMapFieldsHandlers(ref, (e) => onOpen(e.currentTarget.id), field)
  const renderField = () => {
    switch (id) {
      case '1':
        return <Field1 ref={ref} />
      case '2':
        return <Field2 ref={ref} />
      case '3':
        return <Field3 ref={ref} />
      case '4':
        return <Field4 ref={ref} />
      case '5':
        return <Field5 ref={ref} />
      case '6':
        return <Field6 ref={ref} />
      case '7':
        return <Field7 ref={ref} />
      case '8':
        return <Field8 ref={ref} />
      case '9':
        return <Field9 ref={ref} />
      case '10':
        return <Field10 ref={ref} />
      case '11':
        return <Field11 ref={ref} />
      case '12':
        return <Field12 ref={ref} />
      default:
        return <NoField onClose={onClose} />
    }
  }

  return <Viewer>{renderField()}</Viewer>
}

const NoField = ({ onClose }) => (
  <NoFieldWrapper>
    <H5>Поле не знайдено</H5>
    <Spacer vertical size="16px" />
    <Button type="primary" onClick={onClose}>
      Повернутися
    </Button>
  </NoFieldWrapper>
)

const NoFieldWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
