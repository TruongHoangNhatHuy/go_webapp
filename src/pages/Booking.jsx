import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Map from '../features/booking/services/vietmap/Map';
import { useRef, useState } from 'react';
import { BookingDetail, BookingForm, BookingInfoSide, LocationInputSide } from '../features/booking';
import {MdOutlinePayment,MdDelete } from "react-icons/md";

const Booking = () => {
  // UI state
  const [bookingForm, setBookingForm] = useState(false);
  const [bookingDetail, setBookingDetail] = useState(false);
  const [hadBooking, setHadBooking] = useState(false);
  // Map state
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [vehicleRoute, setVehicleRoute] = useState(null); // Hiện thị tuyến đường
  // Function ref
  const setMapCenterRef = useRef({});
  // Thông tin đơn đặt
  const bookingRef = useRef({
    status: 'none',
    startLocation: '1',
    endLocation: '2',
    vehicleType: '3',
    paymentMethod: '4',
    payment: '5',
    timeSubmit: '6'
  });
  
  // Xử lý hủy đơn
  const handleBookingCancel = () => {
    setBookingDetail(false);
    setStartLocation(null);
    setEndLocation(null);
    setHadBooking(false);
  };

  return (
    <div>
      {/* props của Map: để hiển thị marker điểm đi & điểm đến */}
      <Map startLocation={startLocation} endLocation={endLocation} vehicleRoute={vehicleRoute} setMapCenterRef={setMapCenterRef}/>
      {/* Location Input Side */}
      { hadBooking ? (
        <BookingInfoSide bookingRef={bookingRef} handleBookingCancel={handleBookingCancel}/>
      ) : (
        <LocationInputSide bookingRef={bookingRef} startLocation={startLocation} setStartLocation={setStartLocation} endLocation={endLocation} setEndLocation={setEndLocation} vehicleRoute={vehicleRoute} setVehicleRoute={setVehicleRoute} setMapCenterRef={setMapCenterRef} setBookingForm={setBookingForm}/>
      ) }
      {/* Cửa sổ mở Booking Form */}
      <Dialog open={bookingForm} >
        <DialogTitle 
        sx={{ paddingBottom: 0, margin: 'auto'}}
        >ĐẶT XE<IconButton sx={{pointerEvents: 'none'}}><MdOutlinePayment /></IconButton></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setBookingForm(false)}
          sx={{
            position: 'absolute', right: 8, top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <BookingForm bookingRef={bookingRef} setBookingForm={setBookingForm} setHadBooking={setHadBooking} />
        </DialogContent>
      </Dialog>
      {/* Cửa sổ mở Booking Detail */}
      <Dialog open={bookingDetail}>
        <DialogTitle sx={{ paddingBottom: 0 , margin: 'auto'}}>CHI TIẾT ĐẶT XE
        <IconButton sx={{pointerEvents: 'none'}}><MdOutlinePayment /></IconButton></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setBookingDetail(false)}
          sx={{
            position: 'absolute', right: 8, top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 1}}>
          <BookingDetail bookingRef={bookingRef}/>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error' onClick={handleBookingCancel} startIcon={<MdDelete />}>Hủy đơn</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Booking