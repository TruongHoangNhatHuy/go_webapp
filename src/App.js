import './assets/App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SignInSide from './pages/SignInSide';
import Booking from './pages/Booking';
import SignUp from './pages/SignUp';
import Orders from 'pages/Orders';
import Account from './pages/Account';
import { UserContextProvider, useUserContext } from 'contexts/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BookingContextProvider } from 'contexts/BookingContext';
import PaymentVerify from 'pages/PaymentVerify';
import PaymentHistory from 'pages/PaymentHistory';
import { DriverManage } from 'pages/DriversManage';
import { DriverInterviewForm, DriverManageForm } from 'features/account';
import { SocketProvider } from 'services/websocket/StompOverSockJS';

// Google Cloud OAuth2 ID
const clientId = "650109837523-vcpbjogn6rgu2g4k1gojsfc5rtm5i7iq.apps.googleusercontent.com"

// Router Protect layer
const ProtectedRoute = ({
  user, // kiểm tra đăng nhập
  role, // kiểm tra vai trò
  // redirectPath = '',
  children
}) => {
  if (user === null) {
    alert('Chưa đăng nhập tài khoản. Điều hướng đến trang đăng nhập.');
    return <Navigate to={'/'} replace/>
  };
  if (role !== user.role) {
    alert('Không được phép truy cập.');
    window.history.back();
  }
  else
    return children ? children : <Outlet />;
};
// URL Router
const ReactRouter = () => {
  const [user,] = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* Trang đăng nhập */}
        <Route index element={<SignInSide />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        {/* Chưa đăng kí thì role = null */}
        <Route path='signup' element={<ProtectedRoute user={user} role={'null'}><SignUp /></ProtectedRoute>} />
        {/* Sau khi đăng nhập */}
        <Route path='/customer' element={
          <ProtectedRoute user={user} role={'customer'}>
            <SocketProvider>
              <MainLayout/>
            </SocketProvider>
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to={'booking'}/>} />
          <Route path='account' element={<Account />} />
          <Route path='booking' element={<BookingContextProvider><Booking/></BookingContextProvider>} />
          <Route path='orders' element={<Orders/>} />
          <Route path='bills' element={<PaymentHistory/>} />
          <Route path='favorites' element={<text>Địa điểm yêu thích</text>} />
        </Route>
        <Route path='/payment-verify' element={<PaymentVerify/>}></Route>
        <Route path='/driver' element={<ProtectedRoute user={user} role={'driver'}>
           <SocketProvider>
              <MainLayout/>
            </SocketProvider></ProtectedRoute>}>
          <Route index element={<Navigate to={'orders'}/>} />
          <Route path='account' element={<Account />} />
          <Route path='orders' element={<Orders/>} />
          <Route path='ratings' element={<text>Đánh giá</text>} />
          <Route path='analysis' element={<text>Thống kê</text>} />
        </Route>
        <Route path='/admin' element={<ProtectedRoute user={user} role={'admin'}><MainLayout/></ProtectedRoute>}>
          <Route index element={<Navigate to={'drivers'}/>} />
          <Route path='account' element={<Account />} />
          <Route path='drivers' element={<DriverManage/>}>
            <Route path='interview' element={<DriverInterviewForm/>} />
            <Route path='manage' element={<DriverManageForm/>} />
          </Route>
          <Route path='customers' element={<text>Quản lí khách hàng</text>} />
          <Route path='analysis' element={<text>Thống kê</text>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserContextProvider>
        <ReactRouter/>
      </UserContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
