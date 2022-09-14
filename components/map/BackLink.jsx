import { Box, Button, Spacer } from '../common'

const BackLink = ({ action }) => {
  return (
    <>
      <Spacer vertical size="32px" />
      <Box justify="center">
        <Button type="text" onClick={action}>
          Повернутися на головну
        </Button>
      </Box>
    </>
  )
}

export default BackLink
