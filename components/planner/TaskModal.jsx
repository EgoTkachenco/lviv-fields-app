import { useState } from 'react'
import { Button, Spacer, Modal, Input } from '../common'
import { useForm } from '../../hooks'

const TaskModal = ({ onSubmit, task }) => {
  const [show, setShow] = useState(false)
  const form = useForm({
    name: { required: true, value: task ? task.name : '' },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = form.validate()
    if (!isValid) return

    onSubmit(form.state.name)
    setShow(false)
    form.reset()
  }
  return (
    <>
      <Modal title="Додати завдання" close={() => setShow(false)} show={show}>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Назва" {...form.getFieldProps('name')} />
          <Spacer vertical size="20px" />
          <Button variant="primary" type="submit">
            Додати
          </Button>
        </form>
      </Modal>
      <Button type="primary" onClick={() => setShow(true)}>
        додати нове завдання
      </Button>
    </>
  )
}

export default TaskModal
