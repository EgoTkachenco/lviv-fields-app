import { makeAutoObservable } from 'mobx'
import { AUTH_API } from './help/api'
import { setToken, eraseToken, getToken } from './help/axios'
import { TOKEN_NAME, USER_STORE_NAME } from './help/constants'

class Store {
  user = undefined
  isFetch = false
  constructor() {
    makeAutoObservable(this)
  }

  async signIn(identifier, password) {
    try {
      this.isFetch = true
      const { jwt, user } = await AUTH_API.login(identifier, password)
      this.user = user
      setToken(jwt)
      localStorage.setItem(USER_STORE_NAME, JSON.stringify(user))
      this.isFetch = false
      return true
    } catch (err) {
      this.isFetch = false
      return { key: 'identifier', error: 'Пошта або пароль не вірні' }
    }
  }

  async signUp(username, email, password) {
    try {
      this.isFetch = true
      await AUTH_API.register(username, email, password)
      this.isFetch = false
      return true
    } catch (err) {
      this.isFetch = false
      const error_key = err.response.data?.message[0]?.messages[0]?.id || null
      console.log(error_key)
      if (error_key === 'Auth.form.error.email.taken')
        return { key: 'email', error: 'Пошта зайнята' }

      return { key: 'username', error: 'error' }
    }
  }

  async forgotPassword(email) {
    await AUTH_API.forgetPassword(email)
  }

  async resetPassword(code, password, confirmPassword) {
    if (!code) return Promise.reject('Invalid code')
    if (password !== confirmPassword)
      return Promise.reject("Password's do not match")
    await AUTH_API.resetPassword(password, code)
  }

  logout() {
    eraseToken()
    localStorage.removeItem(USER_STORE_NAME)
    this.user = null
    window.location.pathname = '/login'
  }

  relog() {
    const user = localStorage.getItem(USER_STORE_NAME)
    const token = getToken()
    if (user && token) {
      this.user = JSON.parse(user)

      return this.user
    } else {
      this.user = null
      localStorage.removeItem(USER_STORE_NAME)
      return false
    }
  }
}

const store = new Store()

export default store
