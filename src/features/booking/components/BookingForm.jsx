import { Box, IconButton, Button, MenuItem, Stack, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { MdArrowBack, MdArrowForward, MdLocationOn, MdCommute, MdPayment, MdOutlineAttachMoney } from "react-icons/md";
import dayjs from 'dayjs';
import { green, red, blue, yellow } from '@mui/material/colors'
import { RedirectVNPay } from 'features/payment';
import { useBookingContext } from 'contexts/BookingContext';
import { useUserContext } from 'contexts/UserContext';
import { createBooking } from '../services/be_server/api_booking';

// Form đặt xe
export const BookingForm = ({ setBookingForm, setHadBooking }) => {
  const [user,] = useUserContext();
  const [bookingInfo, setBookingInfo] = useBookingContext();
  var updatedBookingInfo = bookingInfo;

  const [fetching, setFetching] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errorStep, setErrorStep] = useState(-1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    switch (activeStep) {
      case 0: {
        if (paymentMethod === null) {
          setPaymentError('Chọn phương thức thanh toán.');
          setErrorStep(0);
          return;
        }
        else {
          setPaymentError(null);
          setErrorStep(-1);
          updatedBookingInfo.paymentMethod = paymentMethod;
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFetching(true)
    // Gọi api tạo booking
    const pickUp = [updatedBookingInfo.startLocation.coordinates.lat, updatedBookingInfo.startLocation.coordinates.lng].toString();
    const dropOff = [updatedBookingInfo.endLocation.coordinates.lat, updatedBookingInfo.endLocation.coordinates.lng].toString();
    const vehicle = updatedBookingInfo.vehicleType.toUpperCase();
    const json = {
      pickUpLocation: pickUp,
      dropOffLocation: dropOff,
      vehicleType: vehicle
    };
    // console.log('body', json)
    await createBooking(user.token, json)
      .then(result => {
        console.log('Create booking result', result);
        // Kiểm tra result
        if (result.pickupLocation !== pickUp || result.dropOffLocation !== dropOff || result.vehicleType !== vehicle) {
          throw new Error('Server trả về kết quả không khớp');
        }
        // Update bookingInfo
        updatedBookingInfo.id = result.id;
        updatedBookingInfo.status = result.status;
        updatedBookingInfo.customerId = result.customerId;
        updatedBookingInfo.timeSubmit = dayjs(result.createAt).format('DD/MM/YYYY[, ]HH:mm[ ]A');
        setBookingInfo(updatedBookingInfo);
        sessionStorage.setItem('bookingSession', JSON.stringify(updatedBookingInfo));
      })
      .catch(error => {
        console.log('Create booking failed', error);
        alert('Đặt xe thất bại');
        setFetching(false);
      })

    // Kiểm tra tạo đơn, thất bại thì không chuyển trang thanh toán
    if (updatedBookingInfo.id === null) return;
    // Thực hiện thanh toán
    if (updatedBookingInfo.paymentMethod === 'VNPay') {
      await RedirectVNPay(updatedBookingInfo.id, updatedBookingInfo.paymentAmounts)
        .then(url => {
          // console.log(url);
          localStorage.setItem('GoWebapp_PaymentUrl', url); // Lưu link thanh toán trong localStorage, dùng lại khi thanh toán thất bại
          // window.location.assign(url); // open VNPay in current tab
          window.open(url, '_blank') // open VNPay in new tab
        })
    }

    setFetching(false);
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
          }).format(updatedBookingInfo.paymentAmounts)}
        </b></Typography>
        <Typography variant='body1'>Phương tiện:
          {
            (updatedBookingInfo.vehicleType === 'motorcycle') ? ' Xe máy' :
              (updatedBookingInfo.vehicleType === 'car') ? ' Oto' : null
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
      </Stack>

      {/* index 1 */}
      <Stack sx={{
        display: activeStep === 1 ? 'flex' : 'none',
        flexDirection: 'column',
        paddingTop: 0.5
      }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none', color: green[500], }}><MdLocationOn /></IconButton>
                Điểm đi</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{updatedBookingInfo.startLocation.location.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none', color: red[700], }}><MdLocationOn /></IconButton>
                Điểm đến</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{updatedBookingInfo.endLocation.location.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none' }}><MdCommute /></IconButton>
                Loại xe</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{
                (updatedBookingInfo.vehicleType === 'motorcycle') ? 'Xe máy' :
                  (updatedBookingInfo.vehicleType === 'car') ? 'Oto' : null
              }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdPayment /></IconButton>
                Phương thức thanh toán</TableCell>
              <TableCell variant='head' align='right' sx={{ padding: "16px 0px" }}>{updatedBookingInfo.paymentMethod}</TableCell>
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
                }).format(updatedBookingInfo.paymentAmounts)}
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
        <LoadingButton type='submit' variant='contained'
          disabled={activeStep !== 1}
          loading={fetching}
        >
          Thanh toán
        </LoadingButton>
      </Box>
    </Box>
  )
}