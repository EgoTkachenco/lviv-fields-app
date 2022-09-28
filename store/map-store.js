import { makeAutoObservable } from 'mobx'
import { MAP_API } from './help/api'

const initialFilter = {
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
class Store {
  constructor() {
    makeAutoObservable(this)
  }
  isFetch = false

  filter = { ...initialFilter }
  summary = null
  updateFilter(key, val) {
    let filter = { ...this.filter }
    switch (key) {
      case 'type':
      case 'category':
      case 'variety':
        filter[key] = handleArrAction(filter[key], val)
        break
      case 'search':
        filter.search = val
        break
      case 'year-start':
      case 'year-end':
      case 'term-start':
      case 'term-end':
        const [filterKey, filterKeyField] = key.split('-')
        filter[filterKey][filterKeyField] = val
        break
      default:
        return
    }
    this.filter = filter
  }

  async getSummary() {
    // fetch summary with filters
    let requestQueryFilter = new URLSearchParams()

    if (this.filter.type.length)
      requestQueryFilter.set('type_in', this.filter.type)
    if (this.filter.category.length)
      requestQueryFilter.set('category_in', this.filter.category)

    try {
      this.summary = await MAP_API.getSummary(requestQueryFilter.toString())
      // console.log(requestQueryFilter.toString())
      // console.log(summary)
    } catch (error) {
      console.log('Error: ', error)
    }
  }
  clearFilter() {
    this.filter = { ...initialFilter }
  }

  area = null
  field = null

  openArea(id) {
    this.area = id
  }

  async openField(id) {
    this.isFetch = true
    try {
      const fieldDetails = await MAP_API.getField(id)
      this.field = fieldDetails
    } catch (error) {
      console.log('Error: ', error)
      if (error.response.status === 404)
        this.field = {
          pathname: id,
          type: null,
          category: null,
          cadastr: '',
          size: '',
          location: '',
          owner_fullname: '',
          owner_birthdate: '',
          owner_phone: '',
          owner_mail: '',
          owner_address: '',
          owner_note: '',
          contract_name: '',
          contract_start: '',
          contract_due: '',
          contract_note: '',
          plantations: [],
        }
    }
    this.isFetch = false
  }
  closeField() {
    this.area = null
    this.field = null
  }

  mode = 'read'
  isEdited = false
  async changeMode() {
    if (this.mode === 'read') {
      this.mode = 'write'
    } else {
      if (this.isEdited) {
        this.isFetch = true
        try {
          this.field = await MAP_API.updateField(this.field.pathname, {
            ...this.field,
            area: this.area,
          })
        } catch (error) {
          console.log('Error: ', error)
        }
        this.isEdited = false
        this.isFetch = false
      }
      this.mode = 'read'
    }
  }
  updateFieldDetails(key, val) {
    if (!this.field.hasOwnProperty(key)) return

    switch (key) {
      default:
        this.field = { ...this.field, [key]: val }
        break
    }
    this.isEdited = true
  }
  saveField() {}
}

const store = new Store()

export default store

const handleArrAction = (arr, val) =>
  arr.includes(val) ? arr.filter((el) => el !== val) : [...arr, val]
