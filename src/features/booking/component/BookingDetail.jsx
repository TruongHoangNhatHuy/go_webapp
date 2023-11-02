import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

// Hiện thị thông tin đơn đặt
export const BookingDetail = ({ bookingRef }) => {
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