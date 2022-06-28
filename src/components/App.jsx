import SignUp from './SignUp';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <SignUp />
      </Container>
    </AuthProvider>
  );
}

export default App;
