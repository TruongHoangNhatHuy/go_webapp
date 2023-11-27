import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookingContext } from "contexts/BookingContext";
import { RedirectVNPay } from "services/vnpay/api_payment";

export const PaymentVerify = () => {
  // UI state
  const [fetching, setFetching] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null); //'success'|'fail'

  const navigate = useNavigate();
  const [redirectTo, setRedirectTo] = useState(null);
  const [bookingInfo, setBookingInfo] = useBookingContext();
  const [urlSearchParams,] = useSearchParams();

  const handlePaymentRedirect = async () => {
    if (bookingInfo.paymentMethod === 'VNPay') {
      await RedirectVNPay(bookingInfo.paymentAmounts)
        .then(url => {
          window.location.assign(url);
        })
    }
  }
  // Kết quả thanh toán VNPay trả về, lấy từ url params (nếu có)
  const getVnpResult = () => {
    var result = {}
    urlSearchParams.forEach((value, key, parent) => {
      result[key] = value
    });
    // update booking status nếu thanh toán thành công
    if (result['vnp_ResponseCode'] === '00') {
      var updatedBookingInfo = bookingInfo;
      updatedBookingInfo.status = 'payment_checked';
      setBookingInfo(updatedBookingInfo);
    }
    console.log('VNP result', result);
    return result;
  }

  useEffect(() => {
    // lấy kết quả thanh toán vnp, nếu có
    if (urlSearchParams.get('vnp_ResponseCode') !== null) {
      const result = getVnpResult();
      // to do: xác minh kết quả
      setTimeout(() => {
        setFetching(false)
        if (result.vnp_ResponseCode === '00') {
          setPaymentResult('success');
        }
        else {
          setPaymentResult('fail');
        }
      }, 3000);
    }
    else {
      console.log('No payment result found');
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (redirectTo !== null) {
     navigate(redirectTo) 
    }
  }, [redirectTo])

  if (fetching) {
    return (
      <Stack alignItems='center' spacing={2} margin={3}>
        <Typography>Đang xác minh thanh toán. Vui lòng đợi.</Typography>
        <CircularProgress/>
      </Stack>
    )
  }
  else if (paymentResult === 'success') {
    return (
      <Stack alignItems='center' spacing={2} margin={3}>
        <Typography>
          Thanh toán thành công.<br/> 
          Điều hướng về giao diện chính trong chốc lát.
        </Typography>
        <Button variant="outlined" onClick={() => setRedirectTo('/customer')}>
          Về trang đặt xe
        </Button>
      </Stack>
    )
  }
  else if (paymentResult === 'fail') {
    return (
      <Stack alignItems='center' spacing={2} margin={3}>
        <Typography>
          Thanh toán thất bại.
        </Typography>
        <Stack spacing={1}>
          <Button variant='outlined' onClick={handlePaymentRedirect}>
            Đến trang thanh toán
          </Button>
          <Button variant="outlined" onClick={() => setRedirectTo('/customer')}>
            Về trang đặt xe
          </Button>
        </Stack>
      </Stack>
    )
  }
  else {
    return (
      <Stack alignItems='center' spacing={2} margin={3}>
        <Typography>
          Oops. We encoutered some errors!
        </Typography>
      </Stack>
    )
  }
}