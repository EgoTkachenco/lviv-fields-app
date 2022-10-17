import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Chat from './Chat'

import { observer } from 'mobx-react-lite'
import { Planner as store, Auth as AuthStore } from '../../store'
import ChatList from './ChatList'

const Planner = observer(() => {
  useEffect(() => {
    store.loadTasksList()
  }, [])
  // const isAdmin = AuthStore.user?.role.name === 'Admin'

  return (
    <Wrapper>
      <ChatList
        tasks={store.tasks}
        onNewTask={(name) => store.createTask(name)}
        onTaskOpen={(task) => store.openTask(task)}
        activeTask={store.activeTask?.id}
        isFetch={store.isLoadingTasks}
      />
      <Chat
        task={store.activeTask}
        loadMessages={() => store.loadMessages()}
        onMemberChange={(user, mode) => store.handleMemberChange(user, mode)}
        onNewMessage={(message) => store.sendMessage(message)}
        onTaskClose={() => store.finishTask()}
        currentUser={AuthStore.user}
      />
    </Wrapper>
  )
})

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
