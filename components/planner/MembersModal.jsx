import { useState, useEffect, Fragment } from 'react'
import { Button, Spacer, Modal, Input, Icon, Checkbox } from '../common'
import { USERS_API } from '../../store/help/api'

const MembersModal = ({ members, onMemberChange }) => {
  const [show, setShow] = useState(false)
  const [users, setUsers] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  useEffect(() => {
    if (show) {
      console.log('fetch')
      USERS_API.getUsers().then((res) =>
        setUsers(res.filter((u) => u.role.name !== 'Admin'))
      )
    }
  }, [show])
  return (
    <>
      <Modal
        title="Запросити учасника"
        close={() => setShow(false)}
        show={show}
      >
        <form onSubmit={handleSubmit}>
          {users?.map((user) => (
            <Fragment key={user.id}>
              <Checkbox
                label={user.username}
                value={members.includes(user.id)}
                onChange={(v) => onMemberChange(user, v)}
              />
              <Spacer vertical size="8px" />
            </Fragment>
          ))}
          <Spacer vertical size="20px" />
          <Button variant="primary" onClick={() => setShow(false)}>
            Додати
          </Button>
        </form>
      </Modal>
      <Button
        width="auto"
        variant="primary-outline"
        onClick={() => setShow(true)}
      >
        <Icon icon="user-plus" />
        запросити до чату
      </Button>
    </>
  )
}

export default MembersModal
