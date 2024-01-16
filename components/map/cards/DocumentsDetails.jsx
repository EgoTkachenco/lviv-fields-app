import styled from 'styled-components'
import { Card, H5, Box } from '../../common'
import { FilesList, FileUploadButton } from './elements'

const DocumentsDetails = ({ data, isRead, onChange }) => {
  return (
    <ContactCard>
      <ContactCardHeader>
        <H5>Список документів:</H5>
        {!isRead && (
          <FileUploadButton
            accept=".doc,.docx,.pdf"
            placeholder="Додати ФАЙЛ"
            onSubmit={(file) => onChange('file-new', file)}
          />
        )}
      </ContactCardHeader>
      <FilesList
        files={data.files || []}
        onDelete={(i) => onChange('file-delete', i)}
        isRead={isRead}
      />
    </ContactCard>
  )
}

export default DocumentsDetails

const ContactCard = styled(Card)`
  gap: 24px;
  display: flex;
  flex-direction: column;
`
const ContactCardHeader = styled(Box)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`
