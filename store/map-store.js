import { makeAutoObservable } from 'mobx'
import { FILE_API, MAP_API } from './help/api'
import _ from 'lodash'

const initialFilter = {
  type: [],
  category: [],
  varieties: [],
  year: {
    start: '',
    end: '',
  },
  term: {
    start: '',
    end: '',
  },
}
class Store {
  isFetch = false
  filter = {}
  summary = null
  area = null
  field = null

  constructor() {
    makeAutoObservable(this)
    this.clearFilter(false)
  }

  updateFilter(key, val) {
    let filter = { ...this.filter }
    switch (key) {
      case 'type':
      case 'category':
      case 'varieties':
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
    if (this.filter.varieties.length)
      requestQueryFilter.set('varieties_in', this.filter.varieties)
    if (this.filter.year.start)
      requestQueryFilter.set('plantation_year_gte', this.filter.year.start)
    if (this.filter.year.end)
      requestQueryFilter.set('plantation_year_lte', this.filter.year.end)
    if (this.filter.term.start)
      requestQueryFilter.set('contract_start_gte', this.filter.term.start)
    if (this.filter.term.end)
      requestQueryFilter.set('contract_due_lte', this.filter.term.end)

    if (this.area) requestQueryFilter.set('area_in', this.area)
    try {
      this.summary = await MAP_API.getSummary(requestQueryFilter.toString())
      // console.log(requestQueryFilter.toString())
      // console.log(summary)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  clearFilter(isFetch = true) {
    this.filter = _.cloneDeep(initialFilter)
    if (isFetch) this.getSummary()
  }

  openArea(id) {
    this.area = id
    this.getSummary()
  }

  async openField(id) {
    if (this.mode === 'write') {
      this.isEdited = false
      this.deletedFiles = []
    }

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
          owner_avatar: null,
          owner_fullname: '',
          owner_birthdate: '',
          owner_phone: '',
          owner_mail: '',
          owner_address: '',
          owner_note: '',
          owner_files: [],
          contract_name: '',
          contract_start: '',
          contract_due: '',
          contract_note: '',
          contract_files: [],
          plantations: [],
        }
    }
    this.isFetch = false
  }

  cancelSave() {
    this.field && this.openField(this.field.pathname)
    this.isEdited = false
    this.deletedFiles = []
    this.mode = 'read'
  }

  closeField() {
    if (this.mode === 'write') return this.changeMode()
    this.area = null
    this.field = null
    this.getSummary()
  }

  mode = 'read'
  isEdited = false
  deletedFiles = []
  deletedPlantations = []

  async changeMode() {
    if (this.mode === 'read') {
      this.mode = 'write'
    } else {
      if (this.isEdited) {
        this.isFetch = true
        try {
          await this.saveField()
          this.isEdited = false
          this.deletedFiles = []
          this.deletedPlantations = []
        } catch (error) {
          console.log('Error: ', error)
        }
        this.isFetch = false
      }
      this.mode = 'read'
    }
  }
  updateFieldDetails(key, val) {
    const field = _.cloneDeep(this.field)

    switch (key) {
      case 'new-plantation':
        field.plantations.push({ size: '', variety: null })
        break
      case 'delete-plantation':
        const deleted = field.plantations[val]
        if (deleted.id) this.deletedPlantations.push(deleted.id)
        field.plantations = field.plantations.filter((_, i) => i !== val)
        break
      case 'plantation-variety':
        field.plantations[val.index].variety = val.value
        break
      case 'plantation-size':
        field.plantations[val.index].size = val.value
        break
      case 'plantation-year':
        field.plantations[val.index].year = val.value
        break
      case 'owner-file-new':
        field.owner_files.push(val)
        break
      case 'owner-file-delete':
        const deletedOwnerFile = field.owner_files.splice(val, 1)
        if (deletedOwnerFile.id) this.deletedFiles.push(deletedOwnerFile.id)
        break
      case 'contract-file-new':
        field.contract_files.push(val)
        break
      case 'contract-file-delete':
        const deletedContractFile = field.contract_files.splice(val, 1)
        if (deletedContractFile.id)
          this.deletedFiles.push(deletedContractFile.id)
        break
      case 'owner-avatar':
        if (!val) {
          if (field.owner_avatar.id)
            this.deletedFiles.push(field.owner_avatar.id)
        }
        field.owner_avatar = val
        break

      default:
        if (!this.field.hasOwnProperty(key)) return
        field[key] = val
        break
    }
    this.field = field
    this.isEdited = true
  }
  async saveField() {
    let field = _.cloneDeep(this.field)
    // 1 save files
    // 2 handle plantations changes
    // 3 save field data with files and plantations

    const deleted_files = this.deletedFiles
    const loadFiles = async (files) => {
      const result = []
      for (let i = 0; i < files.length; i++) {
        let data = new FormData()
        data.append('files', files[i])
        const file = await FILE_API.loadFile(data)
        result.push(file)
      }
      return result
    }
    let new_owner_files = []
    let new_contract_files = []
    let plantations = []
    try {
      // create files
      new_owner_files = field?.owner_files.filter((file) => !file.id)
      if (new_owner_files.length > 0)
        new_owner_files = await loadFiles(new_owner_files)
      new_contract_files = field?.contract_files.filter((file) => !file.id)
      if (new_contract_files.length > 0)
        new_contract_files = await loadFiles(new_contract_files)

      if (field.owner_avatar && !field.owner_avatar.id) {
        let data = new FormData()
        data.append('files', field.owner_avatar)
        field.owner_avatar = await FILE_API.loadFile(data)
      }
      // remove files
      for (let i = 0; i < deleted_files.length; i++) {
        await FILE_API.removeFile(deleted_files[i])
      }

      // handle plantations change
      for (let i = 0; i < field.plantations.length; i++) {
        let plantation = field.plantations[i]
        if (plantation.id) {
          plantation = await MAP_API.updatePlantation(
            plantation.id,
            plantation.variety ? plantation.variety.id : null,
            plantation.size || null,
            plantation.year
          )
        } else {
          plantation = await MAP_API.createPlantation(
            plantation.variety ? plantation.variety.id : null,
            plantation.size || null,
            plantation.year
          )
        }
        plantations.push(plantation.id)
      }
      // remove plantations
      for (let i = 0; i < this.deletedPlantations.length; i++) {
        const id = this.deletedPlantations[i]
        await MAP_API.deletePlantation(id)
      }

      const fieldCommonData = _.omit(field, [
        'owner_files',
        'contract_files',
        'created_at',
        'id',
        'plantations',
        'published_at',
        'updated_at',
      ])
      fieldCommonData.owner_avatar = field.owner_avatar
        ? field.owner_avatar.id
        : null
      fieldCommonData.owner_files = [
        ...field.owner_files.filter((file) => file.id),
        ...new_owner_files,
      ].map((file) => file.id)

      fieldCommonData.contract_files = [
        ...field.contract_files.filter((file) => file.id),
        ...new_contract_files,
      ].map((file) => file.id)
      fieldCommonData.plantations = plantations

      this.field = await MAP_API.updateField(this.field.pathname, {
        ...fieldCommonData,
        area: this.area,
      })
      console.log(fieldCommonData)
    } catch (error) {
      console.log('error', error)
    }
  }
  async reset() {
    this.clearFilter()
    this.closeField()
  }
}

const store = new Store()

export default store

const handleArrAction = (arr, val) =>
  arr.includes(val) ? arr.filter((el) => el !== val) : [...arr, val]
