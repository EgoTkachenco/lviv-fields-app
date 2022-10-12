import styled from 'styled-components'
import { Box, Icon, Button } from '../../../common'

const FilesList = ({ files, isRead, onCreate, onDelete, isMobile }) => {
  const Container = isMobile ? FilesMobile : Files
  return (
    <Container gap="32px" align="center">
      {files.map((file, i) => (
        <FilePreview
          key={i}
          file={file}
          isRead={isRead}
          onDelete={() => onDelete(i)}
        />
      ))}
      {!isRead && (
        <FileUploadButton
          accept=".doc,.docx,.pdf"
          placeholder="Додати ФАЙЛ"
          onSubmit={(file) => onCreate(file)}
        />
      )}
    </Container>
  )
}

export default FilesList

const getIconType = (type) => {
  if (type === '.pdf') return 'file-pdf'
  return 'file-doc'
}

export const FilePreview = ({ file, isRead, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onDelete()
  }
  return (
    <FileIcon
      href={process.env.NEXT_PUBLIC_ADMIN_URL + file.url}
      target="_blank"
      title={file.name}
    >
      {!isRead && (
        <FilePreviewDelete onClick={handleDelete}>x</FilePreviewDelete>
      )}
      <Icon icon={getIconType(file?.ext)} size="32px" />
    </FileIcon>
  )
}

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
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
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
    <FileButton variant="primary">
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
