import { makeAutoObservable } from 'mobx'
import { RegistryTableStore } from './table-store'
import { REGISTRY_API } from '../help/api'
import _ from 'lodash'
import mapStore from '../map-store'
import {
  formatField,
  formatOwner,
  formatPlantation,
} from '../../components/registry/util'
import { FIELD_TYPES } from '../help/constants'

export class RegistryStore {
  isFetch = false
  search = ''
  mode = 'read'

  constructor() {
    makeAutoObservable(this)

    this.ownersStore = new RegistryTableStore(
      this,
      'owners',
      REGISTRY_API.getOwners,
      REGISTRY_API.getOwnersCount,
      REGISTRY_API.exportOwners,
      formatOwner,
      REGISTRY_API.saveOwner,
      'id',
      'search',
      (filter) => {
        if (filter.type) {
          const typekey = Object.keys(FIELD_TYPES).find(
            (key) => FIELD_TYPES[key] === filter.type
          )
          return { ...filter, type: typekey }
        }

        return filter
      }
    )
    this.fieldsStore = new RegistryTableStore(
      this,
      'fields',
      REGISTRY_API.getFields,
      REGISTRY_API.getFieldsCount,
      REGISTRY_API.exportFields,
      formatField,
      REGISTRY_API.saveField,
      'pathname'
    )
    this.plantationsStore = new RegistryTableStore(
      this,
      'plantations',
      REGISTRY_API.getFields,
      REGISTRY_API.getFieldsCount,
      REGISTRY_API.exportPlantations,
      formatPlantation,
      REGISTRY_API.saveField,
      'pathname'
    )
  }

  updateSearch = (value) => {
    this.search = value
  }

  async loadFieldIds(filter) {
    this.isFetch = true
    try {
      let query = new URLSearchParams()
      Object.keys(filter).forEach((key) => {
        query.set(key, filter[key])
      })
      if (this.search) query.set('search', this.search.toLowerCase())
      const res = await REGISTRY_API.getRegistryMap(query.toString())
      mapStore.updateFilter('cadastrs', res)
    } catch (error) {
      console.log(error)
    }
    this.isFetch = false
  }

  showOnMap(cadastr) {
    mapStore.updateFilter('cadastrs', [cadastr])
  }
  async changeMode() {
    if (this.mode === 'read') {
      this.editedRows = {}
      this.deletedItems = []
      this.mode = 'write'
    } else {
      await this.handleSave()
      this.mode = 'read'
    }
  }
  handleSave = async () => {
    this.isFetch = true
    await this.ownersStore.onSave()
    await this.fieldsStore.onSave()
    await this.plantationsStore.onSave()
    this.isFetch = false
    // delete this.editedRows.delete
    // const indexes = Object.keys(this.editedRows)
    // for (let i = 0; i < this.deletedItems.length; i++) {
    //   const id = this.deletedItems[i]
    //   await REGISTRY_API.delete(id)
    // }
    // for (let i = 0; i < indexes.length; i++) {
    //   const index = indexes[i]
    //   const isNew = !this.data[index].id
    //   try {
    //     if (isNew) {
    //       await REGISTRY_API.create(this.data[index])
    //     } else {
    //       await REGISTRY_API.update(this.data[index].id, this.data[index])
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // this.loadData()
  }

  cancelSave() {
    this.mode = 'read'
    // this.editedRows = {}
    // this.loadData()
  }
}

const store = new RegistryStore()
export default store
