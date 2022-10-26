import { useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Modal, Text, Caption, Spacer } from '../common'

const FilterModal = ({ onOpen }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Modal title="Фільтри" close={() => setShow(false)} show={show}>
        іоарфліоарлдфіорадол
      </Modal>
      <Button variant="success" onClick={() => setShow(true)}>
        Фільтри
      </Button>
    </>
  )
}

export default FilterModal
