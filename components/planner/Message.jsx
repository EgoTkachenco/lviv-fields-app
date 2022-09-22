import styled from 'styled-components'
import { Text, Box } from '../common'

const Message = ({ isOwner, message }) => {
  const avatarText = message.sender.username
    .split(' ')
    .map((text) => text[0].toUpperCase())
  return (
    <Container>
      <Avatar>{avatarText}</Avatar>

      <Content>
        <Box gap="6px">
          <Text weight="600">{message.sender.username}</Text>
          <Text>{message.create_at}</Text>
        </Box>
        <Text color="gray">{message.content}</Text>
      </Content>
    </Container>
  )
}

export default Message

const Container = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Avatar = styled.div`
  width: 48px;
  min-width: 48px;
  height: 48px;
  background: #9aacbc;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  border-radius: 50%;
`
