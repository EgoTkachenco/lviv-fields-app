import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  Box,
  Input,
  H5,
  Button,
  Spacer,
  Icon,
  ConfirmationModal,
  Text,
} from '../common'
import Message from './Message'
import MembersModal from './MembersModal'
import { FilePreview } from '../map/cards/elements/FilesList'

const CHAT_UPDATE_TIMEOUT = 1500

const Chat = ({
  task,
  loadMessages,
  onMemberChange,
  onNewMessage,
  onTaskClose,
  currentUser,
}) => {
  const ref = useRef()
  const [state, setState] = useState({
    timeout: null,
    message: '',
    messages: [],
  })

  const taskId = task?.id
  useEffect(() => {
    updateChat()
    return () => clearChatUpdate()
  }, [taskId])
  useEffect(() => {
    ref.scrollTop = '100%'
    return () => clearChatUpdate()
  }, [])

  const clearChatUpdate = () => state.timeout && clearTimeout(state.timeout)

  const updateChat = async () => {
    clearChatUpdate()
    const messages = await loadMessages()
    const timeout = setTimeout(() => updateChat(), CHAT_UPDATE_TIMEOUT)
    setState((state) => ({ ...state, timeout, messages }))
  }

  const onMessageChange = (value) =>
    setState((state) => ({ ...state, message: value }))

  const sendMessage = async (e) => {
    e.preventDefault()
    if (state.message.length === 0) return
    const newMessage = await onNewMessage(state.message)
    setState((state) => ({
      ...state,
      message: '',
      messages: [...state.messages, newMessage],
    }))
  }

  if (!task)
    return (
      <Wrapper>
        <H5 align="center">Оберіть чат</H5>
      </Wrapper>
    )

  const members = task?.users?.map((u) => u.id)

  const isActiveChat = task?.status === 'open'
  const isFile = typeof state.message === 'object'
  return (
    <Wrapper>
      <Header align="center" justify="space-between">
        <H5>Тема: {task.name}</H5>
        {isActiveChat && (
          <Box gap="16px" wrap="true">
            <MembersModal
              members={members}
              onMemberChange={onMemberChange}
              currentUser={currentUser}
            />
            <ConfirmationModal
              title="Завершити завдання"
              text="Ви впевнені шо хочете завершити задачу?"
              onConfirm={onTaskClose}
            >
              <Button width="auto" variant="primary">
                <Icon icon="task-done" />
                завдання виконано
              </Button>
            </ConfirmationModal>
          </Box>
        )}
      </Header>
      <Content ref={ref}>
        {state.messages?.map((msg, i) => (
          <Message key={i} message={msg} isOwner={true} />
        ))}
      </Content>
      <Spacer vertical size="16px" />
      {isActiveChat && (
        <form onSubmit={sendMessage}>
          {!isFile ? (
            <Input
              placeholder="Додати завдання"
              onChange={onMessageChange}
              value={state.message}
              size="large"
              rightSlot={
                <InputSlot>
                  <IconButton>
                    <Icon icon="attachment" />
                    <FileInput
                      type="file"
                      onChange={(e) => onMessageChange(e.target.files[0])}
                    />
                  </IconButton>
                  {/* <Icon icon="sobaka" /> */}
                  {/* <Icon icon="emoji" /> */}
                  {/* <Icon icon="text" /> */}
                  <InputSlotDelimiter />
                  <IconButton onClick={sendMessage}>
                    <Icon icon="send" />
                  </IconButton>
                </InputSlot>
              }
            />
          ) : (
            <MediaInput gap="8px" align="center">
              <FilePreview
                file={state.message}
                isRead={false}
                onDelete={() => onMessageChange('')}
              />
              <Text>{state.message.name}</Text>
              <Spacer size="auto" />
              <IconButton onClick={sendMessage}>
                <Icon icon="send" />
              </IconButton>
            </MediaInput>
          )}
        </form>
      )}
      <ModileInputSlot>
        <Icon icon="attachment" />
        {/* <Icon icon="sobaka" /> */}
        {/* <Icon icon="emoji" /> */}
        {/* <Icon icon="text" /> */}
      </ModileInputSlot>
    </Wrapper>
  )
}

export default Chat

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  top: 0;
  left: 0;
`

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

const IconButton = styled.button`
  background: none;
  border: none;
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
`

const MediaInput = styled(Box)`
  height: 60px;
  border: 1px solid #e9edf2;
  border-radius: 30px;
  padding: 0 20px;
  font-family: 'Lato';
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  transition: all 0.3s;
  background: #ffffff;
`
