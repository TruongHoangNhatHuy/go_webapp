import { Box, Button, Divider, Drawer, IconButton, Paper, Stack, Typography } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { BookingDetail } from '..';
import { useState } from 'react';

const DriverInfo = () => {
  return (
    <Stack spacing={1} padding={1}>
      <Box component={Paper} minHeight={50} maxWidth={200}>
        Avatar
      </Box>
      <Typography>Tên tài xế</Typography>
      <Typography>Phương tiện</Typography>
      <Typography>Đánh giá</Typography>
    </Stack>
  )
}

export const BookingInfoSide = ({ bookingRef, handleBookingCancel }) => {

  const drawerWidth = 350;
  // Đóng mở drawer
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const handleCancel = () => {
    if (window.confirm('Xác nhận hủy đặt xe?')) {
      setOpen(false)
      handleBookingCancel()
    }
  }

  return (
    <Stack flexDirection='row' height='100vh' alignItems={'center'}>
      <IconButton onClick={handleOpen}
        sx={{
          bgcolor: 'white', borderRadius: 2, boxShadow: 5,
          paddingX: 0.5, paddingY: 8, margin: 0.5,
          ":hover": { bgcolor: 'lightgray' }
        }}
      >
        <KeyboardDoubleArrowLeftIcon sx={{ transform: 'rotate(180deg)' }} />
      </IconButton>
      <Drawer
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            border: 0,
            boxShadow: 10
          }
        }}
        variant="persistent"
        anchor="left"
      >
        <Stack minWidth='90%' spacing={1} padding={1}>
          <IconButton onClick={handleOpen} sx={{ padding: 0.5, borderRadius: 1 }}>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <Divider/>
          <Typography variant='h6'>Chi tiết tài xế</Typography>
          <DriverInfo/>
          <Divider/>
          <Typography variant='h6'>Chi tiết đặt xe</Typography>
          <BookingDetail bookingRef={bookingRef}/>
          <Divider/>
          <Button variant='outlined' size='small' color='error' onClick={handleCancel}>Hủy đơn</Button>
        </Stack>
      </Drawer>
    </Stack>
  )
}