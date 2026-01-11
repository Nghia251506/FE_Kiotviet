// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook'; // giữ nguyên hook của bạn
import { useEffect, useState } from 'react';
import { checkAuth, logout } from '../redux/slice/authSlice';
import { RootState } from '../redux/store';

interface PrivateRouteProps {
  children: JSX.Element;
  roleName?: string; // optional: 'Admin' | 'NhanVien'
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children, roleName }) => {
  const dispatch = useAppDispatch();
  const { currentUser, loading } = useAppSelector((state : RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true); // <<-- QUAN TRỌNG: chờ checkAuth xong mới quyết định

  useEffect(() => {
    if (!currentUser) {
      dispatch(checkAuth())
        .unwrap() // chờ thunk hoàn thành (fulfilled hoặc rejected)
        .finally(() => {
          setIsChecking(false); // chỉ render kết quả sau khi check xong
        });
    } else {
      setIsChecking(false);
    }
  }, [currentUser, dispatch]);

  // 1. Đang check auth (F5 trang hoặc lần đầu vào) → show loading
  if (isChecking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // 2. Check xong mà không có user → redirect về check-shop
  if (!currentUser) {
    return <Navigate to="/check-shop" replace />;
  }

  // 3. Có user nhưng role không đúng → từ chối truy cập
  if (roleName && currentUser.roleName !== roleName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-10 bg-white rounded-2xl shadow-2xl max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Truy cập bị từ chối</h1>
          <p className="text-gray-700 mb-8">Bạn không có quyền truy cập khu vực này.</p>
          <button
            onClick={() => dispatch(logout())}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  // 4. Đủ điều kiện → render children (AdminLayout + page)
  return children;
};

export default ProtectedRoute;