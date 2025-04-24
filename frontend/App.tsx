import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signUp';
import AdminDashboard from './pages/adminDashboard';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
  );
}