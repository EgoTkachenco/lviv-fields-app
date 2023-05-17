import { makeAutoObservable } from 'mobx'
import { FILE_API, MAP_API } from './help/api'
import _ from 'lodash'

const initialFilter = {
  type: [],
  category: [],
  cadastrs: [],
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
  areas = null
  areaLabel = null
  area = null
  field = null
  openFieldFlag = false

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
      case 'cadastrs':
        this.clearFilter(false)
        filter[key] = val
        if (val.length === 1) this.openFieldFlag = true
        break
      default:
        return
    }
    if (!['area', 'cadastrs'].includes(key)) filter.cadastrs = []
    this.filter = filter
  }

  async getSummary() {
    // fetch summary with filters
    this.isFetch = true
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

    if (this.filter.cadastrs.length)
      requestQueryFilter.set('cadastr_in', this.filter.cadastrs)

    if (this.area) requestQueryFilter.set('area_in', this.area)
    try {
      const isOpenField = this.filter.cadastrs.length === 1 && !this.summary
      this.summary = await MAP_API.getSummary(requestQueryFilter.toString())
      if (!this.areas) await this.loadAreas()
      if (this.openFieldFlag) this.openField(this.summary.fields[0], true)
      this.openFieldFlag = false
    } catch (error) {
      console.log('Error: ', error)
    }
    this.isFetch = false
  }

  clearFilter(isFetch = true) {
    this.filter = _.cloneDeep(initialFilter)
    if (isFetch) this.getSummary()
  }

  openArea(id) {
    if (!id) {
      this.areaLabel = null
      return
    }
    if (this.areaLabel === id) {
      this.area = id
      this.getSummary()
    } else {
      this.areaLabel = id
    }
  }

  async openField(id, openArea = false) {
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
          // owner_avatar: null,
          // owner_fullname: '',
          // owner_birthdate: '',
          // owner_phone: '',
          // owner_mail: '',
          // owner_address: '',
          // owner_note: '',
          // owner_files: [],
          contract_name: '',
          contract_start: '',
          contract_due: '',
          contract_note: '',
          // contract_files: [],
          files: [],
          owners: [],
          plantations: [],
        }
    }
    this.isFetch = false

    if (openArea) {
      const area = this.areas.find((area) => area.id === this.field.area)
      this.areaLabel = area.name
      this.area = area.path
    }
  }

  cancelSave() {
    this.field && this.openField(this.field.pathname)
    this.isEdited = false
    this.deletedFiles = []
    this.mode = 'read'
  }

  closeField() {
    if (this.mode === 'write') return this.changeMode()
    this.areaLabel = null
    this.area = null
    this.field = null
    this.getSummary()
  }

  mode = 'read'
  isEdited = false
  deletedFiles = []
  deletedPlantations = []
  deletedOwners = []

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
          this.deletedOwners = []
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
      case 'file-new':
        field.files.push(val)
        break
      case 'file-delete':
        const deletedFile = field.files.splice(val, 1)
        if (deletedFile[0]?.id) this.deletedFiles.push(deletedFile[0].id)
        break
      case 'owners-new':
        field.owners.push(val)
        break
      case 'owners-update':
        const index = val.index
        if (field.owners[index]) field.owners[index] = val
        break
      case 'owners-delete':
        const deletedOwner = field.owners.splice(val, 1)
        if (deletedOwner[0]?.id) this.deletedOwners.push(deletedOwner[0].id)
        break
      // case 'owner-file-new':
      //   field.owner_files.push(val)
      //   break
      // case 'owner-file-delete':
      //   const deletedOwnerFile = field.owner_files.splice(val, 1)
      //   if (deletedOwnerFile.id) this.deletedFiles.push(deletedOwnerFile.id)
      //   break
      // case 'contract-file-new':
      //   field.contract_files.push(val)
      //   break
      // case 'contract-file-delete':
      //   const deletedContractFile = field.contract_files.splice(val, 1)
      //   if (deletedContractFile.id)
      //     this.deletedFiles.push(deletedContractFile.id)
      //   break
      // case 'owner-avatar':
      //   if (!val) {
      //     if (field.owner_avatar.id)
      //       this.deletedFiles.push(field.owner_avatar.id)
      //   }
      //   field.owner_avatar = val
      //   break

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
    let new_files = []
    let plantations = []
    let owners = []
    try {
      // create files
      new_files = field?.files.filter((file) => !file.id)
      if (new_files.length > 0) new_files = await loadFiles(new_files)

      // if (field.owner_avatar && !field.owner_avatar.id) {
      //   let data = new FormData()
      //   data.append('files', field.owner_avatar)
      //   field.owner_avatar = await FILE_API.loadFile(data)
      // }
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

      // handle owners change
      for (let i = 0; i < field.owners.length; i++) {
        let owner = field.owners[i]
        owner.cadastr = field.cadastr
        if (owner.id) {
          owner = await MAP_API.updateOwner(owner.id, owner)
        } else {
          owner = await MAP_API.createOwner(owner)
        }
        owners.push(owner.id)
      }
      // remove owners
      for (let i = 0; i < this.deletedOwners.length; i++) {
        const id = this.deletedOwners[i]
        await MAP_API.deleteOwner(id)
      }
      const fieldCommonData = _.omit(field, [
        'created_at',
        'id',
        'plantations',
        'published_at',
        'updated_at',
      ])
      // fieldCommonData.owner_avatar = field.owner_avatar
      //   ? field.owner_avatar.id
      //   : null
      // fieldCommonData.owner_files = [
      //   ...field.owner_files.filter((file) => file.id),
      //   ...new_owner_files,
      // ].map((file) => file.id)

      fieldCommonData.files = [
        ...field.files.filter((file) => file.id),
        ...new_files,
      ].map((file) => file.id)
      fieldCommonData.plantations = plantations
      fieldCommonData.owners = owners

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
    this.summary = null
    console.log('reset', this.summary)
  }

  async loadAreas() {
    try {
      const res = await MAP_API.getAreas()
      this.areas = res.map((area) =>
        _.pick(area, ['id', 'name', 'path', 'fields'])
      )
    } catch (error) {
      console.log(error)
    }
  }
}

const store = new Store()

export default store

const handleArrAction = (arr, val) =>
  arr.includes(val) ? arr.filter((el) => el !== val) : [...arr, val]
