import SignUp from './SignUp';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
