import styled from 'styled-components'
import { Box, Input, H5, Button, Spacer, Icon, Modal } from '../common'
import Message from './Message'

const Chat = () => {
  const chat = {
    title: ' Вирубка дiлянки саду №753564',
    messages: [
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
        isOwner: true,
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
        isOwner: true,
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
        isOwner: true,
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
        isOwner: true,
      },
      {
        name: 'Редько Дмитро',
        date: '11:32',
        message: 'Додав(ла) завдання в “Вирубка дiлянки саду №753564”',
      },
    ],
  }
  return (
    <Wrapper>
      <Header align="center" justify="space-between">
        <H5>Тема: {chat.title}</H5>
        <Box gap="16px">
          <Button width="auto" type="primary-outline">
            <Icon icon="user-plus" />
            запросити до чату
          </Button>
          <Button width="auto" type="primary">
            <Icon icon="task-done" />
            завдання виконано
          </Button>
        </Box>
      </Header>
      <Content>
        {chat.messages.map((msg, i) => (
          <Message
            key={i}
            message={msg.message}
            sender={msg.name}
            date={msg.date}
            isOwner={msg.isOwner}
          />
        ))}
      </Content>
      <Spacer vertical size="16px" />
      <Input
        placeholder="Додати завдання"
        size="large"
        rightSlot={
          <InputSlot>
            <Icon icon="attachment" />
            <Icon icon="sobaka" />
            <Icon icon="emoji" />
            <Icon icon="text" />
            <InputSlotDelimiter />
            <Icon icon="send" />
          </InputSlot>
        }
      />
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
`

const Header = styled(Box)`
  padding-bottom: 30px;
  border-bottom: 1px solid #dce0ec;
  gap: 20px 20px;
  flex-wrap: wrap;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  gap: 20px;
  padding: 20px 0;
  max-height: calc(100vh - 364px);
`
const InputSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const InputSlotDelimiter = styled.div`
  height: 35px;
  width: 1px;
  background: #dce0ec;
`
