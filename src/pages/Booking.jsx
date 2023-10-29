import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, Stack, Step, StepLabel, Stepper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Map from '../services/mapbox/Map';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';

// Thanh nhập địa chỉ
const LocationInput = ({ bookingRef, setBookingForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    bookingRef.current.startLocation = data.get('startLocation');
    bookingRef.current.endLocation = data.get('endLocation');
    console.log('locationInput', bookingRef.current);
    setBookingForm(true);
  };

  return (
    <AppBar position='static' color='transparent'>
      <Box component='form' id='locationInput' onSubmit={handleSubmit}>
        <Grid container flexDirection='row' alignItems='center' spacing={0.5} padding={1}>
          <Grid item xs={6} lg>
            <TextField
              required
              fullWidth
              size='small'
              id='startLocation'
              name='startLocation'
              placeholder='Nhập điểm đi'
              sx={{ bgcolor: 'white'}}
            />
          </Grid>
          <Grid item xs={6} lg>
            <TextField
              required
              fullWidth
              size='small'
              id='endLocation'
              name='endLocation'
              placeholder='Nhập điểm đến'
              sx={{ bgcolor: 'white'}}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button 
              type='submit' 
              fullWidth 
              variant='contained'
            >Đặt xe</Button>
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  )
}

// Form đặt xe
const BookingForm = ({ bookingRef, setBookingForm, setIsBooking }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errorStep, setErrorStep] = useState(-1);
  const [vehicleType, setVehicleType] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    // Kiểm tra chọn phương tiện
    if (activeStep === 0 && vehicleType === null) {
      setErrorStep(0);
      return;
    }
    else bookingRef.current.vehicleType = vehicleType;
    // Kiểm tra chọn phương thức thanh toán
    if (activeStep === 1 && paymentMethod === null) {
      setErrorStep(1);
      return;
    }
    else bookingRef.current.paymentMethod = paymentMethod;
    // Ổn hết
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setErrorStep(-1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    bookingRef.current.timeSubmit = dayjs().toString();
    console.log('bookingForm', bookingRef.current);
    setBookingForm(false);
    setIsBooking(true);
  };

  return (
    <Box sx={{ width: '100%'}} component='form' onSubmit={handleSubmit}>
      <Stepper activeStep={activeStep}>
        <Step index={0}>
          <StepLabel error={errorStep === 0}>Chọn loại phương tiện</StepLabel>
        </Step>
        <Step index={1}>
          <StepLabel error={errorStep === 1}>Thanh toán</StepLabel>
        </Step>
        <Step index={2}>
          <StepLabel error={errorStep === 2}>Xác nhận đặt xe</StepLabel>
        </Step>
      </Stepper>

      {/* index 0 */}
      <Stack sx={{
        display: activeStep === 0 ? 'flex' : 'none',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 3
      }}>
        <ToggleButtonGroup
          value={vehicleType}
          exclusive
          color='primary'
          onChange={(_, value)=> setVehicleType(value)}
        >
          <ToggleButton 
            value='MOTORBIKE'
            variant='outlined' 
            sx={{ height: '30vh', width: '30vh' }} 
          >
            <Stack alignItems='center'>
              <TwoWheelerIcon sx={{ height: 100, width: 70}}/>
              Xe máy
            </Stack>
          </ToggleButton>
          <ToggleButton
            value='CAR'
            variant='outlined' 
            sx={{ height: '30vh', width: '30vh' }}
          >
            <Stack alignItems='center'>
              <DirectionsCarIcon sx={{ height: 100, width: 70}}/>
              Oto
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* index 1 */}
      <Stack spacing={2} sx={{
        display: activeStep === 1 ? 'flex' : 'none',
        flexDirection: 'column',
        paddingTop: 3,
      }}>
        <Typography variant='h6'>Số tiền cần thanh toán: 123456</Typography>
        <TextField
          select
          label='Phương thức thanh toán'
          onChange={(_, item)=> setPaymentMethod(item.props.value)}
        >
          <MenuItem value='Momo'>Momo</MenuItem>
          <MenuItem value='Paypal'>Paypal</MenuItem>
        </TextField>
        <Typography variant='body1' display={paymentMethod ? 'flex' : 'none'}>Số dư: 12345</Typography>
      </Stack>

      {/* index 2 */}
      <Stack sx={{
        display: activeStep === 2 ? 'flex' : 'none',
        flexDirection: 'column',
        paddingTop: 3
      }}>
        <Typography variant='body1'>Điểm đi: {bookingRef.current.startLocation}</Typography>
        <Typography variant='body1'>Điểm đến: {bookingRef.current.endLocation}</Typography>
        <Typography variant='body1'>Loại phương tiện: {
          (bookingRef.current.vehicleType === 'MOTORBIKE') ? 'Xe máy' :
          (bookingRef.current.vehicleType === 'CAR') ? 'Oto' : null
        }</Typography>
        <Typography variant='body1'>Phương thức thanh toán: {bookingRef.current.paymentMethod}</Typography>
        <Typography variant='h6'>Thành tiền: 123456</Typography>
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Trở lại
        </Button>
        <Box sx={{ flex: '1 1 auto' }}/>
        <Button disabled={activeStep === 2} onClick={handleNext}>Tiếp</Button>
        <Button disabled={activeStep !== 2} type='submit' variant='contained'>Đặt xe</Button>
      </Box>
    </Box>
  )
}

const Booking = () => {
  const [bookingForm, setBookingForm] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  // Thông tin đơn đặt
  const bookingRef = useRef({
    startLocation: null,
    endLocation: null,
    vehicleType: null,
    paymentMethod: null,
    timeSubmit: null
  })

  const handleCancel = () => {
    setIsBooking(false)
  }

  return (
    <>
      <Map/>
      {
        // Hiện/ẩn thanh nhập địa chỉ khi chưa/đã đặt xe
        isBooking ? (
          <AppBar position='relative' color='' >
            <Stack flexDirection='row' alignItems='center'>
              <Typography>Đã đặt xe</Typography>
              <Button onClick={handleCancel}>Hủy</Button>
            </Stack>
          </AppBar>
        ) : (
          <LocationInput bookingRef={bookingRef} setBookingForm={setBookingForm}/>
        )
      }
      {/* Cửa sổ mở Booking Form */}
      <Dialog open={bookingForm}>
        <DialogTitle>ĐẶT XE</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setBookingForm(false)}
          sx={{ position: 'absolute', right: 8, top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>
        <DialogContent>
          <BookingForm bookingRef={bookingRef} setBookingForm={setBookingForm} setIsBooking={setIsBooking}/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Booking