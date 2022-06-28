import SingUp from "./SingUp";
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <SingUp />
    </Container>
  );
}

export default App;
