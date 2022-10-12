import { makeAutoObservable } from 'mobx'
import { PLANNER_API, FILE_API } from './help/api'

class Store {
  tasks = null
  isLoadingTasks = false
  activeTask = null
  isLoadingMessages = false

  constructor() {
    makeAutoObservable(this)
  }

  async createTask(name) {
    try {
      const task = await PLANNER_API.createTask(name)
      await this.loadTasksList()
      this.openTask(task)
      return true
    } catch (error) {
      console.log(error)
    }
  }

  async finishTask() {
    try {
      if (!this.activeTask) return
      await PLANNER_API.finishTask(this.activeTask.id)
      await this.loadTasksList()
      this.activeTask = null
    } catch (error) {
      console.log(error)
    }
  }

  async loadTasksList() {
    this.isLoadingTasks = true
    try {
      this.tasks = await PLANNER_API.getTasks()
    } catch (error) {
      console.log(error)
    }
    this.isLoadingTasks = false
  }

  openTask(task) {
    this.activeTask = task
    this.loadMessages()
  }

  async loadMessages() {
    if (!this.activeTask) return
    this.isLoadingMessages = true
    try {
      this.isLoadingMessages = false
      return await PLANNER_API.getMessages(this.activeTask.id)
    } catch (error) {
      this.isLoadingMessages = false
      console.log(error)
    }
  }

  async handleMemberChange(user, mode) {
    let users = [...this.activeTask.users]
    try {
      if (mode) {
        await PLANNER_API.addMember(this.activeTask.id, user.id)
        users.push(user)
      } else {
        await PLANNER_API.deleteMember(this.activeTask.id, user.id)
        users = users.filter((u) => u.id !== user.id)
      }
      this.activeTask = { ...this.activeTask, users }
    } catch (error) {
      console.log(error)
    }
  }

  async sendMessage(message) {
    try {
      let data = {
        task: this.activeTask.id,
        type: 'text',
      }
      if (typeof message === 'object') {
        const formdata = new FormData()
        formdata.append('files', message)
        const file = await FILE_API.loadFile(formdata)
        data.file = file.id
        data.type = 'file'
      } else {
        data.content = message
      }
      return await PLANNER_API.sendMessage(data)
    } catch (error) {
      console.log(error)
    }
  }
}

const store = new Store()

export default store
