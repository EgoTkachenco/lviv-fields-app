import { ConfirmationModal, Button } from '../components/common'

export default function Test() {
  return (
    <ConfirmationModal
      title="Завершити завдання"
      text="Ви впевнені шо хочете завершити задачу?"
    >
      <Button variant="primary">OPEN</Button>
    </ConfirmationModal>
  )
}
