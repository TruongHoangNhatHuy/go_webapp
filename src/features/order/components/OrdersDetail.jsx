import { Stack, Modal, Rating, ListItemText, Grid, Box, TextField, Avatar, ListItemAvatar, ListItem, IconButton, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react";
import { MapTile } from "./MapTile";
import { MdLocationOn, MdCommute, MdPayment, MdOutlineAttachMoney, MdOutlineAccessTime, MdInfo, MdClose } from "react-icons/md";
import { TableBody, TableCell, TableContainer, TableRow, Table } from '@mui/material';
import { green, red, blue, yellow } from '@mui/material/colors'
import dayjs from "dayjs";

export const OrdersDetail = ({ ordersRef, open, setOpen }) => {
  const [ordersDetail, setOrdersDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [endCoordinates, setEndCoordinates] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  const handleClose = () => {
    ordersRef.current = null;
    setOrdersDetail(null);
    setLoading(true);
    setOpen(false);
  }

  useEffect(() => {
    if (ordersRef.current !== null) {
      console.log(ordersRef.current);
      const startCoordinatesArray = ordersRef.current.pickUpLocation.split(',');
      const endCoordinatesArray = ordersRef.current.dropOffLocation.split(',');
      setVehicleType(ordersRef.current.vehicleType);
      setStartCoordinates([parseFloat(startCoordinatesArray[1]), parseFloat(startCoordinatesArray[0])]);
      setEndCoordinates([parseFloat(endCoordinatesArray[1]), parseFloat(endCoordinatesArray[0])]);

      setOrdersDetail(ordersRef.current);
      setTimeout(()=> {
        setLoading(false);
      }, 1000);
    }
  }, [open])

  return (
    <Stack>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100vw" },
          height: { xs: "100vh" }
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex", flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              position: "relative",
              width: { xs: "100%", md: "70%", sm: "70%" },
              height: { xs: "100%", md: "80%", sm: "80%" },
              bgcolor: "white", borderRadius: "16px",
              overflowY: 'scroll',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
            }}
          ><CircularProgress/></Box>
        ) : (
          <Box
            sx={{
              display: "flex", flexDirection: 'column',
              position: "relative",
              width: { xs: "100%", md: "70%", sm: "70%" },
              height: { xs: "100%", md: "80%", sm: "80%" },
              bgcolor: "white", borderRadius: "16px",
              overflowY: 'scroll',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                padding: "0px 8px",
                zIndex: "2"
              }}
              onClick={handleClose}>
              <MdClose />
            </IconButton>
            <Grid
              container
              flexDirection={"row"}
              borderRadius={4}
              border={"1px solid"}
              borderColor={"grey.300"}
              height={"100%"}
              minWidth={"100%"}
              padding={1}
              spacing={1}
            >
              <Grid item container flexDirection={"column"} xs={12} md={6} height={"100%"} spacing={1.5}>
                <Grid item xs={'auto'} minWidth={"100%"}>
                  <ListItem >
                    <ListItemAvatar>
                      <Avatar src={ordersDetail.driver?.avatarUrl} sx={{ height: "50px", width: "50px" }} />
                    </ListItemAvatar>
                    <ListItemText primary={ordersDetail.driver?.fullName == null ? "Không tìm thấy tài xế" : ordersDetail.driver.fullName} secondary={ordersDetail.driver?.licensePlate} sx={{ pl: 1 }} />
                    <Rating defaultValue={ordersDetail.driver?.rating} precision={0.5} readOnly />
                  </ListItem>
                </Grid>
                <Grid item xs={true} minWidth={"100%"} >
                  <MapTile startCoordinates={startCoordinates} endCoordinates={endCoordinates} vehicleType={vehicleType}></MapTile>
                </Grid>
                <Grid item xs={1} minWidth={"100%"}>
                  <TextField
                    label="Đánh giá sau chuyến đi"
                    multiline
                    fullWidth
                    rows={2}
                    color="info"
                    // focused 
                    defaultValue={ordersDetail.review?.content}
                    sx={{ height: 'auto' }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container flexDirection={"column"} xs={12} md={6} height={"100%"}>
                {ordersDetail ? (<TableContainer component={Box}>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                          <IconButton sx={{ pointerEvents: 'none' }}><MdInfo /></IconButton>
                          Trạng thái
                        </TableCell>
                        <TableCell variant='head' align='right' sx={{ padding: "16px 16px" }}>
                          {ordersDetail.status === 'COMPLETE' ? 'Đã hoàn thành' :
                            ordersDetail.status === 'CANCELLED' ? 'Đã hủy' :
                            ordersDetail.status === 'ON_RIDE' ? 'Đang thực hiện' :
                            ordersDetail.status === 'WAITING' ? 'Chưa thanh toán' :
                            ordersDetail.status === 'PAID' ? 'Đã thanh toán' :
                            ordersDetail.status === 'REFUNDED' ? 'Đã hoàn tiền' :
                            ordersDetail.status === 'WAITING_REFUND' ? 'Chờ hoàn tiền' :
                            ordersDetail.status === 'FOUND' ? 'Đã tìm thấy tài xế' :
                            ordersDetail.status
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                          <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdOutlineAccessTime /></IconButton>
                          Thời gian</TableCell>
                        <TableCell variant='head' align='right' sx={{ padding: "16px 16px" }}>{dayjs(ordersDetail.createAt).format('YYYY-MM-DD HH:mm:ss A')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                          <IconButton sx={{ pointerEvents: 'none', color: green[500], }}><MdLocationOn /></IconButton>
                          Điểm đi</TableCell>
                        <TableCell variant='head' align='right' sx={{ padding: "16px 16px" }}>{ordersDetail.pickUpAddress}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                          <IconButton sx={{ pointerEvents: 'none', color: red[700], }}><MdLocationOn /></IconButton>
                          Điểm đến</TableCell>
                        <TableCell variant='head' align='right' sx={{ padding: "16px 16px" }}>{ordersDetail.dropOffAddress}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                          <IconButton sx={{ pointerEvents: 'none' }}><MdCommute /></IconButton>
                          Loại xe</TableCell>
                        <TableCell variant='head' align='right' sx={{ padding: "16px 16px" }}>{
                          (ordersDetail.vehicleType === 'MOTORCYCLE') ? 'Xe máy' :
                            (ordersDetail.vehicleType === 'CAR') ? 'Oto' : null
                        }</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: "16px 0px" }}>
                          <IconButton sx={{ pointerEvents: 'none', color: blue[700] }}><MdPayment /></IconButton>
                          Phương thức thanh toán</TableCell>
                        <TableCell variant='head' align='right' sx={{ padding: "16px 16px" }}>{ordersDetail.payment?.paymentMethod || 'Chưa thanh toán'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant='head' component="th" scope="row" sx={{ padding: "16px 0px" }}>
                          <IconButton sx={{ pointerEvents: 'none', color: yellow[700] }}><MdOutlineAttachMoney /></IconButton>
                          Tổng tiền</TableCell>
                        <TableCell variant='head' align='right' sx={{ padding: "16px 16px" }}>
                          {Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                            currencyDisplay: 'code'
                          }).format(ordersDetail.amount)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>) : <Grid item container flexDirection={"column"} sm={6} height={"100%"}></Grid>}
              </Grid>
            </Grid>
          </Box>
        )}
      </Modal>
    </Stack>
  )
}