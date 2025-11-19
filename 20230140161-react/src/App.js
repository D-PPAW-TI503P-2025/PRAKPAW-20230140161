import { Routes, Route, Link } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

function App() {
    return (
        <div>
            <nav className='p-4 bg-gray-100 flex gap-4'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>

            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </div>
    );
}

export default App;
