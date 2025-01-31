import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Import everything needed
import App from './App';
import './index.css';
import Form from './components/Form.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
        <Route path="/" element={<App />} />
        {/* Other Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
