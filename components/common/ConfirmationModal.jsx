import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import Box from './Box'
import { Text } from './Text'
import Spacer from './Spacer'

const ConfirmationModal = ({
  title,
  text,
  children,
  onConfirm,
  onCancel = () => {},
}) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <div onClick={() => setShow(true)}>{children}</div>
      <Modal title={title} show={show} close={() => setShow(false)}>
        {text && (
          <>
            <Text>{text}</Text>
            <Spacer vertical size="16px" />
          </>
        )}
        <Box gap="16px" align="center">
          <Button
            variant="outline"
            onClick={() => {
              setShow(false)
              onCancel()
            }}
          >
            Закрити
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShow(false)
              onConfirm()
            }}
          >
            Підтвердити
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ConfirmationModal
