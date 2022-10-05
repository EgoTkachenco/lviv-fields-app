import { useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Modal, Text, Caption, Spacer } from '../common'
import useArchive from './use-archive'

const ArchiveModal = ({ onOpen }) => {
  const [show, setShow] = useState(false)
  const [tasks, isFetch] = useArchive(show)

  return (
    <>
      <Modal title="Архів" close={() => setShow(false)} show={show}>
        {isFetch && 'Loading'}
        {!isFetch && tasks.length > 0 && (
          <List
            tasks={tasks}
            onOpen={(task) => {
              onOpen(task)
              setShow(false)
            }}
          />
        )}
        {!isFetch && tasks.length === 0 && <Text>Архів порожній</Text>}
      </Modal>
      <Button variant="success" onClick={() => setShow(true)}>
        Переглянути архів
      </Button>
    </>
  )
}

export default ArchiveModal

const List = ({ tasks, onOpen }) => {
  return (
    <Box direction="column" gap="8px" align="evenly">
      <ListHeader align="center">
        <Box width="100px">
          <Caption color="grey">Завершено</Caption>
        </Box>
        <Caption color="grey">Назва</Caption>
      </ListHeader>
      {tasks.map((task) => (
        <Box key={task.id} align="center">
          <Box width="100px">
            <Caption>{task.updated_at.slice(0, 10)}</Caption>
          </Box>
          <Text>{task.name}</Text>
          <Spacer size="auto" />
          <Button
            width="auto"
            size="small"
            variant="primary"
            onClick={() => onOpen(task)}
          >
            Переглянути
          </Button>
        </Box>
      ))}
    </Box>
  )
}
const ListHeader = styled(Box)`
  border-bottom: 1px solid rgba(148, 165, 208, 0.5);
  padding-bottom: 8px;
`
