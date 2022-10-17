import { makeAutoObservable } from 'mobx'
import { REGISTRY_API } from './help/api'
import _ from 'lodash'

class Store {
  data = null
  isFetch = false
  search = ''
  editedRows = {}
  mode = 'read'
  deletedItems = []

  constructor() {
    makeAutoObservable(this)
    this.debouncedLoadData = _.debounce(this.loadData, 200)
  }

  updateSearch = (value) => {
    this.search = value
    this.debouncedLoadData()
  }

  async loadData() {
    this.isFetch = true
    try {
      this.data = await REGISTRY_API.getRegistry(this.search.toLowerCase())
    } catch (error) {
      console.log(error)
    }
    this.isFetch = false
  }

  async changeMode() {
    if (this.mode === 'read') {
      this.editedRows = {}
      this.deletedItems = []
      this.mode = 'write'
    } else {
      if (Object.keys(this.editedRows).length > 0) {
        this.isFetch = true
        await this.handleSave()
        this.editedRows = {}
      }

      this.mode = 'read'
    }
  }

  updateTableRow(index, key, value) {
    let newData = _.cloneDeep(this.data)
    if (key === 'delete') {
      const removed = newData[index]
      if (removed.id) this.deletedItems.push(removed.id)
      newData = newData.filter((_, i) => i !== index)
      this.editedRows.delete = true
    } else {
      newData[index][key] = value
      this.editedRows[index] = true
    }
    this.data = newData
  }

  createNew() {
    let newData = _.cloneDeep(this.data)
    newData.push({})
    this.editedRows[newData.length - 1] = true
    this.data = newData
  }

  handleSave = async () => {
    delete this.editedRows.delete
    const indexes = Object.keys(this.editedRows)

    for (let i = 0; i < this.deletedItems.length; i++) {
      const id = this.deletedItems[i]
      await REGISTRY_API.delete(id)
    }
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i]
      const isNew = !this.data[index].id
      try {
        if (isNew) {
          await REGISTRY_API.create(this.data[index])
        } else {
          await REGISTRY_API.update(this.data[index].id, this.data[index])
        }
      } catch (error) {
        console.log(error)
      }
    }
    this.loadData()
  }

  cancelSave() {
    this.mode = 'read'
    this.editedRows = {}
    this.loadData()
  }
}

const store = new Store()

export default store
