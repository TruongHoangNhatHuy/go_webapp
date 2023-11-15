import { IconButton,Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { green, red,blue,yellow } from '@mui/material/colors'
import {MdLocationOn,MdCommute,MdPayment,MdOutlineAttachMoney,MdOutlineAccessTime,MdInfo } from "react-icons/md";

// Hiện thị thông tin đơn đặt
export const BookingDetail = ({ bookingRef }) => {
  const data = bookingRef.current

  return (
    <TableContainer component={Box}>
      <Table size='small'>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
            <IconButton sx={{pointerEvents: 'none'}}><MdInfo/></IconButton>
              Trạng thái đơn đặt</TableCell>
            <TableCell variant='head' align='right'>{data.status}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
            <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdOutlineAccessTime/></IconButton>
              Thời gian đặt</TableCell>
            <TableCell variant='head' align='right'>{data.timeSubmit.$d.toString()}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell component="th" scope="row">
              <IconButton sx={{pointerEvents: 'none' , color: green[500],}}><MdLocationOn/></IconButton>
                Điểm đi</TableCell>
              <TableCell variant='head' align='right'>{bookingRef.current.startLocation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <IconButton sx={{pointerEvents: 'none' , color: red[700],}}><MdLocationOn/></IconButton>
                Điểm đến</TableCell>
              <TableCell variant='head' align='right'>{data.endLocation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <IconButton sx={{pointerEvents: 'none'}}><MdCommute/></IconButton>
                Loại xe</TableCell>
              <TableCell variant='head' align='right'>{
                (data.vehicleType === 'MOTORBIKE') ? 'Xe máy' :
                (data.vehicleType === 'CAR') ? 'Oto' : null
              }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <IconButton sx={{pointerEvents: 'none', color: blue[700]}}><MdPayment/></IconButton>
              Phương thức thanh toán</TableCell>
              <TableCell variant='head' align='right'>{data.paymentMethod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant='head' component="th" scope="row" >
              <IconButton sx={{pointerEvents: 'none', color: yellow[700]}}><MdOutlineAttachMoney/></IconButton>
                Tổng tiền</TableCell>
              <TableCell variant='head' align='right'>{data.payment}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}