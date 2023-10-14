import './assets/App.css';
import { BrowserRouter } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import DriverLayout from './layouts/DriverLayout';
import AdminLayout from './layouts/AdminLayout';
import SignInSide from './pages/SignInSide'

function App() {
  return (
    <BrowserRouter>
      <SignInSide/>
    </BrowserRouter>
  );
}

export default App;
