import { makeAutoObservable } from 'mobx'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  area = null
  field = null
  details = null

  openArea(id) {
    this.area = id
  }
  openField(id) {
    this.field = id
    this.details = {}
  }
  closeField() {
    this.area = null
    this.field = null
  }
}

const store = new Store()

export default store
