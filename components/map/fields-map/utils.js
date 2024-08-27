import { useCallback, useEffect } from 'react'
import { useMobileDetect } from '../../../hooks'

export const useMapAreaHandlers = (ref, onOpen, type = 'registry') => {
  const { isDesktop } = useMobileDetect()
  const handleEnterArea = (e) => {
    e.currentTarget.style.fill = 'rgba(64, 124, 255, 0.2)'
    e.currentTarget.style.stroke = '#407CFF'

    /*
			Call onOpen on mouseenter event only in desktop case 
		*/
    if (isDesktop()) onOpen(e)
  }
  const handleLeaveArea = (e) => {
    e.currentTarget.style.fill = 'transparent'
    e.currentTarget.style.stroke = 'transparent'
    onOpen({ currentTarget: { id: null } })
  }

  useMapPlantations(ref, type)

  useEffect(() => {
    if (!ref.current) return

    const childrens = ref.current.querySelectorAll('g')

    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]
      if (
        !['lakes', 'green'].includes(element.id) &&
        element.id.search('plantation') === -1
      ) {
        element.addEventListener('mouseenter', handleEnterArea)
        element.addEventListener('mouseleave', handleLeaveArea)
        element.addEventListener('click', onOpen)
        // element.style.fill =
        //   element.style.fill === 'rgba(64, 124, 255, 0.2)'
        //     ? 'rgba(64, 124, 255, 0.2)'
        //     : 'transparent'
      }

      // if (element.id === 'plantation') {
      //   element.style.opacity = type === 'plantation' ? 1 : 0
      // }
    }

    return () => {
      if (!ref) return

      for (let i = 0; i < childrens.length; i++) {
        const element = childrens[i]
        if (element.tagName === 'g') {
          element.removeEventListener('mouseenter', handleEnterArea)
          element.removeEventListener('mouseleave', handleLeaveArea)
          element.removeEventListener('click', onOpen)
        }
      }
    }
  }, [ref, onOpen, type])
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
    const lastColor = e.currentTarget.style.fill
    e.currentTarget.style.fill = 'rgba(64, 124, 255, 0.2)'
    e.currentTarget.style.stroke = '#407CFF'
  }, [])
  const handleLeaveField = useCallback((e) => {
    // e.currentTarget.style.fill = fields.includes(e.currentTarget.id)
    //   ? '#407cff'
    // 	: 'transparent'
    e.currentTarget.style.fill = lastColor
    e.currentTarget.style.stroke = '#464F60'
  }, [])

  useMapPlantations(ref, type)

  useEffect(() => {
    if (!ref.current) return
    const element_index = ref.current.children.length - 1
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
  }, [ref, field, fields])
}

export const useMapPlantations = (ref, type) => {
  useEffect(() => {
    if (!ref.current) return

    const childrens = ref.current.querySelectorAll('g')

    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]

      if (element.id === 'plantation') {
        element.style.opacity = type === 'plantation' ? 1 : 0
      }
    }
  }, [ref, type])
}
