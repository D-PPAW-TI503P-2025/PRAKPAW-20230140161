import axios from 'axios';
import { Routes, useNavigate } from 'react-router-dom';

import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import DashboardPage from '../components/DashboardPage';

function App() {
    return (
        <div>
            {/* Navigasi ini bisa dihapus jika tidak diperlukan */}
            <nav className='p-4 bg-gray-100'>
                <link to="/login" className='mr-4'>Login</link>
                <link to="/register" className='mr-4'>Register</link>
            </nav>
            <Routes>
                <route path="/login" element={<LoginPage />} />
                <route path="/register" element={<RegisterPage />} />
                <route path="/dashboard" element={<DashboardPage />} />
                <route path="*" element={<LoginPage />} />
            </Routes>
        </div>
    );
  }

  export default App;