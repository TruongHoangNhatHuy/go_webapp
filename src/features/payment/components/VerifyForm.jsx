import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { useBookingContext } from "contexts/BookingContext";
import config from 'features/payment/services/vnpay/vnp_config.json';
import CryptoJS from 'crypto-js';

export const VerifyForm = () => {
  // UI state
  const [fetching, setFetching] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null); //'success'|'fail'
  const [urlSearchParams,] = useSearchParams();
  const [bookingInfo,] = useBookingContext();

  // Trở lại trang thanh toán
  const handlePaymentRedirect = () => {
    if (bookingInfo.paymentMethod === 'VNPay') {
      const url = localStorage.getItem('GoWebapp_PaymentUrl');
      if (url !== null || url !== '') {
        window.location.assign(url);
      }
    }
  }
  // Kết quả thanh toán VNPay trả về, lấy từ url params (nếu có)
  const getVnpResult = () => {
    const result = {};
    var secureHash;
    // lấy kết quả từ url params
    urlSearchParams.forEach((value, key) => {
      if (key === 'vnp_SecureHash') {
        secureHash = value;
        console.log(secureHash);
      }
      else {
        result[key] = value;
      }
    });
    console.log('VNP result', result);
    // validate result
    var signData = new URLSearchParams(result).toString();
    var hmac = CryptoJS.HmacSHA512(signData, config.vnp_HashSecret);
    var signed = hmac.toString();
    if (secureHash !== signed) {
      console.log('vnp_SecureHash !== signed')
      return null;
    }
    return result;
  }

  useEffect(() => {
    // lấy kết quả thanh toán vnp, nếu có
    if (urlSearchParams.get('vnp_ResponseCode') !== null) {
      const result = getVnpResult();
      // to do: xác minh kết quả
      setTimeout(() => {
        setFetching(false)
        if (result !== null && result.vnp_ResponseCode === '00') {
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
          Thanh toán thành công.
        </Typography>
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