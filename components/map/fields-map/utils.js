import { useEffect } from 'react'

const handleEnterArea = (e) => {
  e.currentTarget.style.fill = 'rgba(64, 124, 255, 0.2)'
  e.currentTarget.style.stroke = '#407CFF'
}
const handleLeaveArea = (e) => {
  e.currentTarget.style.fill = 'transparent'
  e.currentTarget.style.stroke = 'transparent'
}

export const useMapAreaHandlers = (ref, onOpen) =>
  useEffect(() => {
    if (!ref.current) return

    const childrens = ref.current.children
    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]

      if (element.tagName === 'g' && !['lakes', 'green'].includes(element.id)) {
        element.addEventListener('mouseenter', handleEnterArea)
        element.addEventListener('mouseleave', handleLeaveArea)
        element.addEventListener('click', onOpen)
        element.style.fill = 'transparent'
      }
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
  }, [ref])

const handleEnterField = (e) => {
  e.currentTarget.style.fill = 'rgba(64, 124, 255, 0.2)'
  e.currentTarget.style.stroke = '#407CFF'
}
const handleLeaveField = (e) => {
  e.currentTarget.style.fill = 'transparent'
  e.currentTarget.style.stroke = '#464F60'
}

export const useMapFieldsHandlers = (ref, onOpen, field) =>
  useEffect(() => {
    if (!ref.current) return
    const childrens = ref.current.children[0].children

    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]

      if (
        element.tagName === 'path' &&
        element.id.search('Vector') === -1 &&
        element.id.search('Lake') === -1
      ) {
        console.log('field')
        if (field !== element.id)
          element.addEventListener('mouseenter', handleEnterField)
        if (field !== element.id)
          element.addEventListener('mouseleave', handleLeaveField)
        element.addEventListener('click', onOpen)

        element.style.fill = 'transparent'
        element.style.stroke = '#464F60'

        if (field === element.id) {
          element.style.fill = 'rgba(64, 124, 255, 0.2)'
          element.style.stroke = '#407CFF'
        }
      }
    }

    return () => {
      if (!ref.current) return
      const childrens = ref.current.children[0].children
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
