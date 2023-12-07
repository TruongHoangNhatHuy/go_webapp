import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { emptyBooking, useBookingContext } from 'contexts/BookingContext';
import { BookingDetail } from './BookingDetail';
import { DriverInfo } from './DriverInfo';

export const BookingInfoSide = ({ handleBookingCancel }) => {
  const drawerWidth = 350;
  // Đóng mở drawer
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const [bookingInfo, setBookingInfo] = useBookingContext();
  const [cancelling, setCancelling] = useState(false);
  const handleCancel = () => {
    setBookingInfo(emptyBooking);
    sessionStorage.setItem('bookingSession', JSON.stringify(emptyBooking));
    handleBookingCancel()
  }
  const handlePaymentRedirect = () => {
    if (bookingInfo.paymentMethod === 'VNPay') {
      const url = localStorage.getItem('GoWebapp_PaymentUrl');
      if (url !== null || url !== '') {
        window.open(url, '_blank');
      }
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
          width: { xs: "100vw", md: drawerWidth, sm: drawerWidth },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: "100vw", md: drawerWidth, sm: drawerWidth },
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
          <Divider />
          <Typography variant='h6' fontWeight='bold'>Thông Tin Tài Xế <CircularProgress size={16} /></Typography>
          <DriverInfo />
          <Divider />
          <Typography variant='h6' fontWeight='bold'>Chi Tiết Đặt Xe</Typography>
          {bookingInfo.status !== 'WAITING' ? <div/> : (
            <>
              <Typography color='red'>Đơn đặt xe chưa được thanh toán!</Typography>
              <Button variant='outlined' onClick={handlePaymentRedirect}>Đến trang thanh toán</Button>
            </>
          )}
          <BookingDetail />
          <Divider />
          <Button variant='outlined' size='small' color='error' onClick={() => setCancelling(true)} startIcon={<MdDeleteOutline />}>Hủy đơn</Button>
        </Stack>
      </Drawer>
      {/* Dialog xác nhận hủy đơn */}
      <Dialog open={cancelling}>
        <DialogTitle sx={{ margin: 'auto' }}>
          <b>HỦY ĐẶT XE</b>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: '250px' }}>
            <Typography variant='body1'>Xác nhận hủy đặt xe?</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleCancel}>Hủy</Button>
          <Button variant='outlined' color='info' onClick={() => setCancelling(false)}>Không</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}