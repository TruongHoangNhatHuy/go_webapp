import { createContext, useContext, useEffect, useState } from 'react';

const BookingContext = createContext(null);

export const emptyBooking = {
  status: null, /* = null|'COMPLETE'|'CANCELLED'|'ON_RIDE'|'WAITING'|'PAID'|'REFUNDED'|'WAITING_REFUND'|'FOUND' */
  id: null,
  startLocation: null, /* = {
      location: { ..., name, address, display }
      coordinates: { ..., lat, lng }
    } */
  endLocation: null, /* = {
      location: { ..., name, address, display }
      coordinates: { ..., lat, lng }
    } */
  vehicleType: null,      // 'motorcycle'|'car'
  paymentAmounts: null,   // integer
  paymentMethod: null,    // 'Momo'|'VNPay'
  timeSubmit: null,       // integer
  customerId: null,       // integer
  driverId: null,         // integer
  driverInfo: null,       // json driver info
  rating: null, /* = { bookingId, rating, content, createAt } */
};

// Context.Provider
export const BookingContextProvider = ({ children }) => {
  const [bookingInfo, setBookingInfo] = useState(
    (sessionStorage.getItem('bookingSession') ? JSON.parse(sessionStorage.getItem('bookingSession')) : emptyBooking)
  );

  useEffect(() => {
    sessionStorage.setItem('bookingSession', JSON.stringify(bookingInfo));
  }, [bookingInfo, setBookingInfo])

  return (
    <BookingContext.Provider value={[bookingInfo, setBookingInfo]}>
      {children}
    </BookingContext.Provider>
  )
}

// Context.Consumer
export const useBookingContext = () => {
  return useContext(BookingContext)
}