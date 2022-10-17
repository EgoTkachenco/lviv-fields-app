import styled from 'styled-components'
import { Button, Spacer, H5, H6 } from '../common'
import TaskModal from './TaskModal'
import ArchiveModal from './ArchiveModal'

const ChatList = ({
  activeTask,
  tasks,
  onNewTask,
  onTaskOpen,
  isFetch,
  isAdmin,
}) => {
  return (
    <List>
      <TaskModal onSubmit={onNewTask} />
      <Spacer />
      {isFetch && 'Loading'}
      {!isFetch && tasks && tasks.length && (
        <>
          <H6 align="left">Активні завдання:</H6>
          {tasks.map((task) => {
            const isActive = activeTask === task.id
            return (
              <Button
                key={task.id}
                variant={isActive ? 'grey' : 'white'}
                onClick={() => onTaskOpen(isActive ? null : task)}
                title={task.name}
              >
                <ButtonText>{task.name}</ButtonText>
              </Button>
            )
          })}
        </>
      )}

      <div style={{ flexGrow: 1 }} />

      <ArchiveModal onOpen={(task) => onTaskOpen(task)} />
    </List>
  )
}

export default ChatList

const List = styled.div`
  min-width: 350px;
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

const ButtonText = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
