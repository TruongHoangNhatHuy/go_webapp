import { getIpAddress } from 'utils/getIpAddr';
import config from './vnp_config.json';
import dayjs from 'dayjs';
import CryptoJS from 'crypto-js';

export const RedirectVNPay = async (bookingId, paymentAmounts) => {
  var date = dayjs();
  var ipAddr; //Địa chỉ IP của khách hàng thực hiện giao dịch.
  await getIpAddress().then(result => {
    ipAddr = result
  });

  /* https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop */
  var tmnCode = config.vnp_TmnCode;       //Mã website của merchant trên hệ thống của VNPAY
  var secretKey = config.vnp_HashSecret;
  var vnpUrl = config.vnp_Url;
  var returnUrl = config.vnp_ReturnUrl;   //URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán.

  var createDate = parseInt(date.format('YYYYMMDDHHmmss')); //Là thời gian phát sinh giao dịch định dạng yyyyMMddHHmmss
  var orderId = bookingId;            //Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày.
  var amount = paymentAmounts*100;                //Số tiền thanh toán. Cần nhân thêm 100 lần
  var bankCode = '';                              //(optional) Mã Ngân hàng thanh toán

  var orderInfo = "Thanh toan dat xe Go "+ paymentAmounts + " VND"; //Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu).
  var orderType = 'other';  //Mã danh mục hàng hóa.
  var locale = 'vn';        //Ngôn ngữ giao diện hiển thị (vn|en).
  var currCode = 'VND'      //Đơn vị tiền tệ sử dụng thanh toán.

  // vnp_Params should be sorted by keys
  var vnp_Params = {
    vnp_Amount: amount,
    // vnp_BankCode: bankCode, //optional
    vnp_Command: 'pay',
    vnp_CreateDate: createDate,
    vnp_CurrCode: currCode,
    vnp_IpAddr: ipAddr,
    vnp_Locale: locale,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_ReturnUrl: returnUrl,
    vnp_TmnCode: tmnCode,
    vnp_TxnRef: orderId,
    vnp_Version: '2.1.0',
  };
  
  var signData = new URLSearchParams(vnp_Params).toString();
  // console.log(signData);
  var hmac = CryptoJS.HmacSHA512(signData, secretKey);
  var signed = hmac.toString();
  vnp_Params['vnp_SecureHash'] = signed;

  // console.log(vnp_Params);
  vnpUrl += '?'+ new URLSearchParams(vnp_Params).toString();
  // console.log('VNPay url', vnpUrl);
  return vnpUrl
}