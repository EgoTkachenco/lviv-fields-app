import { useState, useEffect } from 'react'
import { PLANNER_API } from '../../store/help/api'

const useArchive = (trigger) => {
  const [state, setState] = useState({
    tasks: [],
    isFetch: false,
  })
  const loadArchive = async () => {
    setState((state) => ({ ...state, isFetch: true }))
    try {
      const tasks = await PLANNER_API.getArchiveTasks()
      setState((state) => ({ ...state, tasks }))
    } catch (error) {
      console.log(error)
    }
    setState((state) => ({ ...state, isFetch: false }))
  }

  useEffect(() => {
    if (trigger) loadArchive()
  }, [trigger])

  return [state.tasks, state.isFetch]
}

export default useArchive
