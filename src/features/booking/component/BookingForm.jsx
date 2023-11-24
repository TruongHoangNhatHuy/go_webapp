import { Box, IconButton, Button, MenuItem, Stack, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { MdArrowBack, MdArrowForward, MdLocationOn, MdCommute, MdPayment, MdOutlineAttachMoney } from "react-icons/md";
import dayjs from 'dayjs';
import { green, red, blue, yellow } from '@mui/material/colors'

// Form đặt xe
export const BookingForm = ({ bookingRef, setBookingForm, setHadBooking }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errorStep, setErrorStep] = useState(-1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const wallet = 12345; // test kiểm tra số dư

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    // Kiểm tra chọn phương thức thanh toán
    const amounts = bookingRef.current.paymentAmounts;
    switch (activeStep) {
      case 0: {
        if (paymentMethod === null) {
          setPaymentError('Chọn phương thức thanh toán.');
          setErrorStep(0);
          return;
        }
        else if (wallet < amounts) {
          setPaymentError('Không đủ số dư.');
          setErrorStep(0);
          return;
        }
        else {
          setPaymentError(null);
          setErrorStep(-1);
          bookingRef.current.paymentMethod = paymentMethod;
        }
        break;
      }
      default:
        break;
    }
    // Ổn hết
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setErrorStep(-1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    bookingRef.current.timeSubmit = dayjs(); // return current time, as dayjs object
    bookingRef.current.status = 'Đang tìm tài xế';
    // console.log('bookingForm', bookingRef.current);
    setBookingForm(false);
    setHadBooking(true);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Stepper activeStep={activeStep}>
        <Step index={0}>
          <StepLabel error={errorStep === 0}
            optional={<Typography variant="caption" fontWeight='bold' color="error" children={paymentError} />}
          >Thanh toán
          </StepLabel>
        </Step>
        <Step index={1}>
          <StepLabel error={errorStep === 1}>Xác nhận đặt xe</StepLabel>
        </Step>
      </Stepper>

      {/* index 0 */}
      <Stack spacing={1.5} sx={{
        display: activeStep === 0 ? 'flex' : 'none',
        flexDirection: 'column',
        paddingTop: 3,
      }}>
        <Typography variant='h6'><b>Số tiền cần thanh toán: {
          Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code'
          }).format(bookingRef.current.paymentAmounts)}
        </b></Typography>
        <Typography variant='body1'>Phương tiện:
          {
            (bookingRef.current.vehicleType === 'MOTOBIKE') ? ' Xe máy' :
              (bookingRef.current.vehicleType === 'CAR') ? ' Oto' : null
          }
        </Typography>
        <TextField
          select
          label='Phương thức thanh toán'
          onChange={(_, item) => setPaymentMethod(item.props.value)}
        >
          <MenuItem value='Momo'>Momo</MenuItem>
          <MenuItem value='VNPay'>VNPay</MenuItem>
        </TextField>
        <Typography variant='body1' display={paymentMethod ? 'flex' : 'none'}>Số dư: {
          Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code'
          }).format(wallet)}
        </Typography>
      </Stack>

      {/* index 2 */}
      <Stack sx={{
        display: activeStep === 1 ? 'flex' : 'none',
        flexDirection: 'column',
        paddingTop: 3
      }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none', color: green[500], }}><MdLocationOn /></IconButton>
                Điểm đi</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{bookingRef.current.startLocation.location.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none', color: red[700], }}><MdLocationOn /></IconButton>
                Điểm đến</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{bookingRef.current.endLocation.location.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none' }}><MdCommute /></IconButton>
                Loại xe</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{
                (bookingRef.current.vehicleType === 'MOTOBIKE') ? 'Xe máy' :
                  (bookingRef.current.vehicleType === 'CAR') ? 'Oto' : null
              }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdPayment /></IconButton>
                Phương thức thanh toán</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{bookingRef.current.paymentMethod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none', color: yellow[700] }}><MdOutlineAttachMoney /></IconButton>
                Tổng tiền</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  currencyDisplay: 'code'
                }).format(bookingRef.current.paymentAmounts)}
              </TableCell>
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
          startIcon={<MdArrowBack />}
        >
          Trở lại
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={activeStep === 1}
          onClick={handleNext}
          endIcon={<MdArrowForward />}>Tiếp</Button>
        <Button disabled={activeStep !== 1} type='submit' variant='contained'>Đặt xe</Button>
      </Box>
    </Box>
  )
}