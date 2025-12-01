import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Customers from './pages/Customers';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'sales':
        return <Sales />;
      case 'products':
        return <Products />;
      case 'customers':
        return <Customers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div onClick={(e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('href');
        if (path === '/') setCurrentPage('dashboard');
        else if (path === '/sales') setCurrentPage('sales');
        else if (path === '/products') setCurrentPage('products');
        else if (path === '/customers') setCurrentPage('customers');
      }
    }}>
      <AdminLayout>
        {renderPage()}
      </AdminLayout>
    </div>
  );
}

export default App;
