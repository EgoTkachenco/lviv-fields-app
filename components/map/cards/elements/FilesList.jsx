import styled from 'styled-components'
import { Box, Icon, Button, Text, H6 } from '../../../common'
import { formatDate } from '../../../../utils'

const FilesList = ({ files, isRead, onDelete, isMobile }) => {
  const Container = isMobile ? FilesMobile : Files
  return (
    <Container direction="column" gap="10px">
      {files.map((file, i) => (
        <FilePreview
          key={i}
          file={file}
          isRead={isRead}
          onDelete={() => onDelete(i)}
        />
      ))}
      {files.length === 0 && <Text>Файли відсутні</Text>}
    </Container>
  )
}

export default FilesList

const getIconType = (type) => {
  if (type === '.pdf') return 'file-pdf'
  return 'file-doc'
}

const backend_url = process.env.NEXT_PUBLIC_ADMIN_URL

export const FilePreview = ({ file, isRead, onDelete }) => {
  return (
    <FilePreviewBox>
      <FilePreviewName>{file.name}</FilePreviewName>
      <H6>{formatDate(file?.updated_at)}</H6>
      <Icon
        icon="info"
        size="20px"
        title="Завантажити"
        onClick={() =>
          window.open(backend_url + file.url, { _target: '_black' })
        }
      />
      {!isRead && <Icon icon="close-dark" size="12px" onClick={onDelete} />}
    </FilePreviewBox>
  )
}

const FilePreviewBox = styled(Box)`
  gap: 16px;
  width: 100%;
  align-items: center;
`

const FilePreviewName = styled(H6)`
  flex-grow: 1;
`

const FileIcon = styled.a`
  display: block;
  cursor: pointer;
  position: relative;
`

const FilePreviewDelete = styled.button`
  background: #fff;
  border: 1px solid transparent;
  border-radius: 50%;
  color: #464f60;
  transition: border-color 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  width: 24px;
  height: 24px;

  &:hover {
    border-color: #464f60;
  }
`

const Files = styled(Box)`
  @media (max-width: 800px) {
    display: none;
  }
`
const FilesMobile = styled(Box)`
  display: none;

  @media (max-width: 800px) {
    margin-top: 20px;
    display: flex;
  }
`

export const FileUploadButton = ({
  placeholder,
  onSubmit = () => {},
  accept,
}) => {
  const handleChange = (e) => {
    onSubmit(e.target.files[0])
  }
  return (
    <FileButton variant="primary" width="auto">
      {placeholder}
      <FileInput type="file" onChange={handleChange} accept={accept} />
    </FileButton>
  )
}

const FileButton = styled(Button)`
  position: relative;
`

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`
