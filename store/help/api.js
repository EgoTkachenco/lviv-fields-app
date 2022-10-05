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

  sendMessage: (task, content, type = 'text') =>
    axios.post('/messages', { task, content, type }, securedFetchOptions()),

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

  createPlantation: (variety, size, field) =>
    axios.post('/plantations', { variety, size, field }, securedFetchOptions()),
  updatePlantation: (id, variety, size) =>
    axios.put(`/plantations/${id}`, { variety, size }, securedFetchOptions()),

  getSummary: (filter) =>
    axios.get(`/fields/summary?${filter}`, securedFetchOptions()),
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
  getRegistry: (search) =>
    axios.get('/landlords-registries', {
      params: { _limit: -1, _q: search },
      ...securedFetchOptions(),
    }),
  create: (data) =>
    axios.post('/landlords-registries', data, securedFetchOptions()),
  update: (id, data) =>
    axios.put(`/landlords-registries/${id}`, data, securedFetchOptions()),
}
