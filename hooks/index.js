import { useState, useEffect } from 'react'
import { VARIETIES_API } from '../store/help/api'

export const useNoBodyScroll = (open) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])
}

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const getInitialState = (fields) =>
  Object.keys(fields).reduce(
    (acc, key) => {
      acc[key] = fields[key].value
      return acc
    },
    { errors: {} }
  )

export const useForm = (fields = {}) => {
  const [state, setState] = useState(getInitialState(fields))

  const onChange = (key, value) => {
    if (!state.hasOwnProperty(key) || key === 'errors') return
    setState({
      ...state,
      [key]: value,
      errors: {
        ...state.errors,
        [key]: '',
      },
    })
  }
  const onError = (key, error) => {
    setState({
      ...state,
      errors: { ...state.errors, [key]: error },
    })
  }
  const onErrors = (errors) => {
    setState({
      ...state,
      errors: errors,
    })
  }
  const getFieldProps = (key) => {
    if (!state.hasOwnProperty(key)) throw new Error(`No ${key} key in form`)

    return {
      value: state[key],
      onChange: (v) => onChange(key, v),
      error: state.errors[key] || '',
    }
  }

  const validate = () => {
    let errors = {}
    for (let key in fields) {
      if (fields[key].required && !state[key]) {
        errors[key] = "Поле обов'язкове"
      } else if (
        fields[key].type === 'email' &&
        !state[key].match(validRegex)
      ) {
        errors[key] = 'Невірний формат'
      }
    }
    console.log(errors)
    if (Object.keys(errors).length) {
      onErrors(errors)
      return false
    }
    return true
  }
  const reset = () => {
    setState(getInitialState(fields))
  }

  return { state, onChange, onError, getFieldProps, validate, reset }
}

export const useAPIVarieties = () => {
  const [search, setSearch] = useState('')
  const [varieties, setVarieties] = useState([])

  const debouncedGetVarieties = _.debounce(
    (search) => getVarieties(search),
    100
  )

  const searchVarieties = (value) => {
    setSearch(value)
    debouncedGetVarieties(value)
  }

  const getVarieties = async (search) => {
    const res = await VARIETIES_API.getVarieties(search)
    setVarieties(res)
  }
  const createVariety = async () => {
    const new_variant = await VARIETIES_API.createVariety(search)
    setSearch('')
    getVarieties()
    return new_variant
  }
  useEffect(() => {
    getVarieties()
  }, [])

  return {
    varieties,
    search,
    onSearch: searchVarieties,
    onCreate: createVariety,
  }
}
