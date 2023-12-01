import { Stack, Typography } from "@mui/material"
import { PaymentDataTable } from "features/payment"

// Table body data
const createData = (id, amount, timeStamp, paymentMethod, transactionId, bookingId, customerId) => {
  return { id, amount, timeStamp , paymentMethod, transactionId, bookingId }
}
const testData = [
  createData(1, 12345, '2023-05-11 10:30 AM', 'VNPay', 'VN123', 12, 9),
  createData(2, 12456, '2023-05-12 10:30 AM', 'VNPay', 'VN125', 13, 9),
  createData(3, 34231, '2023-05-15 10:30 AM', 'VNPay', 'VN124', 22, 9),
  createData(4, 53632, '2023-05-17 10:30 AM', 'VNPay', 'VN155', 53, 9),
  createData(5, 14563, '2023-05-17 10:45 AM', 'VNPay', 'VN183', 64, 9),
  createData(6, 45645, '2023-05-18 10:30 AM', 'VNPay', 'VN175', 35, 9),
  createData(7, 14545, '2023-05-18 11:30 AM', 'VNPay', 'VN167', 75, 9),
  createData(8, 34254, '2023-05-18 06:30 PM', 'VNPay', 'VN134', 93, 9),
  createData(9, 12456, '2023-05-18 10:30 PM', 'VNPay', 'VN187', 18, 9),
  createData(10, 12423, '2023-05-25 10:30 AM', 'VNPay', 'VN114', 87, 9),
  createData(11, 65634, '2023-05-25 10:30 AM', 'VNPay', 'VN156', 23, 9),
  createData(12, 24524, '2023-05-25 10:30 AM', 'VNPay', 'VN187', 78, 9),
  createData(13, 43532, '2023-05-25 10:30 PM', 'VNPay', 'VN113', 24, 9),
  createData(14, 34536, '2023-05-25 10:30 AM', 'VNPay', 'VN154', 86, 9),
  createData(15, 34566, '2023-05-25 10:30 AM', 'VNPay', 'VN122', 34, 9),
  createData(16, 47456, '2023-05-25 10:30 PM', 'VNPay', 'VN154', 24, 9),
  createData(17, 67856, '2023-05-30 10:30 AM', 'VNPay', 'VN128', 76, 9),
  createData(18, 33664, '2023-05-30 10:30 AM', 'VNPay', 'VN034', 43, 9),
  createData(19, 45647, '2023-05-30 10:30 AM', 'VNPay', 'VN056', 76, 9),
  createData(20, 65875, '2023-05-30 10:30 PM', 'VNPay', 'VN013', 34, 9),
  createData(21, 46467, '2023-05-30 10:30 AM', 'VNPay', 'VN065', 57, 9),
  createData(22, 57543, '2023-05-30 10:30 AM', 'VNPay', 'VN024', 13, 9),
]

// Table head data
const tableHeadCells = [
  {
    id: 'id',
    disablePadding: true,
    label: 'STT',
  },
  {
    id: 'timeStamp',
    disablePadding: false,
    label: 'Thời gian',
  },
  {
    id: 'amount',
    disablePadding: false,
    label: 'Số tiền',
  },
  {
    id: 'paymentMethod',
    disablePadding: false,
    label: 'Phương thức',
  },
  {
    id: 'transactionId',
    disablePadding: false,
    label: 'Mã giao dịch',
  },
  {
    id: 'bookingId',
    disablePadding: false,
    label: 'Mã đơn đặt',
  },
]

const PaymentHistory = () => {
  return (
    <Stack sx={{ display: 'flex', justifyContent: 'flex-start', height: '100%', padding: '3%', bgcolor: 'whitesmoke' }}>
      <Typography variant="h4" fontWeight='bold' sx={{ color: 'green' }}>
        LỊCH SỬ THANH TOÁN
      </Typography>
      <PaymentDataTable tableBodyData={testData} tableHeadData={tableHeadCells}/>
    </Stack>
  )
}

export default PaymentHistory