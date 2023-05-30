import { useEffect } from 'react'
import { useMobileDetect } from '../../../hooks'

export const useMapAreaHandlers = (ref, onOpen) => {
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
  useEffect(() => {
    if (!ref.current) return

    const childrens = ref.current.children
    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]

      if (element.tagName === 'g' && !['lakes', 'green'].includes(element.id)) {
        element.addEventListener('mouseenter', handleEnterArea)
        element.addEventListener('mouseleave', handleLeaveArea)
        element.addEventListener('click', onOpen)
        element.style.fill =
          element.style.fill === 'rgba(64, 124, 255, 0.2)'
            ? 'rgba(64, 124, 255, 0.2)'
            : 'transparent'
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
  }, [ref, onOpen])
}

export const useMapFieldsHandlers = (ref, onOpen, field, fields) => {
  const handleEnterField = (e) => {
    e.currentTarget.style.fill = 'rgba(64, 124, 255, 0.2)'
    e.currentTarget.style.stroke = '#407CFF'
  }
  const handleLeaveField = (e) => {
    // e.currentTarget.style.fill = fields.includes(e.currentTarget.id)
    //   ? '#407cff'
    // 	: 'transparent'
    e.currentTarget.style.fill = field ? 'transparent' : ''
    e.currentTarget.style.stroke = '#464F60'
  }
  useEffect(() => {
    if (!ref.current) return
    // const styles = document.getElementById('map-style').innerHTML.split('\n').reduce((acc, line) => {
    // 	return acc['']
    // }, {})
    const element_index = ref.current.children[0].id === 'lakes' ? 1 : 0
    const childrens = ref.current.children[element_index].children
    for (let i = 0; i < childrens.length; i++) {
      const element = childrens[i]

      if (
        element.tagName === 'path' &&
        element.id.search('Vector') === -1 &&
        element.id.search('Lake') === -1
      ) {
        if (field !== element.id)
          element.addEventListener('mouseenter', handleEnterField)
        if (field !== element.id)
          element.addEventListener('mouseleave', handleLeaveField)
        element.addEventListener('click', onOpen)

        element.style.fill = fields.includes(element.id) ? '' : 'transparent'
        element.style.stroke = '#464F60'

        if (field === element.id) {
          element.style.fill = 'rgba(64, 124, 255, 0.2)'
          element.style.stroke = '#407CFF'
        }
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
