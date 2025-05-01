<<<<<<< HEAD
import React from 'react';
import StackNavigator from './android/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
=======
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
>>>>>>> f76d6eaec240666c1e9073b9e129c35c67c0341d
  );
}
