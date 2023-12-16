import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, Divider, Drawer, IconButton, Stack, Typography, Skeleton, Rating, Paper, TextField } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { LoadingButton } from '@mui/lab';
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useBookingContext } from 'contexts/BookingContext';
import { useUserContext } from 'contexts/UserContext';
import { BookingDetail } from './BookingDetail';
import { DriverInfo } from './DriverInfo';
import { createReview } from '../services/be_server/api_booking';

const BookingRating = ({ bookingId }) => {
  const [user,] = useUserContext();
  const [sent, setSent] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [errorText, setErrorText] = useState(null);
  const labels = {
    1: 'Tệ',
    2: 'Tạm',
    3: 'Được',
    4: 'Tốt',
    5: 'Xuất sắc',
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);  
    formData.append('bookingId', bookingId);
    
    const jsonBody = {}
    for(var pair of formData.entries()) {
      jsonBody[pair[0]] = pair[1];
    }
    console.log('Booking rating', jsonBody);

    await createReview(user.token, jsonBody)
      .then(result => {
        console.log('Create review result: ', result);
        setSent(true);
      })
      .catch(error => {
        console.log('Create review failed: ', error);
        setErrorText('Vui lòng thử lại');
      })
  }

  return (
    <Paper elevation={2}>
      <Box component='form' onSubmit={handleSubmit} padding={1}>
        <Typography variant='h6' fontWeight='bold' paddingBottom={1}>
          {sent ? 'Cảm ơn về đánh giá của bạn' :
            'Đánh giá trải nghiệm của bạn'
          }
        </Typography>
        <Stack paddingX={2} spacing={1}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Rating
              id='rating'
              name='rating'
              size='large'
              readOnly={sent}
              value={rating}
              onChange={(e, value) => setRating(value)}
              onChangeActive={(e, newHover) => setHover(newHover)}
            />
            {rating !== null && (
              <Typography>{labels[hover !== -1 ? hover : rating]}</Typography>
            )}
          </Stack>
          <Stack display={rating ? 'flex' : 'none'} spacing={0.5}>
            <Typography fontWeight='bold'>
              {rating < 3 ? 'Để lại góp ý về chuyến đi' :
                'Để lại nhận xét về chuyến đi'
              }
            </Typography>
            <TextField multiline
              rows={3}
              id='content'
              name='content'
              disabled={sent}
              helperText={errorText}
              FormHelperTextProps={{ sx: {color: 'red'} }}
            />
            <Button type='submit' disabled={sent}>Gửi</Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}

export const BookingInfoSide = ({ hadDriver, handleBookingCancel, handleBookingComplete }) => {
  const drawerWidth = 350;
  // Đóng mở drawer
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const [bookingInfo,] = useBookingContext();
  const [statusUpdate, setStatusUpdate] = useState('') // trigger re-render
  const [cancelDialog, setCancelDialog] = useState(false);
  const [cancelling, setCancelling] = useState(
    bookingInfo.status === 'WAITING_REFUND' ? true : false
  );

  useEffect(() => {
    setStatusUpdate(bookingInfo.status);
  }, [bookingInfo.status])
  
  const handleCancel = () => {
    setCancelling(true)
    setCancelDialog(false)
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
          <Typography variant='h6' fontWeight='bold'>Thông Tin Tài Xế</Typography>
          {hadDriver ? (
            <DriverInfo />
          ) : (
            <Stack direction='row' padding={1} spacing={2} alignItems='center'>
              <Skeleton variant='circular' width={60} height={60}/>
              <Stack spacing={1}>
                <Skeleton variant='rounded' width={210} height={20}/>
                <Skeleton variant='rounded' width={210} height={40}/>
              </Stack>
            </Stack>
          )}
          {bookingInfo.status === 'COMPLETE' &&
            <Stack justifyContent='center' spacing={2}>
              <BookingRating bookingId={bookingInfo.id}/>
              <Button variant='outlined' onClick={handleBookingComplete}>
                Đặt chuyến xe mới
              </Button>
            </Stack>
          }
          <Divider />
          <Typography variant='h6' fontWeight='bold'>Chi Tiết Đặt Xe</Typography>
          {bookingInfo.status !== 'WAITING' ? <div/> : (
            <>
              <Typography color='red'>Đơn đặt xe chưa được thanh toán!</Typography>
              <Button variant='outlined' onClick={handlePaymentRedirect}>Đến trang thanh toán</Button>
            </>
          )}
          <BookingDetail />
          {bookingInfo.status !== 'COMPLETE' || bookingInfo.status !== 'ON_RIDE' &&
            <LoadingButton variant='outlined' size='small' color='error'
              loading={cancelling}
              onClick={() => setCancelDialog(true)} 
              startIcon={<MdDeleteOutline />}
              children='Hủy đơn'
            />
          }
        </Stack>
      </Drawer>
      {/* Dialog xác nhận hủy đơn */}
      <Dialog open={cancelDialog}>
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
          <Button variant='outlined' color='info' onClick={() => setCancelDialog(false)}>Không</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}