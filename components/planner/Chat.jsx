import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Box, Input, H5, Button, Spacer, Icon } from '../common'
import Message from './Message'
import MembersModal from './MembersModal'

const Chat = ({
  task,
  loadMessages,
  messages,
  onMemberChange,
  onNewMessage,
}) => {
  const ref = useRef()
  const [state, setState] = useState({
    page: 0,
    message: '',
  })
  const onMessageChange = (value) => setState({ ...state, message: value })
  const sendMessage = (e) => {
    e.preventDefault()
    onNewMessage(state.message)
    setState({ ...state, message: '' })
  }
  useEffect(() => {
    ref.scrollTop = '100%'
  }, [])

  if (!task)
    return (
      <Wrapper>
        <H5 align="center">Оберіть чат</H5>
      </Wrapper>
    )

  const members = task.users.map((u) => u.id)
  console.log(messages)

  return (
    <Wrapper>
      <Header align="center" justify="space-between">
        <H5>Тема: {task.name}</H5>
        <Box gap="16px" wrap="true">
          <MembersModal members={members} onMemberChange={onMemberChange} />
          <Button width="auto" type="primary">
            <Icon icon="task-done" />
            завдання виконано
          </Button>
        </Box>
      </Header>
      <Content ref={ref}>
        {messages?.map((msg, i) => (
          <Message key={i} message={msg} isOwner={true} />
        ))}
      </Content>
      <Spacer vertical size="16px" />
      <form onSubmit={sendMessage}>
        <Input
          placeholder="Додати завдання"
          onChange={onMessageChange}
          value={state.message}
          size="large"
          rightSlot={
            <InputSlot>
              <Icon icon="attachment" />
              <Icon icon="sobaka" />
              <Icon icon="emoji" />
              <Icon icon="text" />
              <InputSlotDelimiter />
              <Icon icon="send" onClick={sendMessage} />
            </InputSlot>
          }
        />
      </form>
      <ModileInputSlot>
        <Icon icon="attachment" />
        <Icon icon="sobaka" />
        <Icon icon="emoji" />
        <Icon icon="text" />
      </ModileInputSlot>
    </Wrapper>
  )
}

export default Chat

const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(197, 206, 231, 0.25);
  border-radius: 30px;
  flex-grow: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  max-height: 100%;

  @media (max-width: 768px) {
    padding: 30px;
  }
`

const Header = styled(Box)`
  padding-bottom: 30px;
  border-bottom: 1px solid #dce0ec;
  gap: 20px 20px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  gap: 20px;
  padding: 20px 0;
  max-height: calc(100vh - 364px);
  min-height: 300px;
`
const InputSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    & > * {
      display: none;
    }
    & > :last-child {
      display: block;
    }
  }
`
const ModileInputSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  display: none;
  padding: 0 16px;

  @media (max-width: 768px) {
    margin-top: 20px;
    display: flex;
  }
`

const InputSlotDelimiter = styled.div`
  height: 35px;
  width: 1px;
  background: #dce0ec;
`
