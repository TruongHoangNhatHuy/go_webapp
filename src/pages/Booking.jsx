import { Dialog, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Map from '../features/booking/services/vietmap/Map';
import { useEffect, useRef, useState } from 'react';
import { MdOutlinePayment } from "react-icons/md";
import { BookingForm, BookingInfoSide, LocationInputSide } from 'features/booking';
import { getDriverById } from 'features/account';
import { SocketPublish, SocketSubscriber, SocketUnsubscribe, useSocketClient } from 'services/websocket/StompOverSockJS';
import { useUserContext } from 'contexts/UserContext';
import { useBookingContext } from 'contexts/BookingContext';
import { useNotifyContext } from 'layouts/MainLayout';
import { getActiveBooking } from 'features/booking/services/be_server/api_booking';
import dayjs from 'dayjs';
import { getLocationByCoordinates } from 'features/booking/services/vietmap/api_reverse';

const Booking = () => {
  const [user,] = useUserContext();
  const [,setNotify] = useNotifyContext();
  // UI state
  const [bookingForm, setBookingForm] = useState(false);
  const [hadBooking, setHadBooking] = useState(false);
  // Map state
  const [userPosition, setUserPosition] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [vehicleRoute, setVehicleRoute] = useState(null); // Hiện thị tuyến đường
  // Function ref
  const setMapCenterRef = useRef({});
  // Thông tin đặt xe
  const [bookingInfo, setBookingInfo] = useBookingContext();
  const updatedBookingInfo = bookingInfo;
  // Snackbar message
  const [sbMessage, setSbMessage] = useState(null);

  // Khôi phục thông tin đặt xe nếu có
  const restoreBookingInfo = async () => {
    await getActiveBooking(user.token)
      .then(result => {
        console.log(result)
        if (result !== null) {
          updatedBookingInfo.id = result.id;
          updatedBookingInfo.status = result.status;
          updatedBookingInfo.vehicleType = result.vehicleType.toLowerCase();
          updatedBookingInfo.paymentAmounts = result.amount;
          updatedBookingInfo.paymentMethod = result.paymentMethod;
          updatedBookingInfo.timeSubmit = dayjs(result.createAt).format('DD/MM/YYYY[, ]HH:mm[ ]A');
          updatedBookingInfo.customerId = result.customerId;
          updatedBookingInfo.driverId = result.driverId;

          const pickup = result.pickupLocation.split(',');
          const startLocation = getLocationByCoordinates(pickup[1], pickup[0])[0];
          updatedBookingInfo.startLocation = {
            location: startLocation,
            coordinates: { lat: pickup[0], lng: pickup[1] }
          };
          const dropOff = result.dropOffLocation.split(',');
          const endLocation = getLocationByCoordinates(dropOff[1], dropOff[0])[0];
          updatedBookingInfo.endLocation = {
            location: endLocation,
            coordinates: { lat: dropOff[0], lng: dropOff[1] }
          };
        }
      })
      .catch(error => {
        console.log('getActiveBooking failed: ', error)
      })
    // khôi phục driverInfo
    if (updatedBookingInfo.driverId !== null) {
      await getDriverById(user.token, updatedBookingInfo.driverId)
        .then((result) => {
          // console.log('Driver info', result);
          updatedBookingInfo.driverInfo = result;
        })
        .catch((error) => {
          console.log('Get driver info failed: ', error);
        })
    }
    if (updatedBookingInfo.status !== null) {
      setBookingInfo(updatedBookingInfo);
      sessionStorage.setItem('bookingSession', JSON.stringify(updatedBookingInfo));
      setHadBooking(true);
      setStartLocation(updatedBookingInfo.startLocation);
      setEndLocation(updatedBookingInfo.endLocation);
    }
  }
  useEffect(() => {
    // lấy từ session storage
    if (bookingInfo.status !== null) {
      setHadBooking(true);
      setStartLocation(bookingInfo.startLocation);
      setEndLocation(bookingInfo.endLocation);
    }
    // request lại từ server
    else {
      restoreBookingInfo();
    }
  }, []);

  // Hiện thị thông báo trạng thái đơn đặt
  useEffect(() => {
    switch (bookingInfo.status) {
      case 'COMPLETE': { setSbMessage('Đã hoàn thành chuyến xe'); break; }
      case 'CANCELLED': { setSbMessage('Đã hủy chuyến xe'); break; }
      case 'ON_RIDE': { setSbMessage('Tài xế đang chở khách hàng'); break; }
      case 'WAITING': { setSbMessage('Đặt xe thành công, đang xử lý đơn đặt'); break; }
      case 'PAID': { setSbMessage('Đã thanh toán thành công'); break; }
      case 'REFUNDED': { setSbMessage('Đã hoàn tiền'); break; }
      case 'WAITING_REFUND': { setSbMessage('Đang thực hiện hoàn tiền'); break; }
      case 'FOUND': { setSbMessage('Đã tìm thấy tài xế'); break; }
      default: { setSbMessage(null); break; }
    }
  }, [bookingInfo.status])

  // WS code
  const socketClient = useSocketClient()
  const bookingStatusCallback = (result) => {
    setNotify('booking');
    const data = JSON.parse(result);
    console.log('Booking status change:', data);
    // Update status
    if (data['bookingId'] === bookingInfo.id) {
      // Nếu status là hủy đơn
      if (data.status === 'CANCELLED') {
        console.log('Booking cancelled')
        // setStartLocation(null);
        // setEndLocation(null);
        // setVehicleRoute(null);
        setHadBooking(false);
      }
      updatedBookingInfo.status = data.status;
      setBookingInfo(updatedBookingInfo);
      sessionStorage.setItem('bookingSession', JSON.stringify(updatedBookingInfo));
    }
    else {
      console.log('Booking id not match, ignore result. Received:', data['bookingId'], '!= Current:', bookingInfo.id);
    }
  }
  const driverInfoCallback = async (result) => {
    setNotify('booking');
    const data = JSON.parse(result);
    console.log('/user/customer_driver_info', data);
    // update driver id
    updatedBookingInfo.status = 'FOUND';
    updatedBookingInfo.driverId = data.driverId;
    // gọi api lấy driver info
    await getDriverById(user.token, updatedBookingInfo.driverId)
      .then((result) => {
        console.log('Driver info', result);
        updatedBookingInfo.driverInfo = result;
      })
      .catch((error) => {
        console.log('Get driver info failed');
      })

    setBookingInfo(updatedBookingInfo);
    sessionStorage.setItem('bookingSession', JSON.stringify(updatedBookingInfo));
  }
  const driverLocationCallback = (result) => {
    const data = JSON.parse(result);
    console.log('/user/customer_driver_location', data);
    const locationStr = data.location;
    const location = locationStr.split(',');
    const driverPos = { 
      vehicle: bookingInfo.vehicleType,
      lat: location[0],
      lng: location[1]
    };
    // console.log('Driver latLng:', driverLatLng);
    setDriverPosition(driverPos);
  }
  useEffect(() => {
    if (hadBooking) {
      SocketSubscriber(socketClient, '/user/booking_status', bookingStatusCallback);
      if (bookingInfo.status === 'PAID') {
        SocketSubscriber(socketClient, '/user/customer_driver_info', driverInfoCallback);
      }
      if (bookingInfo.status === 'FOUND') {
        SocketSubscriber(socketClient, '/user/customer_driver_location', driverLocationCallback);
      }
    } else {
      SocketUnsubscribe(socketClient, '/user/booking_status');
      SocketUnsubscribe(socketClient, '/user/customer_driver_info');
      SocketUnsubscribe(socketClient, '/user/customer_driver_location');
      setDriverPosition(null);
    }
  }, [hadBooking, bookingInfo.status])
  
  // Xử lý hủy đơn
  const handleBookingCancel = () => {
    // Thông báo cho server
    SocketPublish(socketClient, '/app/booking_status', {
      uid: bookingInfo.customerId,
      bookingId: bookingInfo.id,
      bookingStatus: 'CANCELLED'
    })
    console.log('Booking cancelling, id', bookingInfo.id);
  };
  const handleBookingComplete = () => {
    setHadBooking(false);
  }

  return (
    <div>
      <Snackbar 
        open={sbMessage !== null}
        message={sbMessage}
        autoHideDuration={30000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        action={
          <IconButton onClick={() => setSbMessage(null)}>
            <CloseIcon sx={{ color: 'white' }}/>
          </IconButton>
        }
      />
      {/* props của Map: để hiển thị marker điểm đi & điểm đến */}
      <Map startLocation={startLocation} endLocation={endLocation} vehicleRoute={vehicleRoute} setUserPosition={setUserPosition} setMapCenterRef={setMapCenterRef} driverPosition={driverPosition}/>
      {/* Side Drawer */}
      <LocationInputSide hidden={hadBooking} userPosition={userPosition} startLocation={startLocation} setStartLocation={setStartLocation} endLocation={endLocation} setEndLocation={setEndLocation} setVehicleRoute={setVehicleRoute} setMapCenterRef={setMapCenterRef} setBookingForm={setBookingForm} />
      {hadBooking ? <BookingInfoSide handleBookingCancel={handleBookingCancel} handleBookingComplete={handleBookingComplete}/> : <div/>}
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