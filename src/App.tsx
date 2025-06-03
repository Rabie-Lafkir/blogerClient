
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login';

function App() {
  return (
    <Routes>
      {/* Shared wrapper with Navbar, footer, etc. */}
      <Route element={<LoginPage></LoginPage>} path='/'></Route>
    </Routes>
  );
}

export default App;
