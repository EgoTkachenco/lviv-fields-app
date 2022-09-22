import { makeAutoObservable } from 'mobx'
import { PLANNER_API } from './help/api'

class Store {
  tasks = null
  isLoadingTasks = false

  activeTask = null

  messages = null
  isLoadMoreMessages = false
  isLoadingMessages = false

  constructor() {
    makeAutoObservable(this)
  }

  async createTask(name) {
    try {
      const task = await PLANNER_API.createTask(name)
      await this.loadTasksList()
      this.openTask(task.id)
      return true
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
    this.loadMessages(0)
  }

  async loadMessages(page) {
    if (!this.activeTask) return
    this.isLoadingMessages = true
    try {
      const messages = await PLANNER_API.getMessages(this.activeTask.id, page)
      this.messages = page === 0 ? messages : [...this.messages, ...messages]
    } catch (error) {
      console.log(error)
    }
    this.isLoadingMessages = false
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
      await PLANNER_API.sendMessage(this.activeTask.id, message)
      this.loadMessages(0)
    } catch (error) {
      console.log(error)
    }
  }
}

const store = new Store()

export default store
