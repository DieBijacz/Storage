import { Container } from 'react-bootstrap'
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import Home from '../Pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
