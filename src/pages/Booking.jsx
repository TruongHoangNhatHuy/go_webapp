import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Map from '../features/booking/services/vietmap/Map';
import { useRef, useState } from 'react';
import { BookingForm, BookingInfoSide, LocationInputSide } from '../features/booking';
import { MdOutlinePayment,MdDelete } from "react-icons/md";

const Booking = () => {
  // UI state
  const [bookingForm, setBookingForm] = useState(false);
  const [hadBooking, setHadBooking] = useState(false);
  // Map state
  const [userPosition, setUserPosition] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [vehicleRoute, setVehicleRoute] = useState(null); // Hiện thị tuyến đường
  // Function ref
  const setMapCenterRef = useRef({});
  // Thông tin đơn đặt
  const emptyBooking = {
    status: 'none',
    startLocation: '1',
    endLocation: '2',
    vehicleType: '3',
    paymentMethod: '4',
    paymentAmounts: '5',
    timeSubmit: '6'
  };
  const bookingRef = useRef(emptyBooking);
  
  // Xử lý hủy đơn
  const handleBookingCancel = () => {
    bookingRef.current = emptyBooking;
    setHadBooking(false);
  };

  return (
    <div>
      {/* props của Map: để hiển thị marker điểm đi & điểm đến */}
      <Map startLocation={startLocation} endLocation={endLocation} vehicleRoute={vehicleRoute} setUserPosition={setUserPosition} setMapCenterRef={setMapCenterRef}/>
      {/* Side Drawer */}
      <LocationInputSide hidden={hadBooking} bookingRef={bookingRef} userPosition={userPosition} startLocation={startLocation} setStartLocation={setStartLocation} endLocation={endLocation} setEndLocation={setEndLocation} setVehicleRoute={setVehicleRoute} setMapCenterRef={setMapCenterRef} setBookingForm={setBookingForm} />
      {hadBooking ? <BookingInfoSide bookingRef={bookingRef} handleBookingCancel={handleBookingCancel}/> : <div/>}
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
    </div>
  )
}

export default Booking