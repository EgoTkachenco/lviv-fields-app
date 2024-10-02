import { useCallback, useEffect } from 'react'
import { useMobileDetect } from '../../../hooks'

export const useMapAreaHandlers = (ref, onOpen, type = 'registry') => {
  const { isDesktop } = useMobileDetect()
  const handleEnterArea = useCallback(
    (e) => {
      e.target.style.fill = 'rgba(64, 124, 255, 0.2)'
      e.target.style.stroke = '#407CFF'

      /*
			Call onOpen on mouseenter event only in desktop case 
		*/
      if (isDesktop()) onOpen(e)
    },
    [onOpen, isDesktop]
  )
  const handleLeaveArea = useCallback(
    (e) => {
      e.target.style.fill = 'transparent'
      e.target.style.stroke = 'transparent'
      onOpen({ currentTarget: { id: null } })
    },
    [onOpen, isDesktop]
  )

  useMapPlantations(ref, type)

  useEffect(() => {
    if (!ref.current) return

    const childrens = ref.current.querySelectorAll('g.fields')

    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]

      element.addEventListener('mouseenter', handleEnterArea)
      element.addEventListener('mouseleave', handleLeaveArea)
      element.addEventListener('click', onOpen)
    }

    return () => {
      if (!ref) return

      for (let i = 0; i < childrens.length; i++) {
        const element = childrens[i]
        element.removeEventListener('mouseenter', handleEnterArea)
        element.removeEventListener('mouseleave', handleLeaveArea)
        element.removeEventListener('click', onOpen)
      }
    }
  }, [ref])
}

let lastColor = ''

export const useMapFieldsHandlers = (
  ref,
  onOpen,
  field,
  fields,
  type = 'registry'
) => {
  const handleEnterField = useCallback((e) => {
    lastColor = e.currentTarget.style.fill
    e.currentTarget.style.fill = 'rgba(64, 124, 255, 0.2)'
    e.currentTarget.style.stroke = '#407CFF'
  }, [])
  const handleLeaveField = useCallback((e) => {
    e.currentTarget.style.fill = lastColor
    e.currentTarget.style.stroke = '#464F60'
  }, [])

  useMapPlantations(ref, type)

  useEffect(() => {
    if (!ref.current) return
    let element_index = 0
    for (let i = 0; i < ref.current.children.length; i++) {
      const element = ref.current.children[i]
      if (element.classList.contains('fields')) {
        element_index = i
      }
    }
    const childrens = ref.current.children[element_index].children
    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]
      if (
        element.tagName === 'path' &&
        element.id.search('Vector') === -1 &&
        element.id.search('Lake') === -1 &&
        !element.classList.contains('disabled-field')
      ) {
        if (field !== element.id)
          element.addEventListener('mouseover', handleEnterField)
        if (field !== element.id)
          element.addEventListener('mouseleave', handleLeaveField)
        if (field !== element.id) element.addEventListener('click', onOpen)

        element.style.fill = fields.includes(element.id) ? '' : 'transparent'
        element.style.stroke = '#464F60'

        if (field === element.id) {
          element.style.fill = 'rgba(64, 124, 255, 0.2)'
          element.style.stroke = '#407CFF'
        }

        if (element.id === 'plantation') {
          element.style.opacity = type === 'plantation' ? 1 : 0
        }
      }

      if (element.classList.contains('disabled-field')) {
        element.style.stroke = 'transparent'
        element.style.cursor = 'default'
      }
    }

    return () => {
      if (!ref.current) return
      const element_index = ref.current.children[0].id === 'lakes' ? 1 : 0
      const childrens = ref.current.children[element_index].children
      for (let i = 0; i < childrens.length; i++) {
        const element = childrens[i]
        if (
          element.tagName === 'path' &&
          element.id.search('Vector') === -1 &&
          element.id.search('Lake') === -1
        ) {
          element.removeEventListener('mouseenter', handleEnterField)
          element.removeEventListener('mouseleave', handleLeaveField)
          element.removeEventListener('click', onOpen)
        }
      }
    }
  }, [ref, field])
}

export const useMapPlantations = (ref, type) => {
  useEffect(() => {
    if (!ref.current) return

    const childrens = ref.current.querySelectorAll('g#plantation')

    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]

      element.style.opacity = type === 'plantation' ? 1 : 0
    }
  }, [ref, type])
}
