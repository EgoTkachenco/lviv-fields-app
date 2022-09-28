import styled from 'styled-components'
import { Button, Spacer } from '../common'
import TaskModal from './TaskModal'
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
      {isAdmin && <TaskModal onSubmit={onNewTask} />}

      <Spacer />
      {isFetch
        ? 'Loading'
        : tasks
        ? tasks.map((task) => {
            const isActive = activeTask === task.id
            return (
              <Button
                key={task.id}
                variant={isActive ? 'grey' : 'white'}
                onClick={() => onTaskOpen(isActive ? null : task)}
              >
                {task.name}
              </Button>
            )
          })
        : 'No tasks'}
    </List>
  )
}

export default ChatList

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
