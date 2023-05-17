import { Button, ConfirmationModal } from '../common'
import { observer } from 'mobx-react-lite'
import Stores from '../../store'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const edit_text = 'Редагування'
const save_text = 'Зберегти'

const EditButton = observer(({ isMobile }) => {
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
          condition: () => !!Stores.Map.field,
        }
      // case '/registry':
      //   return {
      //     type: 'registry',
      //     isRead: Stores.Registry.mode === 'read',
      //     confirm: () => Stores.Registry.changeMode(),
      //     cancel: () => Stores.Registry.cancelSave(),
      //     condition: () => true,
      //   }
      default:
        return null
    }
  }
  const props = getProps()
  if (!isAdmin || !props || !props.condition()) return

  if (props.isRead)
    return (
      <StyledButton
        onClick={props.confirm}
        variant="primary"
        size="small"
        isMobile={isMobile}
      >
        {edit_text}
      </StyledButton>
    )
  return (
    <ConfirmationModal
      title="Зберегти зміни"
      text="Ви впевнені шо хочете зберегти зміни?"
      onConfirm={props.confirm}
      onCancel={props.cancel}
    >
      <StyledButton variant="success" size="small" isMobile={isMobile}>
        {save_text}
      </StyledButton>
    </ConfirmationModal>
  )
})

export default EditButton

const StyledButton = styled(Button)`
  display: ${(props) => (props.isMobile ? 'none' : 'flex')};
  @media (max-width: 800px) {
    display: ${(props) => (props.isMobile ? 'flex' : 'none')};
    margin-bottom: 16px;
  }
`
