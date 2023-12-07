import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Map from '../features/booking/services/vietmap/Map';
import { useEffect, useRef, useState } from 'react';
import { BookingForm, BookingInfoSide, LocationInputSide } from '../features/booking';
import { MdOutlinePayment } from "react-icons/md";
import { useBookingContext } from 'contexts/BookingContext';
import { SocketSubscriber, SocketUnsubscribe } from 'services/websocket/SocketWrapper';

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
  // Thông tin đặt xe
  const [bookingInfo, setBookingInfo] = useBookingContext();

  useEffect(() => {
    // khôi phục thông tin đặt xe nếu có
    if (bookingInfo.status !== null) {
      setHadBooking(true)
      setStartLocation(bookingInfo.startLocation)
      setEndLocation(bookingInfo.endLocation)
    }
  }, []);

  const handleSubscribeBookingStatus = () =>{
    const socketEndpoint = '/user/booking_status';
    // Nếu có booking, bắt đầu lắng nghe WS
    if (hadBooking) {
      SocketSubscriber(socketEndpoint, (result) => {
        const data = JSON.parse(result)
        console.log('Payment result from ', socketEndpoint, data);
        // Update status
        if (data.bookingId === bookingInfo.id) {
          const updatedBookingInfo = bookingInfo;
          updatedBookingInfo.status = data.status;
          setBookingInfo(updatedBookingInfo);
          sessionStorage.setItem('bookingSession', JSON.stringify(updatedBookingInfo));
        }
        else {
          console.log('Booking id not match, ignore result');
        }
      })  
    }
    else {
      SocketUnsubscribe(socketEndpoint);
    }
  }
  // WS subscribe, nên gọi trong useEffect
  useEffect(() => {
    handleSubscribeBookingStatus();
  }, [hadBooking])
  
  // Xử lý hủy đơn
  const handleBookingCancel = () => {
    // setStartLocation(null);
    // setEndLocation(null);
    // setVehicleRoute(null);
    setHadBooking(false);
  };

  return (
    <div>
      {/* props của Map: để hiển thị marker điểm đi & điểm đến */}
      <Map startLocation={startLocation} endLocation={endLocation} vehicleRoute={vehicleRoute} setUserPosition={setUserPosition} setMapCenterRef={setMapCenterRef}/>
      {/* Side Drawer */}
      <LocationInputSide hidden={hadBooking} userPosition={userPosition} startLocation={startLocation} setStartLocation={setStartLocation} endLocation={endLocation} setEndLocation={setEndLocation} setVehicleRoute={setVehicleRoute} setMapCenterRef={setMapCenterRef} setBookingForm={setBookingForm} />
      {hadBooking ? <BookingInfoSide handleBookingCancel={handleBookingCancel}/> : <div/>}
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
          <BookingForm setBookingForm={setBookingForm} setHadBooking={setHadBooking} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Booking