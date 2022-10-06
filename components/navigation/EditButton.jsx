import { Button, ConfirmationModal } from '../common'
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
          type: 'map',
          isRead: Stores.Map.mode === 'read',
          confirm: () => Stores.Map.changeMode(),
          cancel: () => Stores.Map.cancelSave(null),
        }
      case '/registry':
        return {
          type: 'registry',
          isRead: Stores.Registry.mode === 'read',
          confirm: () => Stores.Registry.changeMode(),
          cancel: () => Stores.Registry.cancelSave(),
        }
      default:
        return null
    }
  }
  const props = getProps()
  if (!isAdmin || !props) return

  if (props.isRead)
    return (
      <Button onClick={props.confirm} variant="primary" size="small">
        {edit_text}
      </Button>
    )
  return (
    <ConfirmationModal
      title="Зберегти зміни"
      text="Ви впевнені шо хочете зберегти зміни?"
      onConfirm={props.confirm}
      onCancel={props.cancel}
    >
      <Button variant="success" size="small">
        {save_text}
      </Button>
    </ConfirmationModal>
  )
})

export default EditButton
