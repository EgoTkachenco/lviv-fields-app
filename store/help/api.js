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
  getTasks: () => axios.get('/tasks', securedFetchOptions()),

  createTask: () => axios.post('/tasks', securedFetchOptions()),
}
