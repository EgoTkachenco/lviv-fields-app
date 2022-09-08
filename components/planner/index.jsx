import { useState } from 'react'
import styled from 'styled-components'
import Chat from './Chat'

import { Button, Spacer, Modal, Input } from '../common'

const Planner = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <Wrapper>
      <Modal
        title="Додати завдання"
        close={() => setShowModal(false)}
        show={showModal}
      >
        <Input placeholder="Назва" />
        <Spacer vertical size="20px" />
        <Button type="primary">Додати</Button>
      </Modal>
      <List>
        <Button type="primary" onClick={() => setShowModal(true)}>
          додати нове завдання
        </Button>
        <Spacer />
        <Button type="grey">
          Продовжити термiн дії договору оренди №156543
        </Button>
        <Button type="white">Вирубка дiлянки саду №753564</Button>
        <Button type="white">Збiр врожаю на дiлянцi №226057</Button>
        <Button type="white">Впровадження системи поливу</Button>
      </List>
      <Chat />
    </Wrapper>
  )
}
export default Planner

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-grow: 1;
  max-width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 0;
  }
`

const List = styled.div`
  max-width: 550px;
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1200px) {
    max-width: unset;
    width: 100%;
    border-bottom: 1px solid #dce0ec;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
`
