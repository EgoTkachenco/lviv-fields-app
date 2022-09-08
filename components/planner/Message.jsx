import styled from 'styled-components'
import { Text, Box } from '../common'

const Message = ({ sender, isOwner, date, message }) => {
  const avatarText = sender.split(' ').map((text) => text[0].toUpperCase())
  return (
    <Container>
      <Avatar>{avatarText}</Avatar>

      <Content>
        <Box gap="6px">
          <Text weight="600">{sender}</Text>
          <Text>{date}</Text>
        </Box>
        <Text color="gray">{message}</Text>
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
