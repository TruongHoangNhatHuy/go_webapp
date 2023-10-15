import './assets/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SignInSide from './pages/SignInSide';
import Booking from './pages/Booking';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang đăng nhập */}
        <Route index element={<SignInSide/>}/>
    	  <Route path='signup' element={<SignUp/>}/>
        {/* Sau khi đăng nhập */}
        <Route path='app' element={<MainLayout/>}>
          <Route path='account' element={<text>Tài khoản</text>}/>
          <Route path='booking' element={<Booking/>}/>
          <Route path='orders' element={<text>Đơn đặt</text>}/>
          <Route path='bills' element={<text>Lịch sử thanh toán</text>}/>
          <Route path='favorites' element={<text>Địa điểm yêu thích</text>}/>
          <Route path='ratings' element={<text>Đánh giá</text>}/>
          <Route path='analysis' element={<text>Thống kê</text>}/>
          <Route path='customers' element={<text>Quản lí khách hàng</text>}/>
          <Route path='drivers' element={<text>Quản lí tài xế</text>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
