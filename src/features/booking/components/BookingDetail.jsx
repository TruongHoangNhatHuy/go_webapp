import { IconButton,Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { green, red,blue,yellow } from '@mui/material/colors'
import { useBookingContext } from 'contexts/BookingContext';
import {MdLocationOn,MdCommute,MdPayment,MdOutlineAttachMoney,MdOutlineAccessTime,MdInfo } from "react-icons/md";

// Hiện thị thông tin đơn đặt
export const BookingDetail = () => {
  const [bookingInfo,] = useBookingContext();

  return (
    <TableContainer component={Box}>
      <Table size='small'>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" sx={{padding:"16px 0px"}}>
            <IconButton sx={{pointerEvents: 'none'}}><MdInfo/></IconButton>
              Trạng thái đơn</TableCell>
            <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingInfo.status}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" sx={{padding:"16px 0px"}}>
            <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdOutlineAccessTime/></IconButton>
              Thời gian đặt</TableCell>
            <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingInfo.timeSubmit}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell component="th" scope="row"sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none' , color: green[500],}}><MdLocationOn/></IconButton>
                Điểm đi</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingInfo.startLocation.location.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none' , color: red[700],}}><MdLocationOn/></IconButton>
                Điểm đến</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingInfo.endLocation.location.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none'}}><MdCommute/></IconButton>
                Loại xe</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{
                (bookingInfo.vehicleType === 'motorcycle') ? 'Xe máy' :
                (bookingInfo.vehicleType === 'car') ? 'Oto' : null
              }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdPayment/></IconButton>
              Phương thức thanh toán</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>{bookingInfo.paymentMethod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' component="th" scope="row" sx={{padding:"16px 0px"}}>
              <IconButton sx={{pointerEvents: 'none', color: yellow[700]}}><MdOutlineAttachMoney/></IconButton>
                Tổng tiền</TableCell>
              <TableCell variant='head' align='right'sx={{padding:"16px 0px"}}>
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                  currencyDisplay: 'code'
                }).format(bookingInfo.paymentAmounts)}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}