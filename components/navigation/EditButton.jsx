import { NavLink } from './Navigation'
import { observer } from 'mobx-react-lite'
import Stores from '../../store'
import { useRouter } from 'next/router'

const edit_text = 'Редагування'
const save_text = 'Зберегти'

const EditButton = observer(() => {
  const router = useRouter()
  const user = Stores.Auth.user
  const isAdmin = user?.role.name === 'Admin'

  const getProps = () => {
    switch (router.pathname) {
      case '/map':
        return {
          text: Stores.Map.mode === 'read' ? edit_text : save_text,
          action: () => Stores.Map.changeMode(),
        }
      case '/registry':
        return {
          text: Stores.Registry.mode === 'read' ? edit_text : save_text,
          action: () => Stores.Registry.changeMode(),
        }
      default:
        return null
    }
  }
  const props = getProps()
  if (!isAdmin || !props) return

  return <NavLink onClick={props.action}>{props.text}</NavLink>
})

export default EditButton
