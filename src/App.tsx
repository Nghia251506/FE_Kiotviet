// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import CheckShopPage from "./pages/CheckShopPage";
import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import SettingPage from "./pages/SettingPage";
import SupplierListPage from "./pages/SupplierListPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - ai cũng vào được */}
        <Route path="/" element={<Home />} />
        <Route path="/check-shop" element={<CheckShopPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected admin routes - chỉ Admin mới vào được */}
        
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/suppliers" element={<SupplierListPage />} />

            {/* Redirect root admin về dashboard */}
            <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
          </Route>
        

        {/* Catch all - redirect về home nếu route không tồn tại */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;