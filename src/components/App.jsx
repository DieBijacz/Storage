import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import PrivateRoute from './PrivateRoute';
import Navibar from './Navibar';
import ForgotPassword from '../Pages/ForgotPassword';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container className='d-flex flex-column justify-content-start align-items-center' style={{ width: '100%', height: '90vh' }}>
        <Navibar />
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
