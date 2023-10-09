import './assets/App.css';
import { BrowserRouter } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import DriverLayout from './layouts/DriverLayout';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <CustomerLayout/>
    </BrowserRouter>
  );
}

export default App;
