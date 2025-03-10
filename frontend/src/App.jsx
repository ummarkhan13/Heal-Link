import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './components/profile'; // Import Profile from components folder
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import DoctorsList from './Pages/DoctorsList';
import Appointments from './Pages/Appointments';
import TransactionHistory from './Pages/TransactionHistory';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="doctors" element={<DoctorsList />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/user-payments" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
