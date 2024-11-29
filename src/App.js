// src/App.js

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HRDashboard from './components/HRDashboard/HRDashboard';
import HRLogin from './components/HRLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* HR Routes */}
        <Route path="/hr-dashboard/*" element={<HRDashboard />} />
        <Route path="/hr-login" element={<HRLogin />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Redirect any unknown paths to Home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
