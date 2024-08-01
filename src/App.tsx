import './App.css'
import {  BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { DeskProvider } from './context/DeskContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DeskProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
      </DeskProvider>
    </AuthProvider>
  );
};
export default App;
