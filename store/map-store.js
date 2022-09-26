import { makeAutoObservable } from 'mobx'

class Store {
  constructor() {
    makeAutoObservable(this)
  }
  mode = 'read'
  changeMode() {
    this.mode = this.mode === 'read' ? 'write' : 'read'
  }

  filter = {
    type: [],
    category: [],
    variety: [],
    year: {
      start: null,
      end: null,
    },
    term: {
      start: null,
      end: null,
    },
    search: '',
  }
  changeFilter(key, val) {
    switch (key) {
      case 'type':
      case 'category':
      case 'variety':
        this.filter[key] = handleArrAction(this.filter[key], val)
        break
      case 'search':
        this.filter.search = val
        break
      case 'year-start':
      case 'year-end':
      case 'term-start':
      case 'term-end':
        const [filterKey, filterKeyField] = key.split('-')
        this.filter[filterKey][filterKeyField] = val
        break
      default:
        return
    }
  }

  area = null
  field = null

  openArea(id) {
    this.area = id
  }
  openField(id) {
    this.field = id
  }
  closeField() {
    this.area = null
    this.field = null
  }
}

const store = new Store()

export default store

const handleArrAction = (arr, val) =>
  arr.includes(val) ? arr.filter((el) => el !== val) : [...arr, val]
