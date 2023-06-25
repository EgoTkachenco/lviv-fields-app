import { makeAutoObservable, computed } from 'mobx'
import { FIELD_TYPES } from '../help/constants'

export class RegistryTableStore {
  parent = null
  storeName = ''
  loadDataService
  loadDataCountService
  exportDataService
  format

  data = []
  limit = 0

  filter = {}

  editedRows = {}

  constructor(
    parent,
    storeName,
    load,
    loadCount,
    exportData,
    format,
    save,
    idKey = 'id',
    searchKey = '_q',
    formatFilter = (f) => f
  ) {
    makeAutoObservable(this, {
      getFilter: computed,
    })
    this.parent = parent

    this.storeName = storeName
    this.loadDataService = load
    this.loadDataCountService = loadCount
    this.exportDataService = exportData
    this.format = format
    this.save = save
    this.idKey = idKey
    this.searchKey = searchKey
    this.formatFilter = formatFilter
  }

  loadData = (page, size) => {
    let query = this.getFilterQuery()
    query.set('_limit', size)
    query.set('_start', (page - 1) * size)
    if (this.parent.search)
      query.set(this.searchKey, this.parent.search.toLowerCase())
    this.loadDataService(query.toString())
      .then((data) => {
        this.data = [...this.data, ...data.map(this.format)]
      })
      .catch((error) => console.log(error.message))
  }

  loadDataCount = () => {
    let query = this.getFilterQuery()
    if (this.parent.search)
      query.set(this.searchKey, this.parent.search.toLowerCase())
    this.loadDataCountService(query.toString())
      .then((limit) => {
        this.limit = limit
        this.data = []
        this.loadData(1, 20)
      })
      .catch((error) => console.log(error.message))
  }

  async exportData() {
    let query = this.getFilterQuery()
    if (this.parent.search)
      query.set(this.searchKey, this.parent.search.toLowerCase())
    try {
      this.parent.isFetch = true
      const res = await this.exportDataService(query.toString())
      if (res.path) {
        const link = document.createElement('a')
        link.href = process.env.NEXT_PUBLIC_ADMIN_URL + res.path
        link.download = this.storeName + '-export.xlsx'
        link.click()
      }
    } catch (error) {
      console.log(error.message)
    }
    this.parent.isFetch = false
  }

  onTableChange = (index, field, value) => {
    const data = _.cloneDeep(this.data)
    const id = data[index][this.idKey]

    if (!this.editedRows[id]) this.editedRows[id] = {}

    data[index][field] = value
    this.editedRows[id][field] = value

    this.data = data
  }

  onSave = async () => {
    const ids = Object.keys(this.editedRows)
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      try {
        await this.save(id, this.editedRows[id])
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  clearFilter() {
    this.editedRows = {}
    this.filter = {}
    this.parent.search = ''
  }

  onFilterChange(key, value) {
    if (value) {
      // if (key === 'type') {
      //   Object.keys(FIELD_TYPES).forEach((type) => {
      //     if (FIELD_TYPES[type] === value) this.filter[key] = type
      //   })
      // } else
      this.filter[key] = value
    } else {
      delete this.filter[key]
    }

    this.start = 0
  }

  getFilterQuery() {
    let query = new URLSearchParams()
    const filter = this.formatFilter(this.filter)
    Object.keys(filter).forEach((key) => {
      query.set(key, filter[key])
    })
    return query
  }

  get getFilter() {
    return { ...this.filter, search: this.parent.search }
  }
}
