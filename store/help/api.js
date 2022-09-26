const { axios, securedFetchOptions } = require('./axios')

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

  createTask: (name) => axios.post('/tasks', { name }, securedFetchOptions()),

  getMessages: (task, page) =>
    axios.get('/messages', {
      params: {
        task: task,
        _start: page * 20,
        _limit: 20,
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
}

export const USERS_API = {
  getUsers: () =>
    axios.get('/users', { query: { _limit: -1 }, ...securedFetchOptions() }),
}
