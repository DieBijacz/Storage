import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from '../Pages/SignUp';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import PrivateRoute from './PrivateRoute';
import Navibar from './Navibar';
import ForgotPassword from '../Pages/ForgotPassword';
import { Container } from 'react-bootstrap';
import NotFound from '../Pages/NotFound';
import Dashboard from '../Pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navibar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
