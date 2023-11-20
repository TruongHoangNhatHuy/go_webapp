import './assets/App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SignInSide from './pages/SignInSide';
import Booking from './pages/Booking';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import { UserContextProvider, useUserContext } from 'contexts/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
        <Route path='/customer' element={<ProtectedRoute user={user} role={'customer'}><MainLayout/></ProtectedRoute>}>
          <Route index element={<Navigate to={'booking'}/>} />
          <Route path='account' element={<Account />} />
          <Route path='booking' element={<Booking />} />
          <Route path='orders' element={<text>Đơn đặt</text>} />
          <Route path='bills' element={<text>Lịch sử thanh toán</text>} />
          <Route path='favorites' element={<text>Địa điểm yêu thích</text>} />
        </Route>
        <Route path='/driver' element={<ProtectedRoute user={user} role={'driver'}><MainLayout/></ProtectedRoute>}>
          <Route index element={<Navigate to={'orders'}/>} />
          <Route path='account' element={<Account />} />
          <Route path='orders' element={<text>Đơn đặt</text>} />
          <Route path='ratings' element={<text>Đánh giá</text>} />
          <Route path='analysis' element={<text>Thống kê</text>} />
        </Route>
        <Route path='/admin' element={<ProtectedRoute user={user} role={'admin'}><MainLayout/></ProtectedRoute>}>
          <Route index element={<Navigate to={'analysis'}/>} />
          <Route path='account' element={<Account />} />
          <Route path='analysis' element={<text>Thống kê</text>} />
          <Route path='customers' element={<text>Quản lí khách hàng</text>} />
          <Route path='drivers' element={<text>Quản lí tài xế</text>} />
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
