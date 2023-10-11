import './assets/App.css';
import { BrowserRouter } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import DriverLayout from './layouts/DriverLayout';
import AdminLayout from './layouts/AdminLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <SignUp/>
    </BrowserRouter>
  );
}

export default App;
