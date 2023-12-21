import { AppBar, Box, IconButton, Modal, Stack } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

export const ZoomableImage = ({ image = null, setImage }) => {
  const handleClose = () => {
    setImage(null)
  }
  const handleZoomIn = () => {}
  const handleZoomOut = () => {}

  return (
    <Modal
      open={image !== null}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <>
        <Box component='img' src={image} bgcolor='transparent'
          // alignSelf='center'
          sx={{ 
            width: '80vw', 
            height: '80vh', 
            objectFit: 'contain' 
          }}
        />
        <AppBar
          sx={{ 
            position: "fixed", bottom: 0, top: 'auto', left: 'auto', right: 'auto',
            width: 'auto', bgcolor: 'whitesmoke', borderRadius: 10
          }}
        >
          <Stack direction='row' spacing={0.5} padding={0.5}>
            <IconButton onClick={handleZoomIn}><ZoomInIcon/></IconButton>
            <IconButton onClick={handleZoomOut}><ZoomOutIcon/></IconButton>
            <IconButton onClick={handleClose}><CloseIcon/></IconButton>
          </Stack>
        </AppBar>
      </>
    </Modal>
  )
}