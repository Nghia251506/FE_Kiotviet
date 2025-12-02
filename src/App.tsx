import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <AdminLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
