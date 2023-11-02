import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Stack, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Map from '../services/vietmap/Map';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { getLocationByAddress, getCoordinatesByRefid } from '../utils/vietmap/geocode';

// Thanh nhập địa chỉ
const LocationInput = ({ bookingRef, setBookingForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    bookingRef.current.startLocation = data.get('startLocation');
    bookingRef.current.endLocation = data.get('endLocation');

    const locationList = getLocationByAddress(bookingRef.current.startLocation);
    console.log(locationList);
    getCoordinatesByRefid(locationList[0][0])

    // console.log('locationInput', bookingRef.current);
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
              sx={{ bgcolor: 'white' }}
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
              sx={{ bgcolor: 'white' }}
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
const BookingForm = ({ bookingRef, setBookingForm, setHadBooking }) => {
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
    else {
      bookingRef.current.paymentMethod = paymentMethod;
      bookingRef.current.payment = 123456;
    }
    // Ổn hết
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setErrorStep(-1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    bookingRef.current.timeSubmit = dayjs(); // return current time, as dayjs object
    console.log('bookingForm', bookingRef.current);
    setBookingForm(false);
    setHadBooking(true);
  };

  return (
    <Box sx={{ width: '100%' }} component='form' onSubmit={handleSubmit}>
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
          onChange={(_, value) => setVehicleType(value)}
        >
          <ToggleButton
            value='MOTORBIKE'
            variant='outlined'
            sx={{ height: '30vh', width: '30vh' }}
          >
            <Stack alignItems='center'>
              <TwoWheelerIcon sx={{ height: 100, width: 70 }} />
              Xe máy
            </Stack>
          </ToggleButton>
          <ToggleButton
            value='CAR'
            variant='outlined'
            sx={{ height: '30vh', width: '30vh' }}
          >
            <Stack alignItems='center'>
              <DirectionsCarIcon sx={{ height: 100, width: 70 }} />
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
          onChange={(_, item) => setPaymentMethod(item.props.value)}
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
        <Table size='small' sx={{ minWidth: 400 }}>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">Điểm đi</TableCell>
              <TableCell align='right'>{bookingRef.current.startLocation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Điểm đến</TableCell>
              <TableCell align='right'>{bookingRef.current.endLocation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Loại xe</TableCell>
              <TableCell align='right'>{
                (bookingRef.current.vehicleType === 'MOTORBIKE') ? 'Xe máy' :
                (bookingRef.current.vehicleType === 'CAR') ? 'Oto' : null
              }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Phương thức thanh toán</TableCell>
              <TableCell align='right'>{bookingRef.current.paymentMethod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' component="th" scope="row" >Tổng tiền</TableCell>
              <TableCell variant='head' align='right'>{bookingRef.current.payment}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
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
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={activeStep === 2} onClick={handleNext}>Tiếp</Button>
        <Button disabled={activeStep !== 2} type='submit' variant='contained'>Đặt xe</Button>
      </Box>
    </Box>
  )
}

// Hiện thị thông tin đơn đặt
const BookingDetail = ({ bookingRef }) => {
  const data = bookingRef.current

  return (
    <TableContainer component={Box}>
      <Table size='small' sx={{ minWidth: 400 }}>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">Trạng thái đơn đặt</TableCell>
            <TableCell align='right'>{data.status}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Thời gian đặt</TableCell>
            <TableCell align='right'>{data.timeSubmit.$d.toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Điểm đi</TableCell>
            <TableCell align='right'>{data.startLocation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Điểm đến</TableCell>
            <TableCell align='right'>{data.endLocation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Loại xe</TableCell>
            <TableCell align='right'>{
              (data.vehicleType === 'MOTORBIKE') ? 'Xe máy' :
              (data.vehicleType === 'CAR') ? 'Oto' : null
            }</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Phương thức thanh toán</TableCell>
            <TableCell align='right'>{data.paymentMethod}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head' component="th" scope="row" >Tổng tiền</TableCell>
            <TableCell variant='head' align='right'>{data.payment}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Booking = () => {
  const [bookingForm, setBookingForm] = useState(false)
  const [bookingDetail, setBookingDetail] = useState(false)
  const [hadBooking, setHadBooking] = useState(false)
  // Thông tin đơn đặt
  const bookingRef = useRef({
    status: 'none',
    startLocation: '1',
    endLocation: '2',
    vehicleType: '3',
    paymentMethod: '4',
    payment: '5',
    timeSubmit: '6'
  })

  const handleCancel = () => {
    setBookingDetail(false);
    setHadBooking(false);
  }

  return (
    <>
      <Map />
      {
        // Hiện/ẩn thanh nhập địa chỉ khi chưa/đã đặt xe
        hadBooking ? (
          <AppBar position='relative' color=''>
            <Stack flexDirection='row' alignItems='center' padding={1}>
              <Typography variant='h6'>Đã đặt xe</Typography>
              <Box sx={{ flex: '1 1 auto' }}/>
              <Button variant='outlined' onClick={() => setBookingDetail(true)}>Chi tiết</Button>
            </Stack>
          </AppBar>
        ) : (
          <LocationInput bookingRef={bookingRef} setBookingForm={setBookingForm} />
        )
      }
      {/* Cửa sổ mở Booking Form */}
      <Dialog open={bookingForm}>
        <DialogTitle sx={{ paddingBottom: 0 }}>ĐẶT XE</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setBookingForm(false)}
          sx={{
            position: 'absolute', right: 8, top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <BookingForm bookingRef={bookingRef} setBookingForm={setBookingForm} setHadBooking={setHadBooking} />
        </DialogContent>
      </Dialog>
      {/* Cửa sổ mở Booking Detail */}
      <Dialog open={bookingDetail}>
        <DialogTitle sx={{ paddingBottom: 0 }}>CHI TIẾT ĐẶT XE</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setBookingDetail(false)}
          sx={{
            position: 'absolute', right: 8, top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 1}}>
          <BookingDetail bookingRef={bookingRef}/>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleCancel}>Hủy đơn</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Booking