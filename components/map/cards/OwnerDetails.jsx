import styled from 'styled-components'
import { useRef } from 'react'
import { Card, H5, Spacer, Box, Input } from '../../common'
import { CardField, SmallColumn as Column, FilesList } from './elements'

const OwnerDetails = ({ data, isRead, onChange }) => {
  return (
    <Card>
      <Box justify="space-between" align="center">
        <H5>Інформація про власника земельної ділянки:</H5>
        <FilesList
          files={data.owner_files}
          onCreate={(file) => onChange('owner-file-new', file)}
          onDelete={(i) => onChange('owner-file-delete', i)}
          isRead={isRead}
        />
      </Box>

      <Spacer vertical size="25px" />

      <Box gap="40px" direction-sm="column">
        <Avatar
          avatar={data.owner_avatar}
          isRead={isRead}
          onChange={(value) => onChange('owner-avatar', value)}
        />
        <Box wrap="true" gap="20px" direction-sm="column" width="100%">
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="ПІБ"
            value={data.owner_fullname}
            editableSlot={
              <Input
                placeholder="ПІБ"
                value={data.owner_fullname}
                onChange={(value) => onChange('owner_fullname', value)}
              />
            }
          />
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="Контактний телефон"
            value={data.owner_phone}
            editableSlot={
              <Input
                value={data.owner_phone}
                onChange={(value) => onChange('owner_phone', value)}
              />
            }
          />
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="Дата народження"
            value={data.owner_birthdate}
            editableSlot={
              <Input
                type="date"
                value={data.owner_birthdate}
                onChange={(value) => onChange('owner_birthdate', value)}
              />
            }
          />
          <CardField
            styledBox={Column}
            isRead={isRead}
            label="Електронна пошта"
            value={data.owner_mail}
            editableSlot={
              <Input
                value={data.owner_mail}
                onChange={(value) => onChange('owner_mail', value)}
              />
            }
          />
          <CardField
            styledBox={FullBox}
            isRead={isRead}
            label="Адреса"
            value={data.owner_address}
            editableSlot={
              <Input
                value={data.owner_address}
                onChange={(value) => onChange('owner_address', value)}
              />
            }
          />
          <CardField
            styledBox={FullBox}
            isRead={isRead}
            label="Примітка"
            value={data.owner_note}
            editableSlot={
              <Input
                value={data.owner_note}
                onChange={(value) => onChange('owner_note', value)}
              />
            }
          />
        </Box>
      </Box>
      <FilesList
        isMobile
        files={data.owner_files}
        onCreate={(file) => onChange('owner-file-new', file)}
        onDelete={(i) => onChange('owner-file-delete', i)}
        isRead={isRead}
      />
    </Card>
  )
}

export default OwnerDetails

const FullBox = styled(Box)`
  width: 100%;
  gap: 16px;
  & :nth-child(2) {
    flex-grow: 1;
  }
`

const Avatar = ({ avatar, onChange, isRead }) => {
  const avatarRef = useRef()
  if (isRead && !avatar) return <AvatarPlaceholder>A</AvatarPlaceholder>

  if (!isRead && !avatar)
    return (
      <AvatarPlaceholder>
        +
        <AvatarInput
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => onChange(e.target.files[0])}
        />
      </AvatarPlaceholder>
    )

  let avatarSrc = null
  const isNewAvatar = !avatar.id
  if (isNewAvatar) {
    let reader = new FileReader()
    reader.onload = (e) => {
      avatarRef.current.src = e.target.result
    }
    reader.readAsDataURL(avatar)
  } else {
    avatarSrc = process.env.NEXT_PUBLIC_ADMIN_URL + avatar.url
  }
  return (
    <AvatarWrapper>
      {!isRead && <AvatarDelete onClick={() => onChange(null)}>x</AvatarDelete>}
      <AvatarOverflow>
        <AvatarImage ref={avatarRef} src={avatarSrc} />
      </AvatarOverflow>
    </AvatarWrapper>
  )
}

const AvatarWrapper = styled.div`
  position: relative;
  min-width: 160px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1600px) {
    min-width: 120px;
    width: 120px;
    height: 120px;
  }
  @media (max-width: 1200px) {
    min-width: 100px;
    width: 100px;
    height: 100px;
  }
`
const AvatarOverflow = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`
const AvatarInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`
const AvatarDelete = styled.button`
  background: #fff;
  border: 1px solid transparent;
  border-radius: 50%;
  color: #464f60;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  transition: border-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 100%;
  width: 24px;
  height: 24px;

  &:hover {
    border-color: #464f60;
  }
`
const AvatarPlaceholder = styled(AvatarWrapper)`
  border: 1px solid #407cff;
  font-size: 24px;
  color: #407cff;
  text-transform: uppercase;
`
