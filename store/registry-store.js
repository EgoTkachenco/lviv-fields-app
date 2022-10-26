import { makeAutoObservable, computed } from 'mobx'
import { REGISTRY_API } from './help/api'
import _ from 'lodash'

const initialFilter = {
  _limit: 10,
  _start: 0,
}
class Store {
  data = null
  isFetch = false
  search = ''
  editedRows = {}
  mode = 'read'
  deletedItems = []
  count = null

  filter = initialFilter

  constructor() {
    makeAutoObservable(this, { max: computed, page: computed })
    this.debouncedLoadData = _.debounce(() => {
      this.loadData()
      this.loadDataCount()
    }, 200)
  }

  init() {
    this.loadData()
    this.loadDataCount()
  }

  updateSearch = (value) => {
    this.search = value
    this.filter._start = 0
    this.debouncedLoadData()
  }

  onFilterChange(key, mode, value) {}

  async loadDataCount() {
    this.isFetch = true
    try {
      let query = new URLSearchParams()
      Object.keys(this.filter).forEach((key) => {
        query.set(key, this.filter[key])
      })
      if (this.search) query.set('search', this.search.toLowerCase())
      this.count = await REGISTRY_API.getRegistryCount(query.toString())
    } catch (error) {
      console.log(error)
    }
    this.isFetch = false
  }

  async loadData() {
    this.isFetch = true
    try {
      let query = new URLSearchParams()
      Object.keys(this.filter).forEach((key) => {
        query.set(key, this.filter[key])
      })
      if (this.search) query.set('search', this.search.toLowerCase())
      this.data = await REGISTRY_API.getRegistry(query.toString())
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

  changePage(page) {
    this.filter._start = (page - 1) * this.filter._limit
    this.loadData()
  }

  get page() {
    return Math.floor(this.filter._start / this.filter._limit) + 1
  }
  get max() {
    if (this.count) return Math.ceil(this.count / this.filter._limit)
    return 0
  }
}

const store = new Store()

export default store
