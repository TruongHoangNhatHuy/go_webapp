import { Box,IconButton, Button, MenuItem, Stack, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useState } from 'react';
import { MdArrowBack,MdArrowForward,MdLocationOn,MdCommute,MdPayment,MdOutlineAttachMoney } from "react-icons/md";
import dayjs from 'dayjs';
import { green, red,blue,yellow } from '@mui/material/colors'

// Form đặt xe
export const BookingForm = ({ bookingRef, setBookingForm, setHadBooking }) => {
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
    <Box  component='form' onSubmit={handleSubmit}>
      <Stepper activeStep={activeStep}>
        <Step index={0}>
          <StepLabel error={errorStep === 0}>Chọn phương tiện</StepLabel>
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
            sx={{ width: '50%' }}
          >
            <Stack alignItems='center'>
              <TwoWheelerIcon sx={{ height: '100%', width: '50%' }} />
              Xe máy
            </Stack>
          </ToggleButton>
          <ToggleButton
            value='CAR'
            variant='outlined'
            sx={{ width: '50%'}}
          >
            <Stack alignItems='center'>
              <DirectionsCarIcon sx={{ height: '100%', width: '50%' }} />
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
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none' , color: green[500],}}><MdLocationOn/></IconButton>
                Điểm đi</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingRef.current.startLocation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none' , color: red[700],}}><MdLocationOn/></IconButton>
                Điểm đến</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingRef.current.endLocation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none'}}><MdCommute/></IconButton>
                Loại xe</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{
                (bookingRef.current.vehicleType === 'MOTORBIKE') ? 'Xe máy' :
                (bookingRef.current.vehicleType === 'CAR') ? 'Oto' : null
              }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdPayment/></IconButton>
              Phương thức thanh toán</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingRef.current.paymentMethod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' component="th" scope="row" sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none', color: yellow[700]}}><MdOutlineAttachMoney/></IconButton>
                Tổng tiền</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingRef.current.payment}</TableCell>
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
          startIcon={<MdArrowBack/>}
        >
          Trở lại
        </Button>
        <Box sx={{ flex: '1 1 auto'}} />
        <Button disabled={activeStep === 2}
                onClick={handleNext}
                endIcon={<MdArrowForward/>}>Tiếp</Button>
        <Button disabled={activeStep !== 2} type='submit' variant='contained'>Đặt xe</Button>
      </Box>
    </Box>
  )
}