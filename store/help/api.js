const { axios, securedFetchOptions, getToken } = require('./axios')

export const AUTH_API = {
  login: (identifier, password) =>
    axios.post('/auth/local', { identifier, password }),

  register: (username, email, password) =>
    axios.post('/auth/local/register', {
      username,
      email,
      password,
    }),

  forgetPassword: (email) => axios.post('/auth/forgot-password', { email }),

  resetPassword: (password, code) =>
    axios.post('/auth/reset-password', {
      code: code,
      password: password,
      passwordConfirmation: password,
    }),
}

export const PLANNER_API = {
  getTasks: () =>
    axios.get('/tasks?_limit=-1&status=open', securedFetchOptions()),

  getArchiveTasks: () =>
    axios.get('/tasks?_limit=-1&status=closed', securedFetchOptions()),

  createTask: (name) => axios.post('/tasks', { name }, securedFetchOptions()),

  getMessages: (task) =>
    axios.get('/messages', {
      params: {
        task: task,
        // _start: page * 20,
        _limit: -1,
      },
      ...securedFetchOptions(),
    }),

  sendMessage: (data) => axios.post('/messages', data, securedFetchOptions()),

  addMember: (task, user) =>
    axios.post(
      `/tasks/${task}/member`,
      { memberId: user },
      securedFetchOptions()
    ),

  deleteMember: (task, user) =>
    axios.delete(`/tasks/${task}/member/${user}`, securedFetchOptions()),

  finishTask: (task) =>
    axios.put(`/tasks/${task}`, { status: 'closed' }, securedFetchOptions()),
}

export const USERS_API = {
  getUsers: () =>
    axios.get('/users', { query: { _limit: -1 }, ...securedFetchOptions() }),
}

export const MAP_API = {
  getField: (pathname) =>
    axios.get(`/fields/${pathname}`, securedFetchOptions()),

  updateField: (pathname, data) =>
    axios.put(`/fields/${pathname}`, data, securedFetchOptions()),

  createPlantation: (variety, size, year) =>
    axios.post('/plantations', { variety, size, year }, securedFetchOptions()),
  updatePlantation: (id, variety, size, year) =>
    axios.put(
      `/plantations/${id}`,
      { variety, size, year },
      securedFetchOptions()
    ),
  deletePlantation: (id) =>
    axios.delete(`/plantations/${id}`, securedFetchOptions()),

  getSummary: (filter) =>
    axios.get(`/fields/summary?${filter}`, securedFetchOptions()),

  getAreas: () => axios.get('/areas', securedFetchOptions()),

  updateOwner: (id, data) =>
    axios.put(`/owners/${id}`, data, securedFetchOptions()),
  createOwner: (data) => axios.post('/owners', data, securedFetchOptions()),
  deleteOwner: (id) => axios.delete(`/owners/${id}`, securedFetchOptions()),
}

export const FILE_API = {
  loadFile: async (data) => {
    const res = await axios.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getToken(),
      },
    })

    return Array.isArray(res) ? res[0] : res
  },

  removeFile: (fileId) =>
    axios.delete(`/upload/files/${fileId}`, securedFetchOptions()),
}

export const VARIETIES_API = {
  getVarieties: (search) =>
    axios.get('/varieties', {
      params: {
        _limit: -1,
        name_contains: search,
      },
      ...securedFetchOptions(),
    }),
  createVariety: (name) =>
    axios.post('/varieties', { name }, securedFetchOptions()),
}

export const REGISTRY_API = {
  getRegistry: (query) =>
    axios.get(`/landlords-registries?${query}`, securedFetchOptions()),
  getRegistryCount: (query) =>
    axios.get(`/landlords-registries/count?${query}`, securedFetchOptions()),
  // getRegistryMap: (query) =>
  //   axios.get(`/landlords-registries/map?${query}`, securedFetchOptions()),
  create: (data) =>
    axios.post('/landlords-registries', data, securedFetchOptions()),
  update: (id, data) =>
    axios.put(`/landlords-registries/${id}`, data, securedFetchOptions()),
  delete: (id) =>
    axios.delete(`/landlords-registries/${id}`, securedFetchOptions()),

  getOwners: (query) => axios.get(`/owners?${query}`, securedFetchOptions()),
  getOwnersCount: (query) =>
    axios.get(`/owners/count?${query}`, securedFetchOptions()),
  getRegistryMap: (query) =>
    axios.get(`/owners/map?${query}`, securedFetchOptions()),
  exportOwners: (query) =>
    axios.get(
      `/owners/export${query ? '?' : ''}${query}`,
      securedFetchOptions()
    ),
  saveOwner: (id, data) =>
    axios.put(`/owners/${id}`, data, securedFetchOptions()),

  getFields: (query) => axios.get(`/fields?${query}`, securedFetchOptions()),
  getFieldsCount: (query) =>
    axios.get(`/fields/count?${query}`, securedFetchOptions()),
  exportFields: (query) =>
    axios.get(
      `/fields/export${query ? '?' : ''}${query}`,
      securedFetchOptions()
    ),
  saveField: (id, data) =>
    axios.put(`/fields/${id}`, data, securedFetchOptions()),

  exportPlantations: (query) =>
    axios.get(
      `/plantations/export${query ? '?' : ''}${query}`,
      securedFetchOptions()
    ),
}
